import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Flag,
  GripVertical,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/hub/AppShell";
import { HelpHint } from "@/components/hub/HelpHint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { moveToDay } from "@/lib/dates";
import {
  listActiveGroups,
  listCalendarItems,
  rescheduleProject,
  updateTask,
  type CalendarItem,
  type GroupSummary,
} from "@/lib/hub-api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — Hub" },
      {
        name: "description",
        content:
          "See every project deadline and task due date month by month, filter by project, and drag a project to reschedule the whole plan.",
      },
      { property: "og:title", content: "Calendar — Hub" },
      {
        property: "og:description",
        content: "Filter your group project deadlines and drag them to a new day to reschedule everything at once.",
      },
    ],
  }),
  component: CalendarPage,
});

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type KindFilter = "all" | "group" | "task";

function ItemRow({
  item,
  onPickUp,
  isMoving,
}: {
  item: CalendarItem;
  onPickUp?: (item: CalendarItem) => void;
  isMoving?: boolean;
}) {
  return (
    <div
      draggable={Boolean(onPickUp)}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", item.id);
        e.dataTransfer.effectAllowed = "move";
        onPickUp?.(item);
      }}
      className={cn(
        "flex items-start gap-2 rounded-2xl glass-inset p-3 transition",
        isMoving && "ring-2 ring-primary",
      )}
    >
      {onPickUp ? (
        <button
          type="button"
          onClick={() => onPickUp(item)}
          aria-label={`Move ${item.title} to another day`}
          className="mt-0.5 grid size-7 shrink-0 cursor-grab place-items-center rounded-xl text-muted-foreground transition hover:text-foreground active:cursor-grabbing"
        >
          <GripVertical className="size-4" />
        </button>
      ) : null}
      <Link
        to="/groups/$groupId"
        params={{ groupId: item.groupId }}
        className="flex min-w-0 flex-1 items-start gap-3 transition hover:opacity-90"
      >
        <span
          className={cn(
            "mt-0.5 grid size-7 shrink-0 place-items-center rounded-xl",
            item.kind === "group" ? "bg-primary/15 text-primary" : "bg-accent/20 text-foreground",
          )}
        >
          {item.kind === "group" ? <Flag className="size-3.5" /> : <CircleDot className="size-3.5" />}
        </span>
        <span className="min-w-0">
          <span className={cn("block truncate text-sm font-medium", item.completed && "line-through opacity-60")}>
            {item.title}
          </span>
          <span className="block truncate text-[11px] text-muted-foreground">
            {item.kind === "group" ? "Project deadline" : item.groupName}
            {" · "}
            {format(new Date(item.date), "d MMM")}
          </span>
        </span>
      </Link>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-[12px] font-medium transition",
        active ? "bg-primary text-primary-foreground" : "glass-inset text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function ProgressRow({
  group,
  active,
  onSelect,
}: {
  group: GroupSummary;
  active: boolean;
  onSelect: () => void;
}) {
  const pct = group.taskTotal ? Math.round((group.taskDone / group.taskTotal) * 100) : 0;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full rounded-2xl glass-inset p-3 text-left transition hover:opacity-90",
        active && "ring-2 ring-primary",
      )}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate text-sm font-medium">{group.name}</span>
        <span className="shrink-0 text-[11px] font-semibold text-primary">{pct}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1.5 text-[11px] text-muted-foreground">
        {group.taskDone} of {group.taskTotal} {group.taskTotal === 1 ? "task" : "tasks"} done
        {group.deadline ? ` · due ${format(new Date(group.deadline), "d MMM")}` : ""}
      </p>
    </button>
  );
}

