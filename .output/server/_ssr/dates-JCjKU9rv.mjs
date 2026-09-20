import { i as format, r as isPast, u as differenceInCalendarDays } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dates-JCjKU9rv.js
function dueLabel(deadline) {
	if (!deadline) return null;
	const date = new Date(deadline);
	const days = differenceInCalendarDays(date, /* @__PURE__ */ new Date());
	if (isPast(date) && days < 0) return `Overdue by ${Math.abs(days)}d`;
	if (days === 0) return "Due today";
	if (days === 1) return "Due tomorrow";
	if (days <= 30) return `Due in ${days}d`;
	return `Due ${format(date, "d MMM")}`;
}
function dueTone(deadline) {
	if (!deadline) return "calm";
	const days = differenceInCalendarDays(new Date(deadline), /* @__PURE__ */ new Date());
	if (days < 0) return "late";
	if (days <= 3) return "soon";
	return "calm";
}
function fromDayInput(value) {
	if (!value) return null;
	return (/* @__PURE__ */ new Date(`${value}T23:59:00`)).toISOString();
}
/** Keeps the original time of day but moves the date onto `day`. */
function moveToDay(original, day) {
	const from = new Date(original);
	const next = new Date(day);
	next.setHours(from.getHours(), from.getMinutes(), 0, 0);
	return next.toISOString();
}
function shortWhen(value) {
	const date = new Date(value);
	const days = differenceInCalendarDays(/* @__PURE__ */ new Date(), date);
	if (days === 0) return format(date, "HH:mm");
	if (days === 1) return "yesterday";
	if (days < 7) return `${days}d ago`;
	return format(date, "d MMM");
}
//#endregion
export { shortWhen as a, moveToDay as i, dueTone as n, fromDayInput as r, dueLabel as t };
