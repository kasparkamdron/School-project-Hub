import { differenceInCalendarDays, format, isPast } from "date-fns";

export function dueLabel(deadline?: string | null) {
  if (!deadline) return null;
  const date = new Date(deadline);
  const days = differenceInCalendarDays(date, new Date());
  if (isPast(date) && days < 0) return `Overdue by ${Math.abs(days)}d`;
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  if (days <= 30) return `Due in ${days}d`;
  return `Due ${format(date, "d MMM")}`;
}

export type DueTone = "calm" | "soon" | "late";

export function dueTone(deadline?: string | null): DueTone {
  if (!deadline) return "calm";
  const days = differenceInCalendarDays(new Date(deadline), new Date());
  if (days < 0) return "late";
  if (days <= 3) return "soon";
  return "calm";
}

export function dayInput(deadline?: string | null) {
  if (!deadline) return "";
  return format(new Date(deadline), "yyyy-MM-dd");
}

export function fromDayInput(value: string) {
  if (!value) return null;
  return new Date(`${value}T23:59:00`).toISOString();
}

/** Keeps the original time of day but moves the date onto `day`. */
export function moveToDay(original: string, day: Date) {
  const from = new Date(original);
  const next = new Date(day);
  next.setHours(from.getHours(), from.getMinutes(), 0, 0);
  return next.toISOString();
}

export function shortWhen(value: string) {
  const date = new Date(value);
  const days = differenceInCalendarDays(new Date(), date);
  if (days === 0) return format(date, "HH:mm");
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  return format(date, "d MMM");
}