function CalendarPage() {
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));
  const [selected, setSelected] = useState<Date>(() => new Date());
  const [kind, setKind] = useState<KindFilter>("all");
  const [projectId, setProjectId] = useState<string>("all");
  const [hideDone, setHideDone] = useState(false);
  const [moving, setMoving] = useState<CalendarItem | null>(null);
  const [dropDay, setDropDay] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: items, isLoading } = useQuery({
    queryKey: ["calendar-items"],
    queryFn: listCalendarItems,
  });

  const { data: groups } = useQuery({ queryKey: ["groups"], queryFn: listActiveGroups });

  const projects = useMemo(() => {
    const map = new Map<string, string>();
    for (const i of items ?? []) map.set(i.groupId, i.groupName);
    return [...map].map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  const filtered = useMemo(
    () =>
      (items ?? []).filter((i) => {
        if (kind !== "all" && i.kind !== kind) return false;
        if (projectId !== "all" && i.groupId !== projectId) return false;
        if (hideDone && i.completed) return false;
        return true;
      }),
    [items, kind, projectId, hideDone],
  );

  const reschedule = useMutation({
    mutationFn: async ({ item, day }: { item: CalendarItem; day: Date }) => {
      const nextDate = moveToDay(item.date, day);
      if (item.kind === "group") {
        const { shiftedTasks } = await rescheduleProject(item.groupId, nextDate);
        return { label: `${item.title} moved to ${format(day, "d MMM")}`, shiftedTasks };
      }
      await updateTask(item.id.replace(/^task-/, ""), { deadline: nextDate });
      return { label: `${item.title} moved to ${format(day, "d MMM")}`, shiftedTasks: 0 };
    },
    onSuccess: async ({ label, shiftedTasks }) => {
      setMoving(null);
      await queryClient.invalidateQueries();
      toast.success(shiftedTasks > 0 ? `${label} — ${shiftedTasks} task(s) shifted too` : label);
    },
    onError: (e: Error) => {
      setMoving(null);
      toast.error(e.message);
    },
  });

  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 }),
        end: endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 }),
      }),
    [cursor],
  );

  const byDay = useMemo(() => {
    const map = new Map<string, CalendarItem[]>();
    for (const item of filtered) {
      const key = format(new Date(item.date), "yyyy-MM-dd");
      map.set(key, [...(map.get(key) ?? []), item]);
    }
    return map;
  }, [filtered]);

  const selectedItems = byDay.get(format(selected, "yyyy-MM-dd")) ?? [];
  const upcoming = filtered.filter((i) => new Date(i.date) >= new Date(new Date().toDateString())).slice(0, 6);

  function handleDay(day: Date) {
    if (moving) {
      reschedule.mutate({ item: moving, day });
      setSelected(day);
      return;
    }
    setSelected(day);
  }

  return (
    <AppShell>
      <section className="glass rounded-[22px] p-5 shadow-panel">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
            <CalendarDays className="size-5" />
          </span>
          <div className="min-w-0">
            <h1 className="font-display text-[24px] font-semibold leading-tight">Calendar</h1>
            <p className="text-[13px] text-muted-foreground">
              Filter by project, then drag a deadline onto a new day.
            </p>
          </div>
          <HelpHint
            className="ml-auto"
            title="Using the calendar"
            points={[
              "Dots on a day mean something is due: blue for a project deadline, amber for a task.",
              "Tap a day to see its list underneath.",
              "Drag an item onto another day to move it. On a phone, tap its grip handle first, then tap the day.",
              "Moving a project deadline shifts all of its dated tasks by the same number of days.",
            ]}
          />
        </div>

        <div data-tour="calendar-filters" className="mt-4 flex flex-wrap items-center gap-2">
          <Chip active={kind === "all"} onClick={() => setKind("all")}>
            Everything
          </Chip>
          <Chip active={kind === "group"} onClick={() => setKind("group")}>
            Projects
          </Chip>
          <Chip active={kind === "task"} onClick={() => setKind("task")}>
            Tasks
          </Chip>
          <span className="mx-1 h-5 w-px bg-border/70" aria-hidden />
          <Chip active={hideDone} onClick={() => setHideDone((v) => !v)}>
            Hide finished
          </Chip>
        </div>

        {projects.length > 0 ? (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Chip active={projectId === "all"} onClick={() => setProjectId("all")}>
              All projects
            </Chip>
            {projects.map((p) => (
              <Chip key={p.id} active={projectId === p.id} onClick={() => setProjectId(p.id)}>
                {p.name}
              </Chip>
            ))}
          </div>
        ) : null}
      </section>

      {moving ? (
        <div className="mt-4 flex items-center gap-3 rounded-2xl glass p-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium">Moving “{moving.title}”</p>
            <p className="text-xs text-muted-foreground">
              {moving.kind === "group"
                ? "Tap or drop on a day — every dated task shifts with it."
                : "Tap or drop on a day to set the new due date."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMoving(null)}
            aria-label="Cancel move"
            className="grid size-9 shrink-0 place-items-center rounded-full glass-inset text-muted-foreground transition hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 md:grid-cols-[1.4fr_1fr]">
        <section className="glass rounded-[22px] p-4">
          <div className="flex items-center justify-between px-1">
            <p className="font-display text-lg font-semibold">{format(cursor, "MMMM yyyy")}</p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => setCursor((c) => addMonths(c, -1))}
                className="grid size-9 place-items-center rounded-full glass-inset text-muted-foreground transition hover:text-foreground"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setCursor((c) => addMonths(c, 1))}
                className="grid size-9 place-items-center rounded-full glass-inset text-muted-foreground transition hover:text-foreground"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            {WEEKDAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          {isLoading ? (
            <Skeleton className="mt-2 h-64 w-full rounded-2xl" />
          ) : (
            <div className="mt-1 grid grid-cols-7 gap-1">
              {days.map((day) => {
                const key = format(day, "yyyy-MM-dd");
                const dayItems = byDay.get(key) ?? [];
                const isSelected = isSameDay(day, selected);
                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => handleDay(day)}
                    onDragOver={(e) => {
                      if (!moving) return;
                      e.preventDefault();
                      setDropDay(key);
                    }}
                    onDragLeave={() => setDropDay((d) => (d === key ? null : d))}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDropDay(null);
                      if (moving) reschedule.mutate({ item: moving, day });
                    }}
                    className={cn(
                      "flex min-h-13 flex-col items-center justify-start gap-1 rounded-2xl px-1 py-2 text-sm transition",
                      !isSameMonth(day, cursor) && "opacity-35",
                      isSelected ? "bg-primary text-primary-foreground" : "hover:bg-sidebar-accent/60",
                      dropDay === key && "ring-2 ring-primary",
                      moving && !isSelected && "bg-sidebar-accent/40",
                    )}
                  >
                    <span className={cn("font-medium", isToday(day) && !isSelected && "text-primary")}>
                      {format(day, "d")}
                    </span>
                    <span className="flex gap-0.5">
                      {dayItems.slice(0, 3).map((i) => (
                        <span
                          key={i.id}
                          className={cn(
                            "size-1.5 rounded-full",
                            isSelected ? "bg-primary-foreground" : i.kind === "group" ? "bg-primary" : "bg-warning",
                          )}
                        />
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-3 px-1 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-primary" /> Project deadline
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-warning" /> Task due
            </span>
          </div>
        </section>

        <div className="space-y-5">
          <section className="glass rounded-[22px] p-5">
            <h2 className="font-display text-lg font-semibold">{format(selected, "EEEE d MMM")}</h2>
            <div className="mt-3 space-y-2">
              {selectedItems.length === 0 ? (
                <p className="text-[13px] text-muted-foreground">Nothing due on this day.</p>
              ) : (
                selectedItems.map((i) => (
                  <ItemRow key={i.id} item={i} onPickUp={setMoving} isMoving={moving?.id === i.id} />
                ))
              )}
            </div>
          </section>

          <section className="glass rounded-[22px] p-5">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-semibold">Project progress</h2>
              <HelpHint
                className="ml-auto"
                title="Project progress"
                points={[
                  "The bar shows how many of a project's tasks are ticked off.",
                  "Tap a project to show only its dates on the calendar; tap again to show everything.",
                ]}
              />
            </div>
            <div className="mt-3 space-y-2">
              {!groups ? (
                <Skeleton className="h-20 w-full rounded-2xl" />
              ) : groups.length === 0 ? (
                <p className="text-[13px] text-muted-foreground">No active projects yet.</p>
              ) : (
                groups.map((g) => (
                  <ProgressRow
                    key={g.id}
                    group={g}
                    active={projectId === g.id}
                    onSelect={() => setProjectId((p) => (p === g.id ? "all" : g.id))}
                  />
                ))
              )}
            </div>
          </section>

          <section className="glass rounded-[22px] p-5">
            <h2 className="font-display text-lg font-semibold">Coming up</h2>
            <div className="mt-3 space-y-2">
              {isLoading ? (
                <Skeleton className="h-16 w-full rounded-2xl" />
              ) : upcoming.length === 0 ? (
                <p className="text-[13px] text-muted-foreground">
                  Nothing matches these filters yet. Add a due date to a project or task and it will show up here.
                </p>
              ) : (
                upcoming.map((i) => (
                  <ItemRow key={`up-${i.id}`} item={i} onPickUp={setMoving} isMoving={moving?.id === i.id} />
                ))
              )}
            </div>
            <Button asChild variant="ghost" className="mt-3 h-11 w-full rounded-2xl">
              <Link to="/groups">Open your groups</Link>
            </Button>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
