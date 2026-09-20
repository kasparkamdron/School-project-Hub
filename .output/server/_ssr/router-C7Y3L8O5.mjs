import { n as __toESM } from "../_runtime.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as TourGuide, r as ThemeProvider } from "./theme-CYc_IgXG.mjs";
import { t as supabase } from "./client-Bxc8_G9k.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as AuthProvider } from "./useAuth-AcyquYQ5.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$9 } from "./groups._groupId-DLS3Ra5b.mjs";
import { t as SpeedInsights } from "../_libs/vercel__speed-insights.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C7Y3L8O5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var styles_default = "/assets/styles-BLefFlri.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "This page doesn't exist, or the group it belonged to has already been cleared."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/20",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Hub — group projects that clear themselves" },
			{
				name: "description",
				content: "Hub is a temporary coordination tool for student group projects: tasks, deadlines and notes that disappear once the project goes quiet."
			},
			{
				property: "og:title",
				content: "Hub — group projects that clear themselves"
			},
			{
				property: "og:description",
				content: "Coordinate a student group project with friends. Quiet groups clear themselves after 30 days."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeedInsights, {})
		] })]
	});
}
function AuthSync() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
		});
		return () => data.subscription.unsubscribe();
	}, [router]);
	return null;
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSync, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TourGuide, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-center" })
		] }) })
	});
}
var $$splitComponentImporter$7 = () => import("./routes-C_reLCzD.mjs");
var Route$7 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Hub — student group projects that clear themselves" },
		{
			name: "description",
			content: "Add friends, start a group, split the tasks. Hub hides any group that goes quiet for 30 days, or 14 days after its deadline passes."
		},
		{
			property: "og:title",
			content: "Hub — student group projects that clear themselves"
		},
		{
			property: "og:description",
			content: "A temporary coordination tool for student group work: tasks, deadlines and notes, then gone."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./route-CPFrAo3G.mjs");
var Route$6 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./calendar-CXk5QcGq.mjs");
var Route$5 = createFileRoute("/_authenticated/calendar")({
	head: () => ({ meta: [
		{ title: "Calendar — Hub" },
		{
			name: "description",
			content: "See every project deadline and task due date month by month, filter by project, and drag a project to reschedule the whole plan."
		},
		{
			property: "og:title",
			content: "Calendar — Hub"
		},
		{
			property: "og:description",
			content: "Filter your group project deadlines and drag them to a new day to reschedule everything at once."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./friends-CesAFRB7.mjs");
var Route$4 = createFileRoute("/_authenticated/friends")({
	head: () => ({ meta: [
		{ title: "Friends — Hub" },
		{
			name: "description",
			content: "Add classmates, accept requests, and manage who can reach you."
		},
		{
			property: "og:title",
			content: "Friends — Hub"
		},
		{
			property: "og:description",
			content: "Your Hub friend list: requests, removals and blocks."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./notifications-sCS5bPA7.mjs");
var Route$3 = createFileRoute("/_authenticated/notifications")({
	head: () => ({ meta: [
		{ title: "Notifications — Hub" },
		{
			name: "description",
			content: "Friend requests, group invites, task assignments and deadlines coming up."
		},
		{
			property: "og:title",
			content: "Notifications — Hub"
		},
		{
			property: "og:description",
			content: "Everything that needs your attention across your project groups."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./onboarding-DegrQqll.mjs");
var Route$2 = createFileRoute("/_authenticated/onboarding")({
	head: () => ({ meta: [
		{ title: "Set up your Hub profile" },
		{
			name: "description",
			content: "Tell your group mates who you are before you start coordinating."
		},
		{
			property: "og:title",
			content: "Set up your Hub profile"
		},
		{
			property: "og:description",
			content: "Pick a display name and your school to get started on Hub."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./profile-Dy3UC7xU.mjs");
var Route$1 = createFileRoute("/_authenticated/profile")({
	head: () => ({ meta: [
		{ title: "Your profile — Hub" },
		{
			name: "description",
			content: "Edit your name, school and avatar, switch theme, export or delete your data."
		},
		{
			property: "og:title",
			content: "Your profile — Hub"
		},
		{
			property: "og:description",
			content: "Manage your Hub account, theme and data."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./groups.index-h4rvjU4s.mjs");
var Route = createFileRoute("/_authenticated/groups/")({
	head: () => ({ meta: [
		{ title: "Your groups — Hub" },
		{
			name: "description",
			content: "Every project group you are still actively working on, in one list."
		},
		{
			property: "og:title",
			content: "Your groups — Hub"
		},
		{
			property: "og:description",
			content: "Active project groups, tasks done, and what is due next."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$8
});
var AuthenticatedRouteRoute = Route$6.update({
	id: "/_authenticated",
	getParentRoute: () => Route$8
});
var AuthenticatedCalendarRoute = Route$5.update({
	id: "/calendar",
	path: "/calendar",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFriendsRoute = Route$4.update({
	id: "/friends",
	path: "/friends",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedNotificationsRoute = Route$3.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOnboardingRoute = Route$2.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfileRoute = Route$1.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedGroupsIndexRoute = Route.update({
	id: "/groups/",
	path: "/groups/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedCalendarRoute,
	AuthenticatedFriendsRoute,
	AuthenticatedNotificationsRoute,
	AuthenticatedOnboardingRoute,
	AuthenticatedProfileRoute,
	AuthenticatedGroupsGroupIdRoute: Route$9.update({
		id: "/groups/$groupId",
		path: "/groups/$groupId",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedGroupsIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren)
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
