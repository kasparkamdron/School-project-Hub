import { n as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as ChevronRight, O as CalendarDays, _ as Flag, h as GripVertical, t as X, w as ChevronLeft, x as CircleDot } from "../_libs/lucide-react.mjs";
import { o as cn, t as Button } from "./theme-CYc_IgXG.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { D as rescheduleProject, N as updateTask, _ as listActiveGroups, i as HelpHint, t as AppShell, y as listCalendarItems } from "./AppShell-Dp3kAD1K.mjs";
import { t as Skeleton } from "./skeleton-kyjHQUGP.mjs";
import { a as endOfWeek, c as endOfMonth, d as startOfWeek, f as addMonths, i as format, l as isSameDay, n as isSameMonth, o as startOfMonth, s as eachDayOfInterval, t as isToday } from "../_libs/date-fns.mjs";
import { i as moveToDay } from "./dates-JCjKU9rv.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-CXk5QcGq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WEEKDAYS = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
	"Sun"
];
function ItemRow({ item, onPickUp, isMoving }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		draggable: Boolean(onPickUp),
		onDragStart: (e) => {
			e.dataTransfer.setData("text/plain", item.id);
			e.dataTransfer.effectAllowed = "move";
			onPickUp?.(item);
		},
		className: cn("flex items-start gap-2 rounded-2xl glass-inset p-3 transition", isMoving && "ring-2 ring-primary"),
		children: [onPickUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onPickUp(item),
			"aria-label": `Move ${item.title} to another day`,
			className: "mt-0.5 grid size-7 shrink-0 cursor-grab place-items-center rounded-xl text-muted-foreground transition hover:text-foreground active:cursor-grabbing",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "size-4" })
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/groups/$groupId",
			params: { groupId: item.groupId },
			className: "flex min-w-0 flex-1 items-start gap-3 transition hover:opacity-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("mt-0.5 grid size-7 shrink-0 place-items-center rounded-xl", item.kind === "group" ? "bg-primary/15 text-primary" : "bg-accent/20 text-foreground"),
				children: item.kind === "group" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDot, { className: "size-3.5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("block truncate text-sm font-medium", item.completed && "line-through opacity-60"),
					children: item.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "block truncate text-[11px] text-muted-foreground",
					children: [
						item.kind === "group" ? "Project deadline" : item.groupName,
						" · ",
						format(new Date(item.date), "d MMM")
					]
				})]
			})]
		})]
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("rounded-full px-3 py-1.5 text-[12px] font-medium transition", active ? "bg-primary text-primary-foreground" : "glass-inset text-muted-foreground hover:text-foreground"),
		children
	});
}
function ProgressRow({ group, active, onSelect }) {
	const pct = group.taskTotal ? Math.round(group.taskDone / group.taskTotal * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onSelect,
		className: cn("w-full rounded-2xl glass-inset p-3 text-left transition hover:opacity-90", active && "ring-2 ring-primary"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-sm font-medium",
					children: group.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "shrink-0 text-[11px] font-semibold text-primary",
					children: [pct, "%"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 h-2 overflow-hidden rounded-full bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-primary transition-all",
					style: { width: `${pct}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1.5 text-[11px] text-muted-foreground",
				children: [
					group.taskDone,
					" of ",
					group.taskTotal,
					" ",
					group.taskTotal === 1 ? "task" : "tasks",
					" done",
					group.deadline ? ` · due ${format(new Date(group.deadline), "d MMM")}` : ""
				]
			})
		]
	});
}
function CalendarPage() {
	const [cursor, setCursor] = (0, import_react.useState)(() => startOfMonth(/* @__PURE__ */ new Date()));
	const [selected, setSelected] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [kind, setKind] = (0, import_react.useState)("all");
	const [projectId, setProjectId] = (0, import_react.useState)("all");
	const [hideDone, setHideDone] = (0, import_react.useState)(false);
	const [moving, setMoving] = (0, import_react.useState)(null);
	const [dropDay, setDropDay] = (0, import_react.useState)(null);
	const queryClient = useQueryClient();
	const { data: items, isLoading } = useQuery({
		queryKey: ["calendar-items"],
		queryFn: listCalendarItems
	});
	const { data: groups } = useQuery({
		queryKey: ["groups"],
		queryFn: listActiveGroups
	});
	const projects = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const i of items ?? []) map.set(i.groupId, i.groupName);
		return [...map].map(([id, name]) => ({
			id,
			name
		})).sort((a, b) => a.name.localeCompare(b.name));
	}, [items]);
	const filtered = (0, import_react.useMemo)(() => (items ?? []).filter((i) => {
		if (kind !== "all" && i.kind !== kind) return false;
		if (projectId !== "all" && i.groupId !== projectId) return false;
		if (hideDone && i.completed) return false;
		return true;
	}), [
		items,
		kind,
		projectId,
		hideDone
	]);
	const reschedule = useMutation({
		mutationFn: async ({ item, day }) => {
			const nextDate = moveToDay(item.date, day);
			if (item.kind === "group") {
				const { shiftedTasks } = await rescheduleProject(item.groupId, nextDate);
				return {
					label: `${item.title} moved to ${format(day, "d MMM")}`,
					shiftedTasks
				};
			}
			await updateTask(item.id.replace(/^task-/, ""), { deadline: nextDate });
			return {
				label: `${item.title} moved to ${format(day, "d MMM")}`,
				shiftedTasks: 0
			};
		},
		onSuccess: async ({ label, shiftedTasks }) => {
			setMoving(null);
			await queryClient.invalidateQueries();
			toast.success(shiftedTasks > 0 ? `${label} — ${shiftedTasks} task(s) shifted too` : label);
		},
		onError: (e) => {
			setMoving(null);
			toast.error(e.message);
		}
	});
	const days = (0, import_react.useMemo)(() => eachDayOfInterval({
		start: startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 }),
		end: endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 })
	}), [cursor]);
	const byDay = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const item of filtered) {
			const key = format(new Date(item.date), "yyyy-MM-dd");
			map.set(key, [...map.get(key) ?? [], item]);
		}
		return map;
	}, [filtered]);
	const selectedItems = byDay.get(format(selected, "yyyy-MM-dd")) ?? [];
	const upcoming = filtered.filter((i) => new Date(i.date) >= new Date((/* @__PURE__ */ new Date()).toDateString())).slice(0, 6);
	function handleDay(day) {
		if (moving) {
			reschedule.mutate({
				item: moving,
				day
			});
			setSelected(day);
			return;
		}
		setSelected(day);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass rounded-[22px] p-5 shadow-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-[24px] font-semibold leading-tight",
								children: "Calendar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13px] text-muted-foreground",
								children: "Filter by project, then drag a deadline onto a new day."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpHint, {
							className: "ml-auto",
							title: "Using the calendar",
							points: [
								"Dots on a day mean something is due: blue for a project deadline, amber for a task.",
								"Tap a day to see its list underneath.",
								"Drag an item onto another day to move it. On a phone, tap its grip handle first, then tap the day.",
								"Moving a project deadline shifts all of its dated tasks by the same number of days."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-tour": "calendar-filters",
					className: "mt-4 flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: kind === "all",
							onClick: () => setKind("all"),
							children: "Everything"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: kind === "group",
							onClick: () => setKind("group"),
							children: "Projects"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: kind === "task",
							onClick: () => setKind("task"),
							children: "Tasks"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-1 h-5 w-px bg-border/70",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: hideDone,
							onClick: () => setHideDone((v) => !v),
							children: "Hide finished"
						})
					]
				}),
				projects.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: projectId === "all",
						onClick: () => setProjectId("all"),
						children: "All projects"
					}), projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: projectId === p.id,
						onClick: () => setProjectId(p.id),
						children: p.name
					}, p.id))]
				}) : null
			]
		}),
		moving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center gap-3 rounded-2xl glass p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "truncate text-[13px] font-medium",
					children: [
						"Moving “",
						moving.title,
						"”"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: moving.kind === "group" ? "Tap or drop on a day — every dated task shifts with it." : "Tap or drop on a day to set the new due date."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setMoving(null),
				"aria-label": "Cancel move",
				className: "grid size-9 shrink-0 place-items-center rounded-full glass-inset text-muted-foreground transition hover:text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-5 md:grid-cols-[1.4fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass rounded-[22px] p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-semibold",
							children: format(cursor, "MMMM yyyy")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Previous month",
								onClick: () => setCursor((c) => addMonths(c, -1)),
								className: "grid size-9 place-items-center rounded-full glass-inset text-muted-foreground transition hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Next month",
								onClick: () => setCursor((c) => addMonths(c, 1)),
								className: "grid size-9 place-items-center rounded-full glass-inset text-muted-foreground transition hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground",
						children: WEEKDAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: d }, d))
					}),
					isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-2 h-64 w-full rounded-2xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 grid grid-cols-7 gap-1",
						children: days.map((day) => {
							const key = format(day, "yyyy-MM-dd");
							const dayItems = byDay.get(key) ?? [];
							const isSelected = isSameDay(day, selected);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => handleDay(day),
								onDragOver: (e) => {
									if (!moving) return;
									e.preventDefault();
									setDropDay(key);
								},
								onDragLeave: () => setDropDay((d) => d === key ? null : d),
								onDrop: (e) => {
									e.preventDefault();
									setDropDay(null);
									if (moving) reschedule.mutate({
										item: moving,
										day
									});
								},
								className: cn("flex min-h-13 flex-col items-center justify-start gap-1 rounded-2xl px-1 py-2 text-sm transition", !isSameMonth(day, cursor) && "opacity-35", isSelected ? "bg-primary text-primary-foreground" : "hover:bg-sidebar-accent/60", dropDay === key && "ring-2 ring-primary", moving && !isSelected && "bg-sidebar-accent/40"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("font-medium", isToday(day) && !isSelected && "text-primary"),
									children: format(day, "d")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex gap-0.5",
									children: dayItems.slice(0, 3).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", isSelected ? "bg-primary-foreground" : i.kind === "group" ? "bg-primary" : "bg-warning") }, i.id))
								})]
							}, day.toISOString());
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-3 px-1 text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-primary" }), " Project deadline"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-warning" }), " Task due"]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "glass rounded-[22px] p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: format(selected, "EEEE d MMM")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-2",
							children: selectedItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13px] text-muted-foreground",
								children: "Nothing due on this day."
							}) : selectedItems.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemRow, {
								item: i,
								onPickUp: setMoving,
								isMoving: moving?.id === i.id
							}, i.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "glass rounded-[22px] p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: "Project progress"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpHint, {
								className: "ml-auto",
								title: "Project progress",
								points: ["The bar shows how many of a project's tasks are ticked off.", "Tap a project to show only its dates on the calendar; tap again to show everything."]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-2",
							children: !groups ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 w-full rounded-2xl" }) : groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13px] text-muted-foreground",
								children: "No active projects yet."
							}) : groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRow, {
								group: g,
								active: projectId === g.id,
								onSelect: () => setProjectId((p) => p === g.id ? "all" : g.id)
							}, g.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "glass rounded-[22px] p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: "Coming up"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 space-y-2",
								children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-full rounded-2xl" }) : upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[13px] text-muted-foreground",
									children: "Nothing matches these filters yet. Add a due date to a project or task and it will show up here."
								}) : upcoming.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemRow, {
									item: i,
									onPickUp: setMoving,
									isMoving: moving?.id === i.id
								}, `up-${i.id}`))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "ghost",
								className: "mt-3 h-11 w-full rounded-2xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/groups",
									children: "Open your groups"
								})
							})
						]
					})
				]
			})]
		})
	] });
}
//#endregion
export { CalendarPage as component };
