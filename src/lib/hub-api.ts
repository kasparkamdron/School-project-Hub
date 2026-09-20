import { supabase } from "@/integrations/supabase/client";

/** A group stays active while it was touched within this window ... */
export const ACTIVE_WINDOW_DAYS = 30;
/** ... and until this many days have passed since its deadline. */
export const DEADLINE_GRACE_DAYS = 14;

const DAY_MS = 24 * 60 * 60 * 1000;

export function activeSince() {
  return new Date(Date.now() - ACTIVE_WINDOW_DAYS * DAY_MS).toISOString();
}

/** Deadlines older than this are past their grace period. */
export function deadlineCutoff() {
  return new Date(Date.now() - DEADLINE_GRACE_DAYS * DAY_MS).toISOString();
}

/** Live "is this group still active" rule, matching the nightly cleanup. */
export function isGroupActive(g: {
  last_activity_at: string;
  deadline: string | null;
}) {
  if (g.last_activity_at < activeSince()) return false;
  if (g.deadline && g.deadline < deadlineCutoff()) return false;
  return true;
}

export type MiniProfile = {
  id: string;
  display_name: string;
  avatar_url: string | null;
  school: string | null;
};

export type GroupRow = {
  id: string;
  name: string;
  description: string | null;
  deadline: string | null;
  created_by: string;
  created_at: string;
  last_activity_at: string;
};

export type TaskRow = {
  id: string;
  group_id: string;
  title: string;
  assigned_to: string | null;
  deadline: string | null;
  completed: boolean;
  created_at: string;
  assignee?: MiniProfile | null;
};

export type NoteRow = {
  id: string;
  group_id: string;
  task_id: string | null;
  content: string;
  created_by: string;
  created_at: string;
  author?: MiniProfile | null;
};

export type GroupSummary = GroupRow & {
  members: MiniProfile[];
  taskTotal: number;
  taskDone: number;
};

export type FriendEdge = {
  id: string;
  status: "pending" | "accepted" | "declined";
  created_at: string;
  requester_id: string;
  addressee_id: string;
  other: MiniProfile;
  direction: "incoming" | "outgoing";
};

function unwrap<T>(data: T | null, error: { message: string } | null): T {
  if (error) throw new Error(error.message);
  return data as T;
}

/* ---------------- profile ---------------- */

export async function saveProfile(input: {
  id: string;
  display_name: string;
  school?: string | null;
  avatar_url?: string | null;
  onboarded?: boolean;
}) {
  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: input.display_name.trim(),
      school: input.school?.trim() || null,
      ...(input.avatar_url !== undefined
        ? { avatar_url: input.avatar_url || null }
        : {}),
      ...(input.onboarded !== undefined ? { onboarded: input.onboarded } : {}),
    })
    .eq("id", input.id);
  if (error) throw new Error(error.message);
}

export async function exportMyData() {
  const { data, error } = await supabase.rpc("export_my_data");
  return unwrap(data, error);
}

/* ---------------- groups ---------------- */

export async function listActiveGroups(): Promise<GroupSummary[]> {
  const { data, error } = await supabase
    .from("groups")
    .select(
      "*, group_members(user_id, profiles:user_id(id, display_name, avatar_url, school)), tasks(id, completed)",
    )
    .gte("last_activity_at", activeSince())
    .order("last_activity_at", { ascending: false });
  if (error) throw new Error(error.message);

  return (data ?? [])
    .filter((g) => isGroupActive(g as unknown as GroupRow))
    .map((g: Record<string, unknown>) => {
      const memberRows =
        (g["group_members"] as { profiles: MiniProfile | null }[]) ?? [];
      const tasks = (g["tasks"] as { id: string; completed: boolean }[]) ?? [];
      return {
        ...(g as unknown as GroupRow),
        members: memberRows
          .map((m) => m.profiles)
          .filter(Boolean) as MiniProfile[],
        taskTotal: tasks.length,
        taskDone: tasks.filter((t) => t.completed).length,
      };
    });
}

export async function countQuietGroups(): Promise<number> {
  const { data, error } = await supabase
    .from("groups")
    .select("last_activity_at, deadline");
  if (error) throw new Error(error.message);
  return (data ?? []).filter((g) => !isGroupActive(g as GroupRow)).length;
}

