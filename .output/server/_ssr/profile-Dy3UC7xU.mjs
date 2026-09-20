import { n as __toESM } from "../_runtime.mjs";
import { O as isRedirect, _ as useNavigate, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BFFE07zL.mjs";
import { P as require_jsx_runtime, a as Overlay2, c as Title2, i as Description2, l as Trigger2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-UH_Jp6hR.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as LogOut, o as Trash2, v as Download, y as Compass } from "../_libs/lucide-react.mjs";
import { a as buttonVariants, c as useTheme, n as THEMES, o as cn, s as startTour, t as Button } from "./theme-CYc_IgXG.mjs";
import { t as supabase } from "./client-Bxc8_G9k.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth, r as useProfile } from "./useAuth-AcyquYQ5.mjs";
import { a as UserAvatar, k as saveProfile, m as exportMyData, t as AppShell } from "./AppShell-Dp3kAD1K.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-Dg1m_PmC.mjs";
import { t as Label } from "./label-EeeZIg_F.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-DWCE2_VX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-Dy3UC7xU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var AlertDialog = Root2;
var AlertDialogTrigger = Trigger2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Permanently removes the signed-in user's auth account.
* Every table cascades from auth.users, so their data goes with it.
*/
var deleteMyAccount = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("27301031363e284184ead21ac910c33ebfbe9159435c975f26319c6a65fade88"));
function ProfilePage() {
	const { user } = useAuth();
	const { data: profile } = useProfile();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { theme, setTheme } = useTheme();
	const removeAccount = useServerFn(deleteMyAccount);
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [school, setSchool] = (0, import_react.useState)("");
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!profile) return;
		setDisplayName(profile.display_name ?? "");
		setSchool(profile.school ?? "");
		setAvatarUrl(profile.avatar_url ?? "");
	}, [profile]);
	const save = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("Not signed in");
			if (displayName.trim().length < 2) throw new Error("Please enter at least 2 characters.");
			await saveProfile({
				id: user.id,
				display_name: displayName,
				school,
				avatar_url: avatarUrl
			});
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["profile"] });
			toast.success("Profile saved.");
		},
		onError: (e) => toast.error(e.message)
	});
	const exportData = useMutation({
		mutationFn: exportMyData,
		onSuccess: (data) => {
			const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "hub-my-data.json";
			a.click();
			URL.revokeObjectURL(url);
			toast.success("Your data has been downloaded.");
		},
		onError: () => toast.error("Export failed. Please try again.")
	});
	const wipe = useMutation({
		mutationFn: async () => {
			await removeAccount({ data: void 0 });
		},
		onSuccess: async () => {
			await supabase.auth.signOut();
			navigate({
				to: "/",
				replace: true
			});
			toast.success("Your account and data were deleted.");
		},
		onError: () => toast.error("Couldn't delete the account. Please try again.")
	});
	async function signOut() {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "glass rounded-[22px] p-5 shadow-panel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
				name: displayName,
				url: avatarUrl,
				className: "size-14"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "truncate font-display text-[24px] font-semibold leading-tight",
					children: displayName || "Your profile"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-[13px] text-muted-foreground",
					children: user?.email
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 grid gap-5 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass rounded-[22px] p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold",
				children: "Details"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "p-name",
							children: "Display name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "p-name",
							value: displayName,
							onChange: (e) => setDisplayName(e.target.value),
							className: "h-12 rounded-2xl",
							maxLength: 60
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "p-school",
							children: "School"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "p-school",
							value: school,
							onChange: (e) => setSchool(e.target.value),
							placeholder: "Optional",
							className: "h-12 rounded-2xl",
							maxLength: 80
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "p-avatar",
							children: "Avatar image link"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "p-avatar",
							value: avatarUrl,
							onChange: (e) => setAvatarUrl(e.target.value),
							placeholder: "https://…",
							className: "h-12 rounded-2xl"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "h-12 w-full rounded-2xl",
						onClick: () => save.mutate(),
						disabled: save.isPending,
						children: save.isPending ? "Saving…" : "Save changes"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass rounded-[22px] p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Theme"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[13px] text-muted-foreground",
						children: "Pick the look you prefer."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-2",
						children: THEMES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setTheme(t.id),
							className: cn("flex items-center gap-3 rounded-2xl p-3 text-left transition", theme === t.id ? "bg-primary/12 ring-1 ring-primary/40" : "glass-inset hover:opacity-90"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-8 shrink-0 rounded-xl border border-border", t.id === "frost" ? "bg-[oklch(0.946_0.017_267.8)]" : "bg-[oklch(0.183_0.01_234.4)]") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm font-medium",
										children: t.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-[11px] text-muted-foreground",
										children: t.hint
									})]
								}),
								theme === t.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-auto text-[11px] font-semibold text-primary",
									children: "Active"
								}) : null
							]
						}, t.id))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass rounded-[22px] p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Your data"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							className: "h-12 w-full justify-start rounded-2xl",
							onClick: () => exportData.mutate(),
							disabled: exportData.isPending,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export my data"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							className: "h-12 w-full justify-start rounded-2xl",
							onClick: () => startTour(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4" }), " Replay the app tour"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: "h-12 w-full justify-start rounded-2xl",
							onClick: signOut,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Sign out"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								className: "h-12 w-full justify-start rounded-2xl text-destructive hover:bg-destructive/10 hover:text-destructive",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Delete my account"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
							className: "rounded-3xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete your account?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This removes your profile, friendships, tasks and notes immediately. It cannot be undone." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
								className: "rounded-full",
								children: "Keep my account"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
								className: "rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90",
								onClick: () => wipe.mutate(),
								children: "Delete everything"
							})] })]
						})] })
					]
				})]
			})]
		})]
	})] });
}
//#endregion
export { ProfilePage as component };
