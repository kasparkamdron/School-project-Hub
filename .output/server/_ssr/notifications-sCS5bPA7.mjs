import { n as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as Bell, D as CheckCheck, f as ListChecks, g as FolderPlus, i as UserPlus, k as CalendarClock } from "../_libs/lucide-react.mjs";
import { o as cn, t as Button } from "./theme-CYc_IgXG.mjs";
import { t as supabase } from "./client-Bxc8_G9k.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./useAuth-AcyquYQ5.mjs";
import { C as listNotifications, T as markAllRead, i as HelpHint, t as AppShell } from "./AppShell-Dp3kAD1K.mjs";
import { t as Skeleton } from "./skeleton-kyjHQUGP.mjs";
import { a as shortWhen } from "./dates-JCjKU9rv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-sCS5bPA7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ICONS = {
	friend_request: UserPlus,
	friend_accepted: UserPlus,
	group_added: FolderPlus,
	task_assigned: ListChecks,
	deadline: CalendarClock
};
function Row({ item }) {
	const Icon = ICONS[item.kind] ?? Bell;
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-start gap-3 rounded-[18px] glass p-4", !item.read && "border-primary/40"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid size-9 shrink-0 place-items-center rounded-full bg-primary/12 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: item.body
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-[11px] text-muted-foreground",
					children: shortWhen(item.created_at)
				})]
			}),
			!item.read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-2 shrink-0 rounded-full bg-primary" }) : null
		]
	});
	if (item.kind === "friend_request" || item.kind === "friend_accepted") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/friends",
		children: body
	});
	if (item.groupId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/groups/$groupId",
		params: { groupId: item.groupId },
		children: body
	});
	return body;
}
function NotificationsPage() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const items = useQuery({
		queryKey: ["notifications", user?.id],
		enabled: !!user,
		queryFn: () => listNotifications(user.id)
	});
	(0, import_react.useEffect)(() => {
		const channel = supabase.channel("notifications-feed").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "notifications"
		}, () => {
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
			queryClient.invalidateQueries({ queryKey: ["unread-count"] });
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [queryClient]);
	const readAll = useMutation({
		mutationFn: markAllRead,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
			queryClient.invalidateQueries({ queryKey: ["unread-count"] });
		}
	});
	const hasUnread = (items.data ?? []).some((i) => !i.read);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass rounded-[22px] p-5 shadow-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-primary",
			children: "Alerts"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-1 flex items-end justify-between gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-[26px] font-semibold leading-tight",
					children: "What needs you"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpHint, {
					className: "ml-auto",
					title: "About alerts",
					points: [
						"Friend requests, new groups and tasks assigned to you land here.",
						"Deadline reminders appear automatically three days before the date.",
						"A dot means you haven't read it yet — tap an alert to jump to the group or person."
					]
				}),
				hasUnread ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "secondary",
					className: "rounded-full",
					onClick: () => readAll.mutate(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "size-4" }), " Mark read"]
				}) : null
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mt-4 grid gap-2 md:grid-cols-2",
		children: items.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 rounded-[18px]" }) : items.data && items.data.length > 0 ? items.data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { item }, item.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-[18px] glass p-5 text-sm text-muted-foreground md:col-span-2",
			children: "Nothing here yet. Friend requests, group invites, task assignments and approaching deadlines show up on this list."
		})
	})] });
}
//#endregion
export { NotificationsPage as component };
