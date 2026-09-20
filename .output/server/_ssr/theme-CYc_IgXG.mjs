import { n as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime, j as Slot } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as ArrowRight, N as ArrowLeft, t as X, y as Compass } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-CYc_IgXG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var STORAGE_KEY$1 = "hub-tour-seen";
var TOUR_STEPS = [
	{
		target: "[data-tour=\"groups\"]",
		route: "/groups",
		title: "Your project groups",
		body: "Every group you're working on lives here. Tap one to open its tasks and notes.",
		tip: "A group nobody touches for 30 days, or one that is 14 days past its deadline, disappears on its own — no clean-up needed."
	},
	{
		target: "[data-tour=\"new-group\"]",
		route: "/groups",
		title: "Start a group",
		body: "Use the plus button to create a project and pick members from your friend list.",
		tip: "Nobody to pick yet? Add friends first — that's the Friends tab."
	},
	{
		target: "[data-tour=\"calendar\"]",
		route: "/calendar",
		title: "Calendar view",
		body: "Everything laid out by date, with a list for the day you tap and what's coming up.",
		tip: "Drag a project deadline onto another day and every dated task shifts with it. On a phone, tap the grip handle then tap a day."
	},
	{
		target: "[data-tour=\"calendar-filters\"]",
		route: "/calendar",
		title: "Narrow it down",
		body: "Show only projects, only tasks, or one single project, and hide anything already finished.",
		tip: "The progress bars below the month also work as filters — tap one to focus that project."
	},
	{
		target: "[data-tour=\"friends\"]",
		route: "/friends",
		title: "Friends",
		body: "Search classmates, send and accept requests. You can only add friends to a group, so start here.",
		tip: "Blocking someone stops their requests and keeps them out of your groups."
	},
	{
		target: "[data-tour=\"notifications\"]",
		route: "/notifications",
		title: "Alerts",
		body: "Friend requests, tasks assigned to you and deadlines coming up in the next three days."
	},
	{
		target: "[data-tour=\"help\"]",
		route: "/notifications",
		title: "Help whenever you need it",
		body: "This button has the short version of everything, plus a way to restart this tour.",
		tip: "A small ? next to a heading explains that part of the screen."
	},
	{
		target: "[data-tour=\"profile\"]",
		route: "/profile",
		title: "You",
		body: "Change your name, school and theme, download your data, or delete your account.",
		tip: "You can replay this tour from here anytime."
	}
];
function visibleTarget(selector) {
	if (!selector) return null;
	return Array.from(document.querySelectorAll(selector)).find((el) => {
		const r = el.getBoundingClientRect();
		return r.width > 0 || r.height > 0;
	}) ?? null;
}
function useSpotlight(selector, active) {
	const [box, setBox] = (0, import_react.useState)(null);
	const measure = (0, import_react.useCallback)(() => {
		if (!active) return;
		const el = visibleTarget(selector);
		if (!el) {
			setBox(null);
			return;
		}
		const r = el.getBoundingClientRect();
		setBox({
			top: r.top,
			left: r.left,
			width: r.width,
			height: r.height
		});
	}, [selector, active]);
	(0, import_react.useLayoutEffect)(() => {
		if (!active) return;
		measure();
		const id = window.setInterval(measure, 250);
		window.addEventListener("resize", measure);
		window.addEventListener("scroll", measure, true);
		return () => {
			window.clearInterval(id);
			window.removeEventListener("resize", measure);
			window.removeEventListener("scroll", measure, true);
		};
	}, [measure, active]);
	return box;
}
function startTour() {
	window.dispatchEvent(new CustomEvent("hub:start-tour"));
}
function TourGuide() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [index, setIndex] = (0, import_react.useState)(0);
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const inApp = TOUR_STEPS.some((s) => pathname === s.route || pathname.startsWith(`${s.route}/`));
	(0, import_react.useEffect)(() => {
		const onStart = () => {
			setIndex(0);
			setOpen(true);
		};
		window.addEventListener("hub:start-tour", onStart);
		return () => window.removeEventListener("hub:start-tour", onStart);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!inApp) return;
		if (Number(window.localStorage.getItem(STORAGE_KEY$1) ?? "0") < 5) {
			setIndex(0);
			setOpen(true);
			window.localStorage.setItem(STORAGE_KEY$1, String(5));
		}
	}, [inApp]);
	const step = TOUR_STEPS[index];
	(0, import_react.useEffect)(() => {
		if (!open || !step) return;
		if (pathname !== step.route) navigate({ to: step.route });
	}, [
		open,
		step,
		pathname,
		navigate
	]);
	const scrolledFor = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open || !step) return;
		const key = `${index}-${pathname}`;
		if (scrolledFor.current === key) return;
		const id = window.setTimeout(() => {
			const el = visibleTarget(step.target);
			if (el) {
				el.scrollIntoView({
					behavior: "smooth",
					block: "center"
				});
				scrolledFor.current = key;
			}
		}, 250);
		return () => window.clearTimeout(id);
	}, [
		open,
		step,
		index,
		pathname
	]);
	const box = useSpotlight(step?.target ?? "", open);
	const finish = (0, import_react.useCallback)(() => {
		window.localStorage.setItem(STORAGE_KEY$1, String(5));
		setOpen(false);
	}, []);
	const last = index === TOUR_STEPS.length - 1;
	const next = (0, import_react.useCallback)(() => {
		if (index === TOUR_STEPS.length - 1) finish();
		else setIndex((i) => i + 1);
	}, [index, finish]);
	const back = (0, import_react.useCallback)(() => setIndex((i) => Math.max(0, i - 1)), []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") finish();
			if (e.key === "ArrowRight" || e.key === "Enter") next();
			if (e.key === "ArrowLeft") back();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		open,
		finish,
		next,
		back
	]);
	if (!open || !step) return null;
	const cardBelow = box ? box.top < window.innerHeight / 2 : true;
	const progress = (index + 1) / TOUR_STEPS.length * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[70]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-foreground/45 backdrop-blur-[2px]",
				onClick: finish
			}),
			box ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute rounded-3xl ring-2 ring-primary transition-all duration-200",
				style: {
					top: box.top - 6,
					left: box.left - 6,
					width: box.width + 12,
					height: box.height + 12,
					boxShadow: "0 0 0 9999px rgba(0,0,0,0.01)",
					background: "transparent"
				}
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 px-4",
				style: box ? cardBelow ? { top: Math.min(box.top + box.height + 16, Math.max(window.innerHeight - 300, 16)) } : { top: Math.max(box.top - 290, 16) } : {
					top: "50%",
					transform: "translateY(-50%)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-strong mx-auto w-full max-w-[420px] rounded-[26px] p-5 shadow-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-9 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-primary",
										children: [
											"Tour ",
											index + 1,
											" of ",
											TOUR_STEPS.length
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-1 font-display text-[19px] font-semibold leading-tight",
										children: step.title
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: finish,
									"aria-label": "Skip the tour",
									className: "ml-auto grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-[13px] leading-relaxed text-muted-foreground",
							children: step.body
						}),
						step.tip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 rounded-2xl bg-primary/10 p-3 text-[12px] leading-relaxed text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-primary",
								children: "Tip · "
							}), step.tip]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-1.5 overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-primary transition-all",
								style: { width: `${progress}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: finish,
								className: "text-[12px] font-medium text-muted-foreground transition hover:text-foreground",
								children: "Skip tour"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-auto flex gap-2",
								children: [index > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									className: "h-10 rounded-full px-3",
									onClick: back,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back"]
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "h-10 rounded-full px-4",
									onClick: next,
									children: [last ? "Got it" : "Next", last ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})]
							})]
						})
					]
				})
			})
		]
	});
}
var THEMES = [{
	id: "frost",
	label: "Frost",
	hint: "Light, soft colour wash"
}, {
	id: "chalk",
	label: "Chalk",
	hint: "Dark ink with coral accent"
}];
var STORAGE_KEY = "hub-theme";
var ThemeContext = (0, import_react.createContext)({
	theme: "frost",
	setTheme: () => {},
	toggleTheme: () => {}
});
function apply(theme) {
	const root = document.documentElement;
	root.classList.toggle("dark", theme === "chalk");
	root.dataset["theme"] = theme;
}
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)("frost");
	(0, import_react.useEffect)(() => {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		const initial = stored === "chalk" || stored === "frost" ? stored : "frost";
		setThemeState(initial);
		apply(initial);
	}, []);
	const setTheme = (0, import_react.useCallback)((next) => {
		setThemeState(next);
		apply(next);
		window.localStorage.setItem(STORAGE_KEY, next);
	}, []);
	const toggleTheme = (0, import_react.useCallback)(() => {
		setTheme(theme === "frost" ? "chalk" : "frost");
	}, [theme, setTheme]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value: {
			theme,
			setTheme,
			toggleTheme
		},
		children
	});
}
function useTheme() {
	return (0, import_react.useContext)(ThemeContext);
}
//#endregion
export { buttonVariants as a, useTheme as c, TourGuide as i, THEMES as n, cn as o, ThemeProvider as r, startTour as s, Button as t };
