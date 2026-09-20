import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  LogOut,
  Plus,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/hub/AppShell";
import { HelpHint } from "@/components/hub/HelpHint";
import { ResponsiveSheet } from "@/components/hub/ResponsiveSheet";
import { UserAvatar } from "@/components/hub/UserAvatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { dueLabel, dueTone, fromDayInput, shortWhen } from "@/lib/dates";
import {
  addGroupMember,
  createNote,
  createTask,
  deleteNote,
  deleteTask,
  getGroup,
  leaveGroup,
  listFriendEdges,
  listGroupMembers,
  listNotes,
  listTasks,
  updateTask,
} from "@/lib/hub-api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/groups/$groupId")({
  head: () => ({
    meta: [
      { title: "Group workspace — Hub" },
      {
        name: "description",
        content:
          "Tasks, assignees, deadlines and shared notes for one project group.",
      },
      { property: "og:title", content: "Group workspace — Hub" },
      {
        property: "og:description",
        content: "Split the work, track deadlines and keep notes in one place.",
      },
    ],
  }),
  component: GroupDetail,
});

const toneClass: Record<string, string> = {
  calm: "bg-muted text-muted-foreground",
  soon: "bg-warning/15 text-warning",
  late: "bg-destructive/15 text-destructive",
};

function GroupDetail() {
  const { groupId } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [taskOpen, setTaskOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [memberOpen, setMemberOpen] = useState(false);

  const group = useQuery({
    queryKey: ["group", groupId],
    queryFn: () => getGroup(groupId),
  });
  const members = useQuery({
    queryKey: ["group-members", groupId],
    queryFn: () => listGroupMembers(groupId),
  });
  const tasks = useQuery({
    queryKey: ["tasks", groupId],
    queryFn: () => listTasks(groupId),
  });
  const notes = useQuery({
    queryKey: ["notes", groupId],
    queryFn: () => listNotes(groupId),
  });

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["tasks", groupId] });
    queryClient.invalidateQueries({ queryKey: ["notes", groupId] });
    queryClient.invalidateQueries({ queryKey: ["group", groupId] });
    queryClient.invalidateQueries({ queryKey: ["group-members", groupId] });
    queryClient.invalidateQueries({ queryKey: ["groups"] });
  };

  useEffect(() => {
    const channel = supabase
      .channel(`group-${groupId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
          filter: `group_id=eq.${groupId}`,
        },
        refresh,
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notes",
          filter: `group_id=eq.${groupId}`,
        },
        refresh,
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "group_members",
          filter: `group_id=eq.${groupId}`,
        },
        refresh,
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const toggleTask = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      updateTask(id, { completed }),
    onSuccess: refresh,
    onError: (e: Error) => toast.error(e.message),
  });

  const assign = useMutation({
    mutationFn: ({
      id,
      assigned_to,
    }: {
      id: string;
      assigned_to: string | null;
    }) => updateTask(id, { assigned_to }),
    onSuccess: refresh,
    onError: (e: Error) => toast.error(e.message),
  });

  const removeTask = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: refresh,
    onError: (e: Error) => toast.error(e.message),
  });

  const removeNote = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: refresh,
    onError: (e: Error) => toast.error(e.message),
  });

  const leave = useMutation({
    mutationFn: () => leaveGroup(groupId, user!.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success("You left the group.");
      navigate({ to: "/groups", replace: true });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const done = tasks.data?.filter((t) => t.completed).length ?? 0;
  const total = tasks.data?.length ?? 0;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const label = dueLabel(group.data?.deadline);
  const tone = dueTone(group.data?.deadline);

  return (
    <AppShell>
      <Link
        to="/groups"
        className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All groups
      </Link>

      {group.isLoading ? (
        <Skeleton className="h-32 rounded-[22px]" />
      ) : (
        <section className="glass rounded-[22px] p-5 shadow-panel">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="font-display text-[26px] font-semibold leading-tight">
                {group.data?.name}
              </h1>
              {group.data?.description ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  {group.data.description}
                </p>
              ) : null}
            </div>
            {label ? (
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                  toneClass[tone],
                )}
              >
                {label}
              </span>
            ) : null}
          </div>
          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-[11px] font-medium">
              <span>
                {done} of {total} tasks done
              </span>
              <span className="text-primary">{pct}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </section>
      )}

      <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_300px]">
        {/* main column: tasks + notes */}
        <div className="space-y-5">
          <section className="glass rounded-[22px] p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Tasks</h2>
              <HelpHint
                className="ml-auto mr-1"
                title="Working with tasks"
                points={[
                  "Tick the box when a task is done — it counts towards the project's progress.",
                  "Assign a task to a member and they get an alert.",
                  "A due date makes it show up on the calendar and in deadline reminders.",
                ]}
              />
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full"
                onClick={() => setTaskOpen(true)}
              >
                <Plus className="size-4" /> Add
              </Button>
            </div>

            <div className="mt-3 divide-y divide-border/60">
              {tasks.isLoading ? (
                <Skeleton className="h-16" />
              ) : tasks.data && tasks.data.length > 0 ? (
                tasks.data.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 py-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={(checked) =>
                        toggleTask.mutate({
                          id: task.id,
                          completed: checked === true,
                        })
                      }
                      className="mt-0.5 size-6 rounded-lg"
                      aria-label={`Mark ${task.title} complete`}
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          task.completed &&
                            "text-muted-foreground line-through",
                        )}
                      >
                        {task.title}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                        {task.deadline ? (
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays className="size-3" />{" "}
                            {dueLabel(task.deadline)}
                          </span>
                        ) : null}
                        <Select
                          value={task.assigned_to ?? "none"}
                          onValueChange={(value) =>
                            assign.mutate({
                              id: task.id,
                              assigned_to: value === "none" ? null : value,
                            })
                          }
                        >
                          <SelectTrigger className="h-7 w-auto min-w-28 rounded-full border-0 glass-inset px-3 text-[11px]">
                            <SelectValue placeholder="Unassigned" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Unassigned</SelectItem>
                            {(members.data ?? []).map((m) => (
                              <SelectItem key={m.id} value={m.id}>
                                {m.id === user?.id ? "You" : m.display_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTask.mutate(task.id)}
                      aria-label="Delete task"
                      className="mt-1 text-muted-foreground transition hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="py-4 text-sm text-muted-foreground">
                  No tasks yet. Add the first one and assign it to someone.
                </p>
              )}
            </div>
          </section>

          <section className="glass rounded-[22px] p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Notes</h2>
              <HelpHint
                className="ml-auto mr-1"
                title="Notes"
                points={[
                  "Plain text notes everyone in the group can read.",
                  "You can attach a note to a specific task to keep the detail next to the work.",
                  "Writing a note also counts as activity, so it keeps the group from clearing.",
                ]}
              />
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full"
                onClick={() => setNoteOpen(true)}
              >
                <Plus className="size-4" /> Add
              </Button>
            </div>

            <div className="mt-3 space-y-2">
              {notes.isLoading ? (
                <Skeleton className="h-16 rounded-2xl" />
              ) : notes.data && notes.data.length > 0 ? (
                notes.data.map((note) => {
                  const task = tasks.data?.find((t) => t.id === note.task_id);
                  return (
                    <div
                      key={note.id}
                      className="rounded-[16px] glass-inset p-3"
                    >
                      {task ? (
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                          on: {task.title}
                        </p>
                      ) : null}
                      <p className="whitespace-pre-wrap text-pretty text-[13px] leading-relaxed">
                        {note.content}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                        <UserAvatar
                          name={note.author?.display_name}
                          url={note.author?.avatar_url}
                          className="size-5"
                        />
                        <span>{note.author?.display_name ?? "Member"}</span>
                        <span>·</span>
                        <span>{shortWhen(note.created_at)}</span>
                        {note.created_by === user?.id ? (
                          <button
                            type="button"
                            onClick={() => removeNote.mutate(note.id)}
                            className="ml-auto transition hover:text-destructive"
                            aria-label="Delete note"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        ) : null}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="py-2 text-sm text-muted-foreground">
                  No notes yet. Drop anything the group needs to remember.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* side column: members + info */}
        <div className="space-y-5">
          <section className="glass rounded-[22px] p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Members</h2>
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full"
                onClick={() => setMemberOpen(true)}
              >
                <UserPlus className="size-4" /> Add
              </Button>
            </div>
            <div className="mt-3 space-y-2">
              {(members.data ?? []).map((m) => (
                <div key={m.id} className="flex items-center gap-3">
                  <UserAvatar
                    name={m.display_name}
                    url={m.avatar_url}
                    className="size-8"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {m.id === user?.id ? "You" : m.display_name}
                      {group.data?.created_by === m.id ? (
                        <span className="ml-2 rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          owner
                        </span>
                      ) : null}
                    </p>
                    {m.school ? (
                      <p className="truncate text-[11px] text-muted-foreground">
                        {m.school}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass rounded-[22px] p-4">
            <h2 className="font-display text-lg font-semibold">Group info</h2>
            <dl className="mt-3 space-y-2 text-[13px]">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Deadline</dt>
                <dd className="font-medium">
                  {dueLabel(group.data?.deadline) ?? "None set"}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Last activity</dt>
                <dd className="font-medium">
                  {group.data?.last_activity_at
                    ? shortWhen(group.data.last_activity_at)
                    : "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Clears after</dt>
                <dd className="font-medium">21 quiet days</dd>
              </div>
            </dl>
            <Button
              variant="ghost"
              className="mt-4 w-full justify-start rounded-2xl text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => leave.mutate()}
              disabled={leave.isPending}
            >
              <LogOut className="size-4" /> Leave group
            </Button>
          </section>
        </div>
      </div>

      <AddTaskSheet
        open={taskOpen}
        onOpenChange={setTaskOpen}
        groupId={groupId}
        members={members.data ?? []}
        onDone={refresh}
      />
      <AddNoteSheet
        open={noteOpen}
        onOpenChange={setNoteOpen}
        groupId={groupId}
        tasks={(tasks.data ?? []).map((t) => ({ id: t.id, title: t.title }))}
        onDone={refresh}
      />
      <AddMemberSheet
        open={memberOpen}
        onOpenChange={setMemberOpen}
        groupId={groupId}
        existing={(members.data ?? []).map((m) => m.id)}
        onDone={refresh}
      />
    </AppShell>
  );
}

function AddTaskSheet({
  open,
  onOpenChange,
  groupId,
  members,
  onDone,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  groupId: string;
  members: { id: string; display_name: string }[];
  onDone: () => void;
}) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("none");
  const [deadline, setDeadline] = useState("");

  const add = useMutation({
    mutationFn: async () => {
      if (title.trim().length < 2) throw new Error("Give the task a title.");
      await createTask({
        groupId,
        title,
        assignedTo: assignee === "none" ? null : assignee,
        deadline: fromDayInput(deadline),
      });
    },
    onSuccess: () => {
      setTitle("");
      setAssignee("none");
      setDeadline("");
      onOpenChange(false);
      onDone();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <ResponsiveSheet open={open} onOpenChange={onOpenChange} title="New task">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="task-title">Task</Label>
          <Input
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Draft results & figures"
            className="h-12 rounded-2xl"
            maxLength={140}
          />
        </div>
        <div className="space-y-2">
          <Label>Assign to</Label>
          <Select value={assignee} onValueChange={setAssignee}>
            <SelectTrigger className="h-12 rounded-2xl">
              <SelectValue placeholder="Unassigned" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Unassigned</SelectItem>
              {members.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.id === user?.id ? "You" : m.display_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="task-deadline">Deadline (optional)</Label>
          <Input
            id="task-deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="h-12 rounded-2xl"
          />
        </div>
        <Button
          className="h-13 w-full rounded-2xl text-base"
          onClick={() => add.mutate()}
          disabled={add.isPending}
        >
          {add.isPending ? "Adding…" : "Add task"}
        </Button>
      </div>
    </ResponsiveSheet>
  );
}

function AddNoteSheet({
  open,
  onOpenChange,
  groupId,
  tasks,
  onDone,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  groupId: string;
  tasks: { id: string; title: string }[];
  onDone: () => void;
}) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [taskId, setTaskId] = useState("none");

  const add = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not signed in");
      if (content.trim().length < 2) throw new Error("Write something first.");
      await createNote({
        groupId,
        content,
        taskId: taskId === "none" ? null : taskId,
        authorId: user.id,
      });
    },
    onSuccess: () => {
      setContent("");
      setTaskId("none");
      onOpenChange(false);
      onDone();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <ResponsiveSheet open={open} onOpenChange={onOpenChange} title="New note">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="note-content">Note</Label>
          <Textarea
            id="note-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Upload the raw CSV to the shared sheet before Friday."
            className="min-h-28 rounded-2xl"
            maxLength={2000}
          />
        </div>
        <div className="space-y-2">
          <Label>Attach to a task (optional)</Label>
          <Select value={taskId} onValueChange={setTaskId}>
            <SelectTrigger className="h-12 rounded-2xl">
              <SelectValue placeholder="Whole group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Whole group</SelectItem>
              {tasks.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          className="h-13 w-full rounded-2xl text-base"
          onClick={() => add.mutate()}
          disabled={add.isPending}
        >
          {add.isPending ? "Saving…" : "Save note"}
        </Button>
      </div>
    </ResponsiveSheet>
  );
}

function AddMemberSheet({
  open,
  onOpenChange,
  groupId,
  existing,
  onDone,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  groupId: string;
  existing: string[];
  onDone: () => void;
}) {
  const { user } = useAuth();
  const { data: edges = [] } = useQuery({
    queryKey: ["friend-edges", user?.id],
    enabled: !!user,
    queryFn: () => listFriendEdges(user!.id),
  });

  const candidates = useMemo(
    () =>
      edges
        .filter((e) => e.status === "accepted")
        .map((e) => e.other)
        .filter((p) => !existing.includes(p.id)),
    [edges, existing],
  );

  const add = useMutation({
    mutationFn: (userId: string) => addGroupMember(groupId, userId),
    onSuccess: () => {
      onDone();
      toast.success("Member added.");
    },
    onError: () => toast.error("That person can't be added to this group."),
  });

  return (
    <ResponsiveSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Add members"
      description="Only friends can join your group."
    >
      {candidates.length === 0 ? (
        <p className="rounded-2xl glass-inset p-3 text-sm text-muted-foreground">
          Every friend is already in this group. Add more classmates on the
          Friends tab.
        </p>
      ) : (
        <div className="space-y-2">
          {candidates.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-3 rounded-2xl glass-inset p-3"
            >
              <UserAvatar
                name={c.display_name}
                url={c.avatar_url}
                className="size-8"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{c.display_name}</p>
                {c.school ? (
                  <p className="truncate text-[11px] text-muted-foreground">
                    {c.school}
                  </p>
                ) : null}
              </div>
              <Button
                size="sm"
                className="rounded-full"
                onClick={() => add.mutate(c.id)}
                disabled={add.isPending}
              >
                Add
              </Button>
            </div>
          ))}
        </div>
      )}
    </ResponsiveSheet>
  );
}
