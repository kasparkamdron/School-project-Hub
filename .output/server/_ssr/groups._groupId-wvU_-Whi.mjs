import { n as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as Check, N as ArrowLeft, O as CalendarDays, S as ChevronUp, T as ChevronDown, d as LogOut, i as UserPlus, l as Plus, o as Trash2 } from "../_libs/lucide-react.mjs";
import { o as cn, t as Button } from "./theme-CYc_IgXG.mjs";
import { t as supabase } from "./client-Bxc8_G9k.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./useAuth-AcyquYQ5.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { N as updateTask, S as listNotes, a as UserAvatar, b as listFriendEdges, d as createTask, f as deleteNote, g as leaveGroup, h as getGroup, i as HelpHint, o as addGroupMember, p as deleteTask, t as AppShell, u as createNote, w as listTasks, x as listGroupMembers } from "./AppShell-Dp3kAD1K.mjs";
import { t as Skeleton } from "./skeleton-kyjHQUGP.mjs";
import { a as shortWhen, n as dueTone, r as fromDayInput, t as dueLabel } from "./dates-JCjKU9rv.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-Dg1m_PmC.mjs";
import { t as Route } from "./groups._groupId-DLS3Ra5b.mjs";
import { n as Textarea, t as ResponsiveSheet } from "./textarea-oQGSmu5d.mjs";
import { t as Label } from "./label-EeeZIg_F.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/groups._groupId-wvU_-Whi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var toneClass = {
	calm: "bg-muted text-muted-foreground",
	soon: "bg-warning/15 text-warning",
	late: "bg-destructive/15 text-destructive"
};
function GroupDetail() {
	const { groupId } = Route.useParams();
	const { user } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [taskOpen, setTaskOpen] = (0, import_react.useState)(false);
	const [noteOpen, setNoteOpen] = (0, import_react.useState)(false);
	const [memberOpen, setMemberOpen] = (0, import_react.useState)(false);
	const group = useQuery({
		queryKey: ["group", groupId],
		queryFn: () => getGroup(groupId)
	});
	const members = useQuery({
		queryKey: ["group-members", groupId],
		queryFn: () => listGroupMembers(groupId)
	});
	const tasks = useQuery({
		queryKey: ["tasks", groupId],
		queryFn: () => listTasks(groupId)
	});
	const notes = useQuery({
		queryKey: ["notes", groupId],
		queryFn: () => listNotes(groupId)
	});
	const refresh = () => {
		queryClient.invalidateQueries({ queryKey: ["tasks", groupId] });
		queryClient.invalidateQueries({ queryKey: ["notes", groupId] });
		queryClient.invalidateQueries({ queryKey: ["group", groupId] });
		queryClient.invalidateQueries({ queryKey: ["group-members", groupId] });
		queryClient.invalidateQueries({ queryKey: ["groups"] });
	};
	(0, import_react.useEffect)(() => {
		const channel = supabase.channel(`group-${groupId}`).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "tasks",
			filter: `group_id=eq.${groupId}`
		}, refresh).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "notes",
			filter: `group_id=eq.${groupId}`
		}, refresh).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "group_members",
			filter: `group_id=eq.${groupId}`
		}, refresh).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [groupId]);
	const toggleTask = useMutation({
		mutationFn: ({ id, completed }) => updateTask(id, { completed }),
		onSuccess: refresh,
		onError: (e) => toast.error(e.message)
	});
	const assign = useMutation({
		mutationFn: ({ id, assigned_to }) => updateTask(id, { assigned_to }),
		onSuccess: refresh,
		onError: (e) => toast.error(e.message)
	});
	const removeTask = useMutation({
		mutationFn: (id) => deleteTask(id),
		onSuccess: refresh,
		onError: (e) => toast.error(e.message)
	});
	const removeNote = useMutation({
		mutationFn: (id) => deleteNote(id),
		onSuccess: refresh,
		onError: (e) => toast.error(e.message)
	});
	const leave = useMutation({
		mutationFn: () => leaveGroup(groupId, user.id),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["groups"] });
			toast.success("You left the group.");
			navigate({
				to: "/groups",
				replace: true
			});
		},
		onError: (e) => toast.error(e.message)
	});
	const done = tasks.data?.filter((t) => t.completed).length ?? 0;
	const total = tasks.data?.length ?? 0;
	const pct = total ? Math.round(done / total * 100) : 0;
	const label = dueLabel(group.data?.deadline);
	const tone = dueTone(group.data?.deadline);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/groups",
			className: "mb-3 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " All groups"]
		}),
		group.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-32 rounded-[22px]" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass rounded-[22px] p-5 shadow-panel",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-[26px] font-semibold leading-tight",
						children: group.data?.name
					}), group.data?.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: group.data.description
					}) : null]
				}), label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold", toneClass[tone]),
					children: label
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1.5 flex justify-between text-[11px] font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						done,
						" of ",
						total,
						" tasks done"
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
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_300px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass rounded-[22px] p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: "Tasks"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpHint, {
								className: "ml-auto mr-1",
								title: "Working with tasks",
								points: [
									"Tick the box when a task is done — it counts towards the project's progress.",
									"Assign a task to a member and they get an alert.",
									"A due date makes it show up on the calendar and in deadline reminders."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "secondary",
								className: "rounded-full",
								onClick: () => setTaskOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 divide-y divide-border/60",
						children: tasks.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16" }) : tasks.data && tasks.data.length > 0 ? tasks.data.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: task.completed,
									onCheckedChange: (checked) => toggleTask.mutate({
										id: task.id,
										completed: checked === true
									}),
									className: "mt-0.5 size-6 rounded-lg",
									"aria-label": `Mark ${task.title} complete`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("text-sm font-medium", task.completed && "text-muted-foreground line-through"),
										children: task.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground",
										children: [task.deadline ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3" }),
												" ",
												dueLabel(task.deadline)
											]
										}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: task.assigned_to ?? "none",
											onValueChange: (value) => assign.mutate({
												id: task.id,
												assigned_to: value === "none" ? null : value
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "h-7 w-auto min-w-28 rounded-full border-0 glass-inset px-3 text-[11px]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Unassigned" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "none",
												children: "Unassigned"
											}), (members.data ?? []).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: m.id,
												children: m.id === user?.id ? "You" : m.display_name
											}, m.id))] })]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => removeTask.mutate(task.id),
									"aria-label": "Delete task",
									className: "mt-1 text-muted-foreground transition hover:text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})
							]
						}, task.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-4 text-sm text-muted-foreground",
							children: "No tasks yet. Add the first one and assign it to someone."
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass rounded-[22px] p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: "Notes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpHint, {
								className: "ml-auto mr-1",
								title: "Notes",
								points: [
									"Plain text notes everyone in the group can read.",
									"You can attach a note to a specific task to keep the detail next to the work.",
									"Writing a note also counts as activity, so it keeps the group from clearing."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "secondary",
								className: "rounded-full",
								onClick: () => setNoteOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-2",
						children: notes.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 rounded-2xl" }) : notes.data && notes.data.length > 0 ? notes.data.map((note) => {
							const task = tasks.data?.find((t) => t.id === note.task_id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-[16px] glass-inset p-3",
								children: [
									task ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mb-1 text-[11px] font-semibold uppercase tracking-wide text-primary",
										children: ["on: ", task.title]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "whitespace-pre-wrap text-pretty text-[13px] leading-relaxed",
										children: note.content
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex items-center gap-2 text-[11px] text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
												name: note.author?.display_name,
												url: note.author?.avatar_url,
												className: "size-5"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: note.author?.display_name ?? "Member" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shortWhen(note.created_at) }),
											note.created_by === user?.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => removeNote.mutate(note.id),
												className: "ml-auto transition hover:text-destructive",
												"aria-label": "Delete note",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
											}) : null
										]
									})
								]
							}, note.id);
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-2 text-sm text-muted-foreground",
							children: "No notes yet. Drop anything the group needs to remember."
						})
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass rounded-[22px] p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Members"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "secondary",
							className: "rounded-full",
							onClick: () => setMemberOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }), " Add"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-2",
						children: (members.data ?? []).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
								name: m.display_name,
								url: m.avatar_url,
								className: "size-8"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-sm font-medium",
									children: [m.id === user?.id ? "You" : m.display_name, group.data?.created_by === m.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-2 rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-semibold text-primary",
										children: "owner"
									}) : null]
								}), m.school ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[11px] text-muted-foreground",
									children: m.school
								}) : null]
							})]
						}, m.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass rounded-[22px] p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Group info"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-3 space-y-2 text-[13px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Deadline"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-medium",
										children: dueLabel(group.data?.deadline) ?? "None set"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Last activity"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-medium",
										children: group.data?.last_activity_at ? shortWhen(group.data.last_activity_at) : "—"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Clears after"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-medium",
										children: "21 quiet days"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: "mt-4 w-full justify-start rounded-2xl text-destructive hover:bg-destructive/10 hover:text-destructive",
							onClick: () => leave.mutate(),
							disabled: leave.isPending,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Leave group"]
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddTaskSheet, {
			open: taskOpen,
			onOpenChange: setTaskOpen,
			groupId,
			members: members.data ?? [],
			onDone: refresh
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddNoteSheet, {
			open: noteOpen,
			onOpenChange: setNoteOpen,
			groupId,
			tasks: (tasks.data ?? []).map((t) => ({
				id: t.id,
				title: t.title
			})),
			onDone: refresh
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddMemberSheet, {
			open: memberOpen,
			onOpenChange: setMemberOpen,
			groupId,
			existing: (members.data ?? []).map((m) => m.id),
			onDone: refresh
		})
	] });
}
function AddTaskSheet({ open, onOpenChange, groupId, members, onDone }) {
	const { user } = useAuth();
	const [title, setTitle] = (0, import_react.useState)("");
	const [assignee, setAssignee] = (0, import_react.useState)("none");
	const [deadline, setDeadline] = (0, import_react.useState)("");
	const add = useMutation({
		mutationFn: async () => {
			if (title.trim().length < 2) throw new Error("Give the task a title.");
			await createTask({
				groupId,
				title,
				assignedTo: assignee === "none" ? null : assignee,
				deadline: fromDayInput(deadline)
			});
		},
		onSuccess: () => {
			setTitle("");
			setAssignee("none");
			setDeadline("");
			onOpenChange(false);
			onDone();
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveSheet, {
		open,
		onOpenChange,
		title: "New task",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "task-title",
						children: "Task"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "task-title",
						value: title,
						onChange: (e) => setTitle(e.target.value),
						placeholder: "Draft results & figures",
						className: "h-12 rounded-2xl",
						maxLength: 140
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Assign to" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: assignee,
						onValueChange: setAssignee,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-12 rounded-2xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Unassigned" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "none",
							children: "Unassigned"
						}), members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: m.id,
							children: m.id === user?.id ? "You" : m.display_name
						}, m.id))] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "task-deadline",
						children: "Deadline (optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "task-deadline",
						type: "date",
						value: deadline,
						onChange: (e) => setDeadline(e.target.value),
						className: "h-12 rounded-2xl"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "h-13 w-full rounded-2xl text-base",
					onClick: () => add.mutate(),
					disabled: add.isPending,
					children: add.isPending ? "Adding…" : "Add task"
				})
			]
		})
	});
}
function AddNoteSheet({ open, onOpenChange, groupId, tasks, onDone }) {
	const { user } = useAuth();
	const [content, setContent] = (0, import_react.useState)("");
	const [taskId, setTaskId] = (0, import_react.useState)("none");
	const add = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("Not signed in");
			if (content.trim().length < 2) throw new Error("Write something first.");
			await createNote({
				groupId,
				content,
				taskId: taskId === "none" ? null : taskId,
				authorId: user.id
			});
		},
		onSuccess: () => {
			setContent("");
			setTaskId("none");
			onOpenChange(false);
			onDone();
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveSheet, {
		open,
		onOpenChange,
		title: "New note",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "note-content",
						children: "Note"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "note-content",
						value: content,
						onChange: (e) => setContent(e.target.value),
						placeholder: "Upload the raw CSV to the shared sheet before Friday.",
						className: "min-h-28 rounded-2xl",
						maxLength: 2e3
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Attach to a task (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: taskId,
						onValueChange: setTaskId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-12 rounded-2xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Whole group" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "none",
							children: "Whole group"
						}), tasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: t.id,
							children: t.title
						}, t.id))] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "h-13 w-full rounded-2xl text-base",
					onClick: () => add.mutate(),
					disabled: add.isPending,
					children: add.isPending ? "Saving…" : "Save note"
				})
			]
		})
	});
}
function AddMemberSheet({ open, onOpenChange, groupId, existing, onDone }) {
	const { user } = useAuth();
	const { data: edges = [] } = useQuery({
		queryKey: ["friend-edges", user?.id],
		enabled: !!user,
		queryFn: () => listFriendEdges(user.id)
	});
	const candidates = (0, import_react.useMemo)(() => edges.filter((e) => e.status === "accepted").map((e) => e.other).filter((p) => !existing.includes(p.id)), [edges, existing]);
	const add = useMutation({
		mutationFn: (userId) => addGroupMember(groupId, userId),
		onSuccess: () => {
			onDone();
			toast.success("Member added.");
		},
		onError: () => toast.error("That person can't be added to this group.")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveSheet, {
		open,
		onOpenChange,
		title: "Add members",
		description: "Only friends can join your group.",
		children: candidates.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-2xl glass-inset p-3 text-sm text-muted-foreground",
			children: "Every friend is already in this group. Add more classmates on the Friends tab."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: candidates.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 rounded-2xl glass-inset p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
						name: c.display_name,
						url: c.avatar_url,
						className: "size-8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: c.display_name
						}), c.school ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-[11px] text-muted-foreground",
							children: c.school
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						className: "rounded-full",
						onClick: () => add.mutate(c.id),
						disabled: add.isPending,
						children: "Add"
					})
				]
			}, c.id))
		})
	});
}
//#endregion
export { GroupDetail as component };
