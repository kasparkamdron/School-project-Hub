import { n as __toESM } from "../_runtime.mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as Check, a as UserMinus, c as Search, j as Ban, t as X } from "../_libs/lucide-react.mjs";
import { o as cn, t as Button } from "./theme-CYc_IgXG.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./useAuth-AcyquYQ5.mjs";
import { A as searchUsers, E as removeFriendship, M as unblockUser, O as respondToRequest, a as UserAvatar, b as listFriendEdges, i as HelpHint, j as sendFriendRequest, s as blockUser, t as AppShell, v as listBlocks } from "./AppShell-Dp3kAD1K.mjs";
import { t as Skeleton } from "./skeleton-kyjHQUGP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-Dg1m_PmC.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/friends-CesAFRB7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function PersonRow({ name, school, avatar, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 rounded-[18px] glass p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
				name,
				url: avatar
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-medium",
					children: name
				}), school ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-[11px] text-muted-foreground",
					children: school
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex shrink-0 items-center gap-1.5",
				children
			})
		]
	});
}
function FriendsPage() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [query, setQuery] = (0, import_react.useState)("");
	const edges = useQuery({
		queryKey: ["friend-edges", user?.id],
		enabled: !!user,
		queryFn: () => listFriendEdges(user.id)
	});
	const blocks = useQuery({
		queryKey: ["blocks"],
		queryFn: listBlocks
	});
	const results = useQuery({
		queryKey: ["search-users", query],
		enabled: query.trim().length >= 2,
		queryFn: () => searchUsers(query)
	});
	const refresh = () => {
		queryClient.invalidateQueries({ queryKey: ["friend-edges"] });
		queryClient.invalidateQueries({ queryKey: ["search-users"] });
		queryClient.invalidateQueries({ queryKey: ["blocks"] });
		queryClient.invalidateQueries({ queryKey: ["unread-count"] });
	};
	const friends = (0, import_react.useMemo)(() => (edges.data ?? []).filter((e) => e.status === "accepted"), [edges.data]);
	const incoming = (0, import_react.useMemo)(() => (edges.data ?? []).filter((e) => e.status === "pending" && e.direction === "incoming"), [edges.data]);
	const outgoing = (0, import_react.useMemo)(() => (edges.data ?? []).filter((e) => e.status === "pending" && e.direction === "outgoing"), [edges.data]);
	const request = useMutation({
		mutationFn: (targetId) => sendFriendRequest(user.id, targetId),
		onSuccess: () => {
			refresh();
			toast.success("Request sent.");
		},
		onError: () => toast.error("Couldn't send that request.")
	});
	const respond = useMutation({
		mutationFn: ({ id, accept }) => respondToRequest(id, accept),
		onSuccess: refresh,
		onError: (e) => toast.error(e.message)
	});
	const unfriend = useMutation({
		mutationFn: (id) => removeFriendship(id),
		onSuccess: () => {
			refresh();
			toast.success("Removed.");
		},
		onError: (e) => toast.error(e.message)
	});
	const block = useMutation({
		mutationFn: (targetId) => blockUser(user.id, targetId),
		onSuccess: () => {
			refresh();
			toast.success("Blocked. They can't reach you or share a group with you.");
		},
		onError: (e) => toast.error(e.message)
	});
	const unblock = useMutation({
		mutationFn: (id) => unblockUser(id),
		onSuccess: refresh,
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass rounded-[22px] p-5 shadow-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-primary",
							children: "Friends"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 font-display text-[26px] font-semibold leading-tight",
							children: "Who you can work with"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpHint, {
						className: "ml-auto",
						title: "Adding friends",
						points: [
							"Type at least two letters of a name or school to search.",
							"Send a request — they appear in your list once they accept.",
							"Unfriending only removes the link; blocking also stops their requests and keeps them out of your groups."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-[13px] text-muted-foreground",
					children: "Groups can only be built from this list, so add your classmates first."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search by name or school",
						className: "h-12 rounded-2xl pl-11"
					})]
				})
			]
		}),
		query.trim().length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
				children: "Search results"
			}), results.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 rounded-[18px]" }) : results.data && results.data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 md:grid-cols-2",
				children: results.data.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonRow, {
					name: p.display_name,
					school: p.school,
					avatar: p.avatar_url,
					children: p.link_status === "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						className: "rounded-full",
						onClick: () => request.mutate(p.id),
						disabled: request.isPending,
						children: "Add"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground",
						children: p.link_status === "friends" ? "Friends" : p.link_status === "sent" ? "Requested" : "Wants to add you"
					})
				}, p.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-[18px] glass p-4 text-sm text-muted-foreground",
				children: "Nobody found. They need a Hub account and a finished profile."
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "friends",
			className: "mt-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "grid w-full grid-cols-3 rounded-2xl glass-inset p-1 md:w-auto md:grid-cols-none md:auto-cols-max md:grid-flow-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "friends",
							className: "rounded-xl",
							children: ["Friends ", friends.length ? `(${friends.length})` : ""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "requests",
							className: "rounded-xl",
							children: ["Requests ", incoming.length ? `(${incoming.length})` : ""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "blocked",
							className: "rounded-xl",
							children: "Blocked"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "friends",
					className: "mt-3 space-y-2",
					children: edges.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 rounded-[18px]" }) : friends.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 md:grid-cols-2",
						children: friends.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PersonRow, {
							name: f.other.display_name,
							school: f.other.school,
							avatar: f.other.avatar_url,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "rounded-full",
								"aria-label": "Remove friend",
								onClick: () => unfriend.mutate(f.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserMinus, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive",
								"aria-label": "Block user",
								onClick: () => block.mutate(f.other.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "size-4" })
							})]
						}, f.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-[18px] glass p-4 text-sm text-muted-foreground",
						children: "No friends yet. Search above to add classmates."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "requests",
					className: "mt-3 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
							children: "Received"
						}), incoming.length > 0 ? incoming.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PersonRow, {
							name: f.other.display_name,
							school: f.other.school,
							avatar: f.other.avatar_url,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								className: "rounded-full",
								"aria-label": "Accept",
								onClick: () => respond.mutate({
									id: f.id,
									accept: true
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "rounded-full",
								"aria-label": "Decline",
								onClick: () => respond.mutate({
									id: f.id,
									accept: false
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}, f.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-[18px] glass p-4 text-sm text-muted-foreground",
							children: "No pending requests."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
							children: "Sent"
						}), outgoing.length > 0 ? outgoing.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonRow, {
							name: f.other.display_name,
							school: f.other.school,
							avatar: f.other.avatar_url,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								className: "rounded-full",
								onClick: () => unfriend.mutate(f.id),
								children: "Cancel"
							})
						}, f.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-[18px] glass p-4 text-sm text-muted-foreground",
							children: "Nothing waiting."
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "blocked",
					className: "mt-3 space-y-2",
					children: blocks.data && blocks.data.length > 0 ? blocks.data.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonRow, {
						name: b.profile?.display_name ?? "Blocked user",
						school: b.profile?.school,
						avatar: b.profile?.avatar_url,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							className: "rounded-full",
							onClick: () => unblock.mutate(b.id),
							children: "Unblock"
						})
					}, b.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-[18px] glass p-4 text-sm text-muted-foreground",
						children: "Nobody blocked."
					})
				})
			]
		})
	] });
}
//#endregion
export { FriendsPage as component };
