import { n as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as Plus } from "../_libs/lucide-react.mjs";
import { o as cn, t as Button } from "./theme-CYc_IgXG.mjs";
import { t as supabase } from "./client-Bxc8_G9k.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./useAuth-AcyquYQ5.mjs";
import { _ as listActiveGroups, a as UserAvatar, b as listFriendEdges, c as countQuietGroups, i as HelpHint, l as createGroup, r as AvatarStack, t as AppShell } from "./AppShell-Dp3kAD1K.mjs";
import { t as Skeleton } from "./skeleton-kyjHQUGP.mjs";
import { n as dueTone, r as fromDayInput, t as dueLabel } from "./dates-JCjKU9rv.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-Dg1m_PmC.mjs";
import { n as Textarea, t as ResponsiveSheet } from "./textarea-oQGSmu5d.mjs";
import { t as Label } from "./label-EeeZIg_F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/groups.index-h4rvjU4s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var toneClass = {
	calm: "bg-muted text-muted-foreground",
	soon: "bg-warning/15 text-warning",
	late: "bg-destructive/15 text-destructive"
};
function GroupCard({ group }) {
	const pct = group.taskTotal ? Math.round(group.taskDone / group.taskTotal * 100) : 0;
	const label = dueLabel(group.deadline);
	const tone = dueTone(group.deadline);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/groups/$groupId",
		params: { groupId: group.id },
		className: "block rounded-[22px] glass p-4 transition active:scale-[0.99] hover:shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "truncate font-display text-[18px] font-semibold",
						children: group.name
					}), group.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 line-clamp-1 text-xs text-muted-foreground",
						children: group.description
					}) : null]
				}), label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold", toneClass[tone]),
					children: label
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarStack, { people: group.members })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1.5 flex justify-between text-[11px] font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						group.taskDone,
						" of ",
						group.taskTotal,
						" ",
						group.taskTotal === 1 ? "task" : "tasks",
						" done"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-primary",
						children: [pct, "%"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-primary transition-all",
						style: { width: `${pct}%` }
					})
				})]
			})
		]
	});
}
function CreateGroupSheet({ open, onOpenChange }) {
	const { user } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [deadline, setDeadline] = (0, import_react.useState)("");
	const [picked, setPicked] = (0, import_react.useState)([]);
	const { data: edges = [] } = useQuery({
		queryKey: ["friend-edges", user?.id],
		enabled: !!user,
		queryFn: () => listFriendEdges(user.id)
	});
	const friends = (0, import_react.useMemo)(() => edges.filter((e) => e.status === "accepted").map((e) => e.other), [edges]);
	const create = useMutation({
		mutationFn: async () => {
			if (name.trim().length < 2) throw new Error("Give the group a name.");
			return createGroup({
				name,
				description,
				deadline: fromDayInput(deadline),
				memberIds: picked
			});
		},
		onSuccess: async (groupId) => {
			await queryClient.invalidateQueries({ queryKey: ["groups"] });
			onOpenChange(false);
			setName("");
			setDescription("");
			setDeadline("");
			setPicked([]);
			navigate({
				to: "/groups/$groupId",
				params: { groupId }
			});
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveSheet, {
		open,
		onOpenChange,
		title: "New group",
		description: "Only your friends can be added to a group.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "group-name",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "group-name",
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Marketing Case Study",
						className: "h-12 rounded-2xl",
						maxLength: 80
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "group-desc",
						children: "Description (optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "group-desc",
						value: description,
						onChange: (e) => setDescription(e.target.value),
						placeholder: "Positioning & go-to-market for Fable Coffee.",
						className: "min-h-20 rounded-2xl",
						maxLength: 400
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "group-deadline",
						children: "Deadline (optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "group-deadline",
						type: "date",
						value: deadline,
						onChange: (e) => setDeadline(e.target.value),
						className: "h-12 rounded-2xl"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Members" }), friends.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-2xl glass-inset p-3 text-xs text-muted-foreground",
						children: "You have no friends yet. Add classmates on the Friends tab first — you can still create the group and add them later."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: friends.map((f) => {
							const active = picked.includes(f.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setPicked((prev) => active ? prev.filter((id) => id !== f.id) : [...prev, f.id]),
								className: cn("inline-flex items-center gap-2 rounded-full py-1.5 pl-1 pr-3 text-xs font-medium transition", active ? "bg-primary text-primary-foreground" : "glass-inset text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
									name: f.display_name,
									url: f.avatar_url,
									className: "size-6"
								}), f.display_name]
							}, f.id);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "h-13 w-full rounded-2xl text-base",
					onClick: () => create.mutate(),
					disabled: create.isPending,
					children: create.isPending ? "Creating…" : "Create group"
				})
			]
		})
	});
}
function GroupsPage() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const queryClient = useQueryClient();
	const { data: groups, isLoading } = useQuery({
		queryKey: ["groups"],
		queryFn: listActiveGroups
	});
	const { data: quiet = 0 } = useQuery({
		queryKey: ["groups", "quiet"],
		queryFn: countQuietGroups
	});
	(0, import_react.useEffect)(() => {
		const channel = supabase.channel("groups-feed").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "tasks"
		}, () => queryClient.invalidateQueries({ queryKey: ["groups"] })).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "group_members"
		}, () => queryClient.invalidateQueries({ queryKey: ["groups"] })).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass relative overflow-hidden rounded-[22px] p-5 shadow-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-primary",
						children: "Your groups"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpHint, {
						className: "ml-auto -mt-1",
						title: "How groups work",
						points: [
							"Create a group with the plus button and pick members from your friend list.",
							"Adding or finishing a task, or writing a note, keeps the group alive.",
							"A group leaves this list 30 days after its last activity, or 14 days after its deadline, then gets deleted."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 max-w-[16ch] text-balance font-display text-[30px] font-semibold leading-[1.05] md:text-[36px]",
					children: "The board, wiped clean each term."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-[42ch] text-pretty text-[13px] text-muted-foreground",
					children: "Quiet groups drop off after 30 days of no work — or 14 days after the deadline — so nothing lingers."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full glass-inset px-2.5 py-1 text-[11px] font-medium",
							children: [groups?.length ?? 0, " active"]
						}),
						quiet > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground",
							children: [quiet, " clearing out"]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-tour": "new-group",
							className: "ml-auto hidden rounded-full md:inline-flex",
							onClick: () => setOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New group"]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 rounded-[22px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 rounded-[22px]" })] }) : groups && groups.length > 0 ? groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupCard, { group: g }, g.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[22px] glass p-6 text-center md:col-span-2 xl:col-span-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-semibold",
						children: "No active groups"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-1 max-w-[38ch] text-sm text-muted-foreground",
						children: "Start one for your next project and add the friends you are working with."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-4 rounded-full",
						onClick: () => setOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New group"]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 rounded-[20px] glass quiet-pulse p-4 md:max-w-2xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid size-9 shrink-0 place-items-center rounded-full glass-inset font-display text-sm font-semibold text-muted-foreground",
					children: "21"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13px] font-medium",
						children: "Older groups clear themselves."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: "No tasks or notes for 30 days — or 14 days past the deadline — and a group leaves this list, then gets deleted for good."
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setOpen(true),
			"aria-label": "New group",
			"data-tour": "new-group",
			className: "fixed bottom-28 right-5 z-30 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-float transition active:scale-95 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-6" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateGroupSheet, {
			open,
			onOpenChange: setOpen
		})
	] });
}
//#endregion
export { GroupsPage as component };