export async function getGroup(groupId: string): Promise<GroupRow> {
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("id", groupId)
    .single();
  return unwrap(data as GroupRow, error);
}

export async function listGroupMembers(
  groupId: string,
): Promise<MiniProfile[]> {
  const { data, error } = await supabase
    .from("group_members")
    .select("user_id, profiles:user_id(id, display_name, avatar_url, school)")
    .eq("group_id", groupId);
  if (error) throw new Error(error.message);
  return ((data ?? []) as { profiles: MiniProfile | null }[])
    .map((r) => r.profiles)
    .filter(Boolean) as MiniProfile[];
}

export async function createGroup(input: {
  name: string;
  description?: string;
  deadline?: string | null;
  memberIds: string[];
}): Promise<string> {
  const args = {
    _name: input.name,
    _description: input.description ?? null,
    _deadline: input.deadline ?? null,
    _member_ids: input.memberIds,
  } as unknown as {
    _name: string;
    _description: string;
    _deadline: string;
    _member_ids: string[];
  };
  const { data, error } = await supabase.rpc("create_group_with_members", args);
  return unwrap(data as string, error);
}

export async function updateGroup(
  groupId: string,
  patch: {
    name?: string;
    description?: string | null;
    deadline?: string | null;
  },
) {
  const { error } = await supabase
    .from("groups")
    .update(patch)
    .eq("id", groupId);
  if (error) throw new Error(error.message);
}

/**
 * Moves a project deadline and shifts every dated task in that project by the
 * same amount, so the whole plan keeps its internal spacing.
 */
export async function rescheduleProject(groupId: string, newDeadline: string) {
  const { data: group, error } = await supabase
    .from("groups")
    .select("id, deadline")
    .eq("id", groupId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!group?.deadline) throw new Error("This project has no deadline yet.");

  const deltaMs =
    new Date(newDeadline).getTime() - new Date(group.deadline).getTime();
  if (deltaMs === 0) return { shiftedTasks: 0 };

  const { data: tasks, error: taskError } = await supabase
    .from("tasks")
    .select("id, deadline")
    .eq("group_id", groupId)
    .not("deadline", "is", null);
  if (taskError) throw new Error(taskError.message);

  await updateGroup(groupId, { deadline: newDeadline });

  const dated = (tasks ?? []).filter(
    (t): t is { id: string; deadline: string } => Boolean(t.deadline),
  );
  await Promise.all(
    dated.map((t) =>
      updateTask(t.id, {
        deadline: new Date(
          new Date(t.deadline).getTime() + deltaMs,
        ).toISOString(),
      }),
    ),
  );

  return { shiftedTasks: dated.length };
}

export async function addGroupMember(groupId: string, userId: string) {
  const { error } = await supabase
    .from("group_members")
    .insert({ group_id: groupId, user_id: userId });
  if (error) throw new Error(error.message);
}

export async function leaveGroup(groupId: string, userId: string) {
  const { error } = await supabase
    .from("group_members")
    .delete()
    .eq("group_id", groupId)
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
}

/* ---------------- calendar ---------------- */

export type CalendarItem = {
  id: string;
  kind: "group" | "task";
  title: string;
  date: string;
  groupId: string;
  groupName: string;
  completed?: boolean;
};

export async function listCalendarItems(): Promise<CalendarItem[]> {
  const [groups, tasks] = await Promise.all([
    supabase
      .from("groups")
      .select("id, name, deadline, last_activity_at")
      .not("deadline", "is", null)
      .gte("last_activity_at", activeSince()),
    supabase
      .from("tasks")
      .select(
        "id, title, deadline, completed, group_id, groups:group_id(name, last_activity_at, deadline)",
      )
      .not("deadline", "is", null),
  ]);

  if (groups.error) throw new Error(groups.error.message);
  if (tasks.error) throw new Error(tasks.error.message);

  const items: CalendarItem[] = [];

  for (const g of (groups.data ?? []) as Array<{
    id: string;
    name: string;
    deadline: string;
    last_activity_at: string;
  }>) {
    if (!isGroupActive(g)) continue;
    items.push({
      id: `group-${g.id}`,
      kind: "group",
      title: g.name,
      date: g.deadline,
      groupId: g.id,
      groupName: g.name,
    });
  }

  for (const t of (tasks.data ?? []) as unknown as Array<{
    id: string;
    title: string;
    deadline: string;
    completed: boolean;
    group_id: string;
    groups: {
      name: string;
      last_activity_at: string;
      deadline: string | null;
    } | null;
  }>) {
    if (t.groups && !isGroupActive(t.groups)) continue;
    items.push({
      id: `task-${t.id}`,
      kind: "task",
      title: t.title,
      date: t.deadline,
      groupId: t.group_id,
      groupName: t.groups?.name ?? "Project",
      completed: t.completed,
    });
  }

  return items.sort((a, b) => (a.date < b.date ? -1 : 1));
}

