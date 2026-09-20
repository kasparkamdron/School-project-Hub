import { n as __toESM } from "../_runtime.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as Bell, O as CalendarDays, b as CircleQuestionMark, m as LayoutGrid, n as Users, p as LifeBuoy, r as User, s as Sun, u as Moon, y as Compass } from "../_libs/lucide-react.mjs";
import { c as useTheme, o as cn, s as startTour } from "./theme-CYc_IgXG.mjs";
import { t as supabase } from "./client-Bxc8_G9k.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as useProfile } from "./useAuth-AcyquYQ5.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
import { n as AvatarFallback$1, r as AvatarImage$1, t as Avatar$1 } from "../_libs/radix-ui__react-avatar.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-Dp3kAD1K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
/**
* Small inline help affordances.
*
* MAINTENANCE: when a feature gains something non-obvious, add a <HelpHint />
* next to its heading rather than writing a paragraph into the page.
*/
function HelpHint({ title, points, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": `Help: ${title}`,
			className: cn("grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-sidebar-accent/60 hover:text-foreground", className),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "size-4" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
		align: "end",
		className: "w-[260px] rounded-3xl p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-[15px] font-semibold leading-tight",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 space-y-1.5",
			children: points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-2 text-[12px] leading-relaxed text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p })]
			}, p))
		})]
	})] });
}
/** Always-available help button for the top bar. */
function HelpMenu() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"data-tour": "help",
			"aria-label": "Help",
			className: "grid size-10 place-items-center rounded-full glass text-muted-foreground transition hover:text-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeBuoy, { className: "size-4" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
		align: "end",
		className: "w-[280px] rounded-3xl p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-[15px] font-semibold leading-tight",
				children: "Need a hand?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-1.5",
				children: [
					"Add friends first — groups can only include people on your friend list.",
					"Tasks and notes keep a project alive; 21 quiet days and it clears itself.",
					"On the calendar, drag a project deadline to move the whole plan.",
					"Look for the ? next to a heading for tips about that part."
				].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2 text-[12px] leading-relaxed text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p })]
				}, p))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => startTour(),
				className: "mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-[13px] font-medium text-primary-foreground transition hover:opacity-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4" }), " Take the tour"]
			})
		]
	})] });
}
var Avatar = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
	ref,
	className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
	...props
}));
Avatar.displayName = Avatar$1.displayName;
var AvatarImage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
	ref,
	className: cn("aspect-square h-full w-full", className),
	...props
}));
AvatarImage.displayName = AvatarImage$1.displayName;
var AvatarFallback = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
	ref,
	className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
	...props
}));
AvatarFallback.displayName = AvatarFallback$1.displayName;
function initials(name) {
	const clean = (name ?? "").trim();
	if (!clean) return "?";
	return clean.split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}
