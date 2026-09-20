globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-20T14:36:43.764Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/calendar-jkHneyTT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"347c-cOTvqR/Cl6GZaGFregm62fIBfvM\"",
		"mtime": "2026-09-20T14:36:42.760Z",
		"size": 13436,
		"path": "../public/assets/calendar-jkHneyTT.js"
	},
	"/assets/AppShell-BfOsY7Ln.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14213-BIWaayMISgIH5jrim3L2IhVy66A\"",
		"mtime": "2026-09-20T14:36:42.760Z",
		"size": 82451,
		"path": "../public/assets/AppShell-BfOsY7Ln.js"
	},
	"/assets/dates-B5T3e4WT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e0e-96DBWyd4BDWUDvR0wC86HFbbrxU\"",
		"mtime": "2026-09-20T14:36:42.760Z",
		"size": 19982,
		"path": "../public/assets/dates-B5T3e4WT.js"
	},
	"/assets/dist-CxP3MVsy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ce9-6L8EGGudAntlhkNZQ2GyHgvCYMo\"",
		"mtime": "2026-09-20T14:36:42.760Z",
		"size": 7401,
		"path": "../public/assets/dist-CxP3MVsy.js"
	},
	"/assets/dist-Dazmjeh2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12a8-t66UMJr71sP+fPSmhUU0opBPhuQ\"",
		"mtime": "2026-09-20T14:36:42.760Z",
		"size": 4776,
		"path": "../public/assets/dist-Dazmjeh2.js"
	},
	"/assets/friends-D1_OwPhY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bd5-W98u2uXlAOyHPiB5lv3nj84NQEA\"",
		"mtime": "2026-09-20T14:36:42.760Z",
		"size": 15317,
		"path": "../public/assets/friends-D1_OwPhY.js"
	},
	"/assets/groups.index-50_MEt90.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20e3-YRqpF8ahDpIcvlzmXp3h8hDFdyw\"",
		"mtime": "2026-09-20T14:36:42.760Z",
		"size": 8419,
		"path": "../public/assets/groups.index-50_MEt90.js"
	},
	"/assets/groups._groupId-DszAA4Dr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a182-2Vfj/dPPrbD7qD3PT0TixhR6cbM\"",
		"mtime": "2026-09-20T14:36:42.760Z",
		"size": 41346,
		"path": "../public/assets/groups._groupId-DszAA4Dr.js"
	},
	"/assets/input-Bmmwbc8k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26b-ZFVuTlYdF6iGRoodh4gmqu5SNOo\"",
		"mtime": "2026-09-20T14:36:42.760Z",
		"size": 619,
		"path": "../public/assets/input-Bmmwbc8k.js"
	},
	"/assets/label-ZYOdo3ld.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2af-X4oi9/4eW2Uu0C73pFqJe45Fz8k\"",
		"mtime": "2026-09-20T14:36:42.760Z",
		"size": 687,
		"path": "../public/assets/label-ZYOdo3ld.js"
	},
	"/assets/notifications-DJqk9K0o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd9-fJx8m7spUWNvvCS9mvR4h8kUFIM\"",
		"mtime": "2026-09-20T14:36:42.760Z",
		"size": 4057,
		"path": "../public/assets/notifications-DJqk9K0o.js"
	},
	"/assets/onboarding-DPFsBEQe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b8-9ULzqMwbNNjUEj/Vy+ADLsqdu24\"",
		"mtime": "2026-09-20T14:36:42.760Z",
		"size": 2232,
		"path": "../public/assets/onboarding-DPFsBEQe.js"
	},
	"/assets/profile-BNCCIHAO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3803-dLQJM1WtiICmJpweKHpf/MGRyT4\"",
		"mtime": "2026-09-20T14:36:42.760Z",
		"size": 14339,
		"path": "../public/assets/profile-BNCCIHAO.js"
	},
	"/assets/route-DN0UWjvq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c2-MXy7PAxIGm8rUJImsq0xKr/NlDw\"",
		"mtime": "2026-09-20T14:36:42.760Z",
		"size": 450,
		"path": "../public/assets/route-DN0UWjvq.js"
	},
	"/assets/routes-CUCLmpsC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"177a-4etHcLOLj0tfdCTdgppENlU6svM\"",
		"mtime": "2026-09-20T14:36:42.760Z",
		"size": 6010,
		"path": "../public/assets/routes-CUCLmpsC.js"
	},
	"/assets/skeleton--QPJC3Zw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e0-gW2fQWEyMNtmn8OG3dOgZzdXeEU\"",
		"mtime": "2026-09-20T14:36:42.760Z",
		"size": 224,
		"path": "../public/assets/skeleton--QPJC3Zw.js"
	},
	"/assets/styles-BLefFlri.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"154ab-RE43MHcEReMQVCmMKJnfZUuRD/4\"",
		"mtime": "2026-09-20T14:36:42.761Z",
		"size": 87211,
		"path": "../public/assets/styles-BLefFlri.css"
	},
	"/assets/textarea-BhyL7Kzq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8112-PHBUfojoulHH/iHA2sf6NCNZ7Zo\"",
		"mtime": "2026-09-20T14:36:42.761Z",
		"size": 33042,
		"path": "../public/assets/textarea-BhyL7Kzq.js"
	},
	"/assets/trash-2-BXzu9G0z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-I9XufxE/0Jf64cp3zV8bzZb98po\"",
		"mtime": "2026-09-20T14:36:42.761Z",
		"size": 494,
		"path": "../public/assets/trash-2-BXzu9G0z.js"
	},
	"/assets/index-Cs0lzpxU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5e123-SE4/BgSfYrz0YeMpYO+IGpt3pSM\"",
		"mtime": "2026-09-20T14:36:42.755Z",
		"size": 385315,
		"path": "../public/assets/index-Cs0lzpxU.js"
	},
	"/assets/useMutation-DRl-skIo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c8-89H5lnCQLIypmSLIemm+DrJ6yag\"",
		"mtime": "2026-09-20T14:36:42.761Z",
		"size": 2248,
		"path": "../public/assets/useMutation-DRl-skIo.js"
	},
	"/assets/useAuth-Byrveo2K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4247a-8oGrP0E2DOrqPQB7K8T2+YzWYRs\"",
		"mtime": "2026-09-20T14:36:42.761Z",
		"size": 271482,
		"path": "../public/assets/useAuth-Byrveo2K.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-20T14:36:43.764Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/.DS_Store": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"1804-3y++sUAKzaCQmjLBz2v0kvESHgc\"",
		"mtime": "2026-09-20T14:36:43.763Z",
		"size": 6148,
		"path": "../public/.DS_Store"
	},
	"/assets/user-plus-D3WYfHmh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12b-49rJHd+23K4b/PB7rtuZ8vcbxUw\"",
		"mtime": "2026-09-20T14:36:42.761Z",
		"size": 299,
		"path": "../public/assets/user-plus-D3WYfHmh.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_RfVFMN = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_RfVFMN
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