/* ---------------- tasks ---------------- */

export async function listTasks(groupId: string): Promise<TaskRow[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*, assignee:assigned_to(id, display_name, avatar_url, school)")
    .eq("group_id", groupId)
    .order("completed", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as TaskRow[];
}

export async function createTask(input: {
  groupId: string;
  title: string;
  assignedTo?: string | null;
  deadline?: string | null;
}) {
  const { error } = await supabase.from("tasks").insert({
    group_id: input.groupId,
    title: input.title.trim(),
    assigned_to: input.assignedTo || null,
    deadline: input.deadline || null,
  });
  if (error) throw new Error(error.message);
}

export async function updateTask(
  taskId: string,
  patch: {
    title?: string;
    assigned_to?: string | null;
    deadline?: string | null;
    completed?: boolean;
  },
) {
  const { error } = await supabase.from("tasks").update(patch).eq("id", taskId);
  if (error) throw new Error(error.message);
}

export async function deleteTask(taskId: string) {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);
  if (error) throw new Error(error.message);
}

/* ---------------- notes ---------------- */

export async function listNotes(groupId: string): Promise<NoteRow[]> {
  const { data, error } = await supabase
    .from("notes")
    .select("*, author:created_by(id, display_name, avatar_url, school)")
    .eq("group_id", groupId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as NoteRow[];
}

export async function createNote(input: {
  groupId: string;
  content: string;
  taskId?: string | null;
  authorId: string;
}) {
  const { error } = await supabase.from("notes").insert({
    group_id: input.groupId,
    content: input.content.trim(),
    task_id: input.taskId || null,
    created_by: input.authorId,
  });
  if (error) throw new Error(error.message);
}

export async function deleteNote(noteId: string) {
  const { error } = await supabase.from("notes").delete().eq("id", noteId);
  if (error) throw new Error(error.message);
}

/* ---------------- friends ---------------- */

export async function listFriendEdges(myId: string): Promise<FriendEdge[]> {
  const { data, error } = await supabase
    .from("friendships")
    .select(
      "id, status, created_at, requester_id, addressee_id, requester:requester_id(id, display_name, avatar_url, school), addressee:addressee_id(id, display_name, avatar_url, school)",
    )
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  return (
    (data ?? []) as unknown as Array<{
      id: string;
      status: FriendEdge["status"];
      created_at: string;
      requester_id: string;
      addressee_id: string;
      requester: MiniProfile | null;
      addressee: MiniProfile | null;
    }>
  )
    .map((row) => {
      const outgoing = row.requester_id === myId;
      const other = outgoing ? row.addressee : row.requester;
      if (!other) return null;
      return {
        id: row.id,
        status: row.status,
        created_at: row.created_at,
        requester_id: row.requester_id,
        addressee_id: row.addressee_id,
        other,
        direction: outgoing ? "outgoing" : "incoming",
      } as FriendEdge;
    })
    .filter(Boolean) as FriendEdge[];
}

export async function searchUsers(query: string) {
  const { data, error } = await supabase.rpc("search_users", { _q: query });
  if (error) throw new Error(error.message);
  return (data ?? []) as Array<MiniProfile & { link_status: string }>;
}

export async function sendFriendRequest(myId: string, targetId: string) {
  const { error } = await supabase
    .from("friendships")
    .insert({ requester_id: myId, addressee_id: targetId, status: "pending" });
  if (error) throw new Error(error.message);
}

export async function respondToRequest(friendshipId: string, accept: boolean) {
  const { error } = await supabase
    .from("friendships")
    .update({ status: accept ? "accepted" : "declined" })
    .eq("id", friendshipId);
  if (error) throw new Error(error.message);
}

export async function removeFriendship(friendshipId: string) {
  const { error } = await supabase
    .from("friendships")
    .delete()
    .eq("id", friendshipId);
  if (error) throw new Error(error.message);
}

export async function blockUser(myId: string, targetId: string) {
  const { error } = await supabase
    .from("blocks")
    .insert({ blocker_id: myId, blocked_id: targetId });
  if (error) throw new Error(error.message);
  await supabase
    .from("friendships")
    .delete()
    .or(
      `and(requester_id.eq.${myId},addressee_id.eq.${targetId}),and(requester_id.eq.${targetId},addressee_id.eq.${myId})`,
    );
}

export async function listBlocks() {
  const { data, error } = await supabase
    .from("blocks")
    .select(
      "id, blocked_id, created_at, profile:blocked_id(id, display_name, avatar_url, school)",
    )
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as Array<{
    id: string;
    blocked_id: string;
    created_at: string;
    profile: MiniProfile | null;
  }>;
}

export async function unblockUser(blockId: string) {
  const { error } = await supabase.from("blocks").delete().eq("id", blockId);
  if (error) throw new Error(error.message);
}

export async function reportTarget(input: {
  reporterId: string;
  reason: string;
  targetUserId?: string | null;
  targetGroupId?: string | null;
}) {
  const { error } = await supabase.from("reports").insert({
    reporter_id: input.reporterId,
    reason: input.reason.trim(),
    target_user_id: input.targetUserId ?? null,
    target_group_id: input.targetGroupId ?? null,
  });
  if (error) throw new Error(error.message);
}

/* ---------------- notifications ---------------- */

export type HubNotification = {
  id: string;
  kind:
    | "friend_request"
    | "friend_accepted"
    | "group_added"
    | "task_assigned"
    | "deadline";
  body: string;
  created_at: string;
  read: boolean;
  groupId: string | null;
  actor: MiniProfile | null;
};

export async function listNotifications(
  myId: string,
): Promise<HubNotification[]> {
  const soon = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
  const nowIso = new Date().toISOString();

  const [stored, groups, tasks] = await Promise.all([
    supabase
      .from("notifications")
      .select("*, actor:actor_id(id, display_name, avatar_url, school)")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("groups")
      .select("id, name, deadline")
      .not("deadline", "is", null)
      .gte("deadline", nowIso)
      .lte("deadline", soon)
      .gte("last_activity_at", activeSince()),
    supabase
      .from("tasks")
      .select("id, title, deadline, group_id, completed")
      .eq("assigned_to", myId)
      .eq("completed", false)
      .not("deadline", "is", null)
      .gte("deadline", nowIso)
      .lte("deadline", soon),
  ]);

  if (stored.error) throw new Error(stored.error.message);

  const items: HubNotification[] = (
    (stored.data ?? []) as unknown as Array<{
      id: string;
      type: HubNotification["kind"];
      body: string;
      created_at: string;
      read: boolean;
      group_id: string | null;
      actor: MiniProfile | null;
    }>
  ).map((n) => ({
    id: n.id,
    kind: n.type,
    body: n.body,
    created_at: n.created_at,
    read: n.read,
    groupId: n.group_id,
    actor: n.actor,
  }));

  for (const g of (groups.data ?? []) as Array<{
    id: string;
    name: string;
    deadline: string;
  }>) {
    items.push({
      id: `deadline-group-${g.id}`,
      kind: "deadline",
      body: `${g.name} is due soon`,
      created_at: g.deadline,
      read: true,
      groupId: g.id,
      actor: null,
    });
  }
  for (const t of (tasks.data ?? []) as Array<{
    id: string;
    title: string;
    deadline: string;
    group_id: string;
  }>) {
    items.push({
      id: `deadline-task-${t.id}`,
      kind: "deadline",
      body: `"${t.title}" is due soon`,
      created_at: t.deadline,
      read: true,
      groupId: t.group_id,
      actor: null,
    });
  }

  return items.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}

export async function unreadCount() {
  const { count, error } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("read", false);
  if (error) throw new Error(error.message);
  return count ?? 0;
}

export async function markAllRead() {
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("read", false);
  if (error) throw new Error(error.message);
}