function UserAvatar({ name, url, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
		className: cn("size-9 border border-border/60", className),
		children: [url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
			src: url,
			alt: name ?? "Member"
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "bg-primary/12 font-display text-xs font-semibold text-primary",
			children: initials(name)
		})]
	});
}
function AvatarStack({ people }) {
	const shown = people.slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center",
		children: [shown.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
			name: p.display_name,
			url: p.avatar_url,
			className: "-mr-2 size-7 ring-2 ring-background last:mr-0"
		}, p.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "ml-3 text-xs text-muted-foreground",
			children: [
				people.length,
				" ",
				people.length === 1 ? "member" : "members"
			]
		})]
	});
}
var DAY_MS = 864e5;
function activeSince() {
	return (/* @__PURE__ */ new Date(Date.now() - 30 * DAY_MS)).toISOString();
}
/** Deadlines older than this are past their grace period. */
function deadlineCutoff() {
	return (/* @__PURE__ */ new Date(Date.now() - 14 * DAY_MS)).toISOString();
}
/** Live "is this group still active" rule, matching the nightly cleanup. */
function isGroupActive(g) {
	if (g.last_activity_at < activeSince()) return false;
	if (g.deadline && g.deadline < deadlineCutoff()) return false;
	return true;
}
function unwrap(data, error) {
	if (error) throw new Error(error.message);
	return data;
}
async function saveProfile(input) {
	const { error } = await supabase.from("profiles").update({
		display_name: input.display_name.trim(),
		school: input.school?.trim() || null,
		...input.avatar_url !== void 0 ? { avatar_url: input.avatar_url || null } : {},
		...input.onboarded !== void 0 ? { onboarded: input.onboarded } : {}
	}).eq("id", input.id);
	if (error) throw new Error(error.message);
}
async function exportMyData() {
	const { data, error } = await supabase.rpc("export_my_data");
	return unwrap(data, error);
}
async function listActiveGroups() {
	const { data, error } = await supabase.from("groups").select("*, group_members(user_id, profiles:user_id(id, display_name, avatar_url, school)), tasks(id, completed)").gte("last_activity_at", activeSince()).order("last_activity_at", { ascending: false });
	if (error) throw new Error(error.message);
	return (data ?? []).filter((g) => isGroupActive(g)).map((g) => {
		const memberRows = g["group_members"] ?? [];
		const tasks = g["tasks"] ?? [];
		return {
			...g,
			members: memberRows.map((m) => m.profiles).filter(Boolean),
			taskTotal: tasks.length,
			taskDone: tasks.filter((t) => t.completed).length
		};
	});
}
async function countQuietGroups() {
	const { data, error } = await supabase.from("groups").select("last_activity_at, deadline");
	if (error) throw new Error(error.message);
	return (data ?? []).filter((g) => !isGroupActive(g)).length;
}
async function getGroup(groupId) {
	const { data, error } = await supabase.from("groups").select("*").eq("id", groupId).single();
	return unwrap(data, error);
}
async function listGroupMembers(groupId) {
	const { data, error } = await supabase.from("group_members").select("user_id, profiles:user_id(id, display_name, avatar_url, school)").eq("group_id", groupId);
	if (error) throw new Error(error.message);
	return (data ?? []).map((r) => r.profiles).filter(Boolean);
}
async function createGroup(input) {
	const args = {
		_name: input.name,
		_description: input.description ?? null,
		_deadline: input.deadline ?? null,
		_member_ids: input.memberIds
	};
	const { data, error } = await supabase.rpc("create_group_with_members", args);
	return unwrap(data, error);
}
async function updateGroup(groupId, patch) {
	const { error } = await supabase.from("groups").update(patch).eq("id", groupId);
	if (error) throw new Error(error.message);
}
/**
* Moves a project deadline and shifts every dated task in that project by the
* same amount, so the whole plan keeps its internal spacing.
*/
async function rescheduleProject(groupId, newDeadline) {
	const { data: group, error } = await supabase.from("groups").select("id, deadline").eq("id", groupId).maybeSingle();
	if (error) throw new Error(error.message);
	if (!group?.deadline) throw new Error("This project has no deadline yet.");
	const deltaMs = new Date(newDeadline).getTime() - new Date(group.deadline).getTime();
	if (deltaMs === 0) return { shiftedTasks: 0 };
	const { data: tasks, error: taskError } = await supabase.from("tasks").select("id, deadline").eq("group_id", groupId).not("deadline", "is", null);
	if (taskError) throw new Error(taskError.message);
	await updateGroup(groupId, { deadline: newDeadline });
	const dated = (tasks ?? []).filter((t) => Boolean(t.deadline));
	await Promise.all(dated.map((t) => updateTask(t.id, { deadline: new Date(new Date(t.deadline).getTime() + deltaMs).toISOString() })));
	return { shiftedTasks: dated.length };
}
async function addGroupMember(groupId, userId) {
	const { error } = await supabase.from("group_members").insert({
		group_id: groupId,
		user_id: userId
	});
	if (error) throw new Error(error.message);
}
async function leaveGroup(groupId, userId) {
	const { error } = await supabase.from("group_members").delete().eq("group_id", groupId).eq("user_id", userId);
	if (error) throw new Error(error.message);
}
async function listCalendarItems() {
	const [groups, tasks] = await Promise.all([supabase.from("groups").select("id, name, deadline, last_activity_at").not("deadline", "is", null).gte("last_activity_at", activeSince()), supabase.from("tasks").select("id, title, deadline, completed, group_id, groups:group_id(name, last_activity_at, deadline)").not("deadline", "is", null)]);
	if (groups.error) throw new Error(groups.error.message);
	if (tasks.error) throw new Error(tasks.error.message);
	const items = [];
	for (const g of groups.data ?? []) {
		if (!isGroupActive(g)) continue;
		items.push({
			id: `group-${g.id}`,
			kind: "group",
			title: g.name,
			date: g.deadline,
			groupId: g.id,
			groupName: g.name
		});
	}
	for (const t of tasks.data ?? []) {
		if (t.groups && !isGroupActive(t.groups)) continue;
		items.push({
			id: `task-${t.id}`,
			kind: "task",
			title: t.title,
			date: t.deadline,
			groupId: t.group_id,
			groupName: t.groups?.name ?? "Project",
			completed: t.completed
		});
	}
	return items.sort((a, b) => a.date < b.date ? -1 : 1);
}
async function listTasks(groupId) {
	const { data, error } = await supabase.from("tasks").select("*, assignee:assigned_to(id, display_name, avatar_url, school)").eq("group_id", groupId).order("completed", { ascending: true }).order("created_at", { ascending: true });
	if (error) throw new Error(error.message);
	return data ?? [];
}
async function createTask(input) {
	const { error } = await supabase.from("tasks").insert({
		group_id: input.groupId,
		title: input.title.trim(),
		assigned_to: input.assignedTo || null,
		deadline: input.deadline || null
	});
	if (error) throw new Error(error.message);
}
async function updateTask(taskId, patch) {
	const { error } = await supabase.from("tasks").update(patch).eq("id", taskId);
	if (error) throw new Error(error.message);
}
async function deleteTask(taskId) {
	const { error } = await supabase.from("tasks").delete().eq("id", taskId);
	if (error) throw new Error(error.message);
}
async function listNotes(groupId) {
	const { data, error } = await supabase.from("notes").select("*, author:created_by(id, display_name, avatar_url, school)").eq("group_id", groupId).order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data ?? [];
}
async function createNote(input) {
	const { error } = await supabase.from("notes").insert({
		group_id: input.groupId,
		content: input.content.trim(),
		task_id: input.taskId || null,
		created_by: input.authorId
	});
	if (error) throw new Error(error.message);
}
async function deleteNote(noteId) {
	const { error } = await supabase.from("notes").delete().eq("id", noteId);
	if (error) throw new Error(error.message);
}
async function listFriendEdges(myId) {
	const { data, error } = await supabase.from("friendships").select("id, status, created_at, requester_id, addressee_id, requester:requester_id(id, display_name, avatar_url, school), addressee:addressee_id(id, display_name, avatar_url, school)").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return (data ?? []).map((row) => {
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
			direction: outgoing ? "outgoing" : "incoming"
		};
	}).filter(Boolean);
}
async function searchUsers(query) {
	const { data, error } = await supabase.rpc("search_users", { _q: query });
	if (error) throw new Error(error.message);
	return data ?? [];
}
async function sendFriendRequest(myId, targetId) {
	const { error } = await supabase.from("friendships").insert({
		requester_id: myId,
		addressee_id: targetId,
		status: "pending"
	});
	if (error) throw new Error(error.message);
}
async function respondToRequest(friendshipId, accept) {
	const { error } = await supabase.from("friendships").update({ status: accept ? "accepted" : "declined" }).eq("id", friendshipId);
	if (error) throw new Error(error.message);
}
async function removeFriendship(friendshipId) {
	const { error } = await supabase.from("friendships").delete().eq("id", friendshipId);
	if (error) throw new Error(error.message);
}
async function blockUser(myId, targetId) {
	const { error } = await supabase.from("blocks").insert({
		blocker_id: myId,
		blocked_id: targetId
	});
	if (error) throw new Error(error.message);
	await supabase.from("friendships").delete().or(`and(requester_id.eq.${myId},addressee_id.eq.${targetId}),and(requester_id.eq.${targetId},addressee_id.eq.${myId})`);
}
async function listBlocks() {
	const { data, error } = await supabase.from("blocks").select("id, blocked_id, created_at, profile:blocked_id(id, display_name, avatar_url, school)").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data ?? [];
}
async function unblockUser(blockId) {
	const { error } = await supabase.from("blocks").delete().eq("id", blockId);
	if (error) throw new Error(error.message);
}
async function listNotifications(myId) {
	const soon = new Date(Date.now() + 2592e5).toISOString();
	const nowIso = (/* @__PURE__ */ new Date()).toISOString();
	const [stored, groups, tasks] = await Promise.all([
		supabase.from("notifications").select("*, actor:actor_id(id, display_name, avatar_url, school)").order("created_at", { ascending: false }).limit(50),
		supabase.from("groups").select("id, name, deadline").not("deadline", "is", null).gte("deadline", nowIso).lte("deadline", soon).gte("last_activity_at", activeSince()),
		supabase.from("tasks").select("id, title, deadline, group_id, completed").eq("assigned_to", myId).eq("completed", false).not("deadline", "is", null).gte("deadline", nowIso).lte("deadline", soon)
	]);
	if (stored.error) throw new Error(stored.error.message);
	const items = (stored.data ?? []).map((n) => ({
		id: n.id,
		kind: n.type,
		body: n.body,
		created_at: n.created_at,
		read: n.read,
		groupId: n.group_id,
		actor: n.actor
	}));
	for (const g of groups.data ?? []) items.push({
		id: `deadline-group-${g.id}`,
		kind: "deadline",
		body: `${g.name} is due soon`,
		created_at: g.deadline,
		read: true,
		groupId: g.id,
		actor: null
	});
	for (const t of tasks.data ?? []) items.push({
		id: `deadline-task-${t.id}`,
		kind: "deadline",
		body: `"${t.title}" is due soon`,
		created_at: t.deadline,
		read: true,
		groupId: t.group_id,
		actor: null
	});
	return items.sort((a, b) => a.created_at < b.created_at ? 1 : -1);
}
async function unreadCount() {
	const { count, error } = await supabase.from("notifications").select("id", {
		count: "exact",
		head: true
	}).eq("read", false);
	if (error) throw new Error(error.message);
	return count ?? 0;
}
async function markAllRead() {
	const { error } = await supabase.from("notifications").update({ read: true }).eq("read", false);
	if (error) throw new Error(error.message);
}
var NAV = [
	{
		to: "/groups",
		label: "Groups",
		icon: LayoutGrid,
		tour: "groups"
	},
	{
		to: "/calendar",
		label: "Calendar",
		icon: CalendarDays,
		tour: "calendar"
	},
	{
		to: "/friends",
		label: "Friends",
		icon: Users,
		tour: "friends"
	},
	{
		to: "/notifications",
		label: "Alerts",
		icon: Bell,
		tour: "notifications"
	},
	{
		to: "/profile",
		label: "You",
		icon: User,
		tour: "profile"
	}
];
function Atmosphere() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -left-32 -top-40 size-[540px] rounded-full blur-3xl",
				style: { background: "var(--blob-1)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -right-36 top-1/4 size-[500px] rounded-full blur-3xl",
				style: { background: "var(--blob-2)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-0 left-1/4 size-[460px] rounded-full blur-3xl",
				style: { background: "var(--blob-3)" }
			})
		]
	});
}
function useActivePath() {
	return useRouterState({ select: (s) => s.location.pathname });
}
function HubMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid size-10 place-items-center rounded-2xl bg-primary font-display text-lg font-bold text-primary-foreground", className),
		children: "H"
	});
}
function ThemeButton() {
	const { theme, toggleTheme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: toggleTheme,
		"aria-label": theme === "frost" ? "Switch to Chalk theme" : "Switch to Frost theme",
		className: "grid size-10 place-items-center rounded-full glass text-muted-foreground transition hover:text-foreground",
		children: theme === "frost" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" })
	});
}
function TopBar({ unread }) {
	const { data: profile } = useProfile();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "glass-strong sticky top-0 z-30 rounded-b-3xl md:rounded-none md:border-0 md:bg-transparent md:backdrop-blur-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-5 py-3 md:px-8 md:py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "leading-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-[17px] font-semibold",
							children: "Hub"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[10px] font-medium text-muted-foreground",
							children: "Project coordination"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden md:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl font-semibold",
						children: "Hub"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Self-clearing project coordination"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpMenu, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeButton, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/notifications",
							className: "relative grid size-10 place-items-center rounded-full glass text-muted-foreground transition hover:text-foreground",
							"aria-label": "Notifications",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground",
								children: unread
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/profile",
							"aria-label": "Your profile",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
								name: profile?.display_name,
								url: profile?.avatar_url
							})
						})
					]
				})
			]
		})
	});
}
function Sidebar({ unread }) {
	const pathname = useActivePath();
	const { data: profile } = useProfile();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "fixed inset-y-0 left-0 z-30 hidden w-64 flex-col gap-2 border-r border-border/60 p-5 md:flex glass",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold leading-none",
					children: "Hub"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[11px] text-muted-foreground",
					children: "Wipes itself clean"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-col gap-1",
				children: NAV.map(({ to, label, icon: Icon, tour }) => {
					const active = pathname === to || pathname.startsWith(`${to}/`);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to,
						"data-tour": tour,
						className: cn("flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition", active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
							label,
							to === "/notifications" && unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto grid min-w-5 place-items-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground",
								children: unread
							}) : null
						]
					}, to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/profile",
				className: "mt-auto flex items-center gap-3 rounded-2xl glass-inset px-3 py-3 transition hover:opacity-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
					name: profile?.display_name,
					url: profile?.avatar_url,
					className: "size-8"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-medium",
						children: profile?.display_name || "You"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-[11px] text-muted-foreground",
						children: profile?.school || "Add your school"
					})]
				})]
			})
		]
	});
}
function BottomTabs({ unread }) {
	const pathname = useActivePath();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-30 md:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-[430px] px-4 pb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass-strong flex items-center justify-between rounded-3xl px-3 py-2 shadow-panel",
				children: NAV.map(({ to, label, icon: Icon, tour }) => {
					const active = pathname === to || pathname.startsWith(`${to}/`);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to,
						"data-tour": tour,
						className: cn("relative flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-2xl transition active:scale-95", active ? "text-primary" : "text-muted-foreground"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold",
								children: label
							}),
							to === "/notifications" && unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-3 top-2 size-2 rounded-full bg-destructive ring-2 ring-background" }) : null
						]
					}, to);
				})
			})
		})
	});
}
function AppShell({ children }) {
	const { data: unread = 0 } = useQuery({
		queryKey: ["unread-count"],
		queryFn: unreadCount,
		refetchInterval: 6e4
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, { unread }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative md:pl-64",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-full max-w-[430px] md:max-w-6xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { unread }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "px-4 pb-32 pt-4 md:px-8 md:pb-12 md:pt-0",
						children
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomTabs, { unread })
		]
	});
}
//#endregion
export { searchUsers as A, listNotifications as C, rescheduleProject as D, removeFriendship as E, unblockUser as M, updateTask as N, respondToRequest as O, listNotes as S, markAllRead as T, listActiveGroups as _, UserAvatar as a, listFriendEdges as b, countQuietGroups as c, createTask as d, deleteNote as f, leaveGroup as g, getGroup as h, HelpHint as i, sendFriendRequest as j, saveProfile as k, createGroup as l, exportMyData as m, Atmosphere as n, addGroupMember as o, deleteTask as p, AvatarStack as r, blockUser as s, AppShell as t, createNote as u, listBlocks as v, listTasks as w, listGroupMembers as x, listCalendarItems as y };
