import { n as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, f as Outlet, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { r as useProfile } from "./useAuth-AcyquYQ5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-CPFrAo3G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthenticatedLayout() {
	const { data: profile, isLoading } = useProfile();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (isLoading) return;
		const needsOnboarding = !profile?.onboarded;
		if (needsOnboarding && pathname !== "/onboarding") navigate({
			to: "/onboarding",
			replace: true
		});
		if (!needsOnboarding && pathname === "/onboarding") navigate({
			to: "/groups",
			replace: true
		});
	}, [
		isLoading,
		profile?.onboarded,
		pathname,
		navigate
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
}
//#endregion
export { AuthenticatedLayout as component };
