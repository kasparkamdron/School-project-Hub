import { n as __toESM } from "../_runtime.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./theme-CYc_IgXG.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth, r as useProfile } from "./useAuth-AcyquYQ5.mjs";
import { k as saveProfile, n as Atmosphere } from "./AppShell-Dp3kAD1K.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-Dg1m_PmC.mjs";
import { t as Label } from "./label-EeeZIg_F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-DegrQqll.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Onboarding() {
	const { user } = useAuth();
	const { data: profile } = useProfile();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [displayName, setDisplayName] = (0, import_react.useState)(profile?.display_name ?? "");
	const [school, setSchool] = (0, import_react.useState)(profile?.school ?? "");
	const save = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("Not signed in");
			if (displayName.trim().length < 2) throw new Error("Please enter a name with at least 2 characters.");
			await saveProfile({
				id: user.id,
				display_name: displayName,
				school,
				onboarded: true
			});
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["profile"] });
			navigate({
				to: "/groups",
				replace: true
			});
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col justify-center px-5 py-10 md:max-w-lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-[26px] p-6 shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-primary",
						children: "Welcome"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-[28px] font-semibold leading-tight",
						children: "How should your group see you?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Your name is what friends search for when they add you."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "display_name",
								children: "Display name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "display_name",
								value: displayName,
								onChange: (e) => setDisplayName(e.target.value),
								placeholder: "Mia Peterson",
								className: "h-12 rounded-2xl",
								maxLength: 60
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "school",
								children: "School (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "school",
								value: school,
								onChange: (e) => setSchool(e.target.value),
								placeholder: "Tallinn University",
								className: "h-12 rounded-2xl",
								maxLength: 80
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6 h-13 w-full rounded-2xl text-base",
						onClick: () => save.mutate(),
						disabled: save.isPending,
						children: save.isPending ? "Saving…" : "Start using Hub"
					})
				]
			})
		})]
	});
}
//#endregion
export { Onboarding as component };
