import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BFFE07zL.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-UH_Jp6hR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.functions-DVvJxN_5.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Permanently removes the signed-in user's auth account.
* Every table cascades from auth.users, so their data goes with it.
*/
var deleteMyAccount_createServerFn_handler = createServerRpc({
	id: "27301031363e284184ead21ac910c33ebfbe9159435c975f26319c6a65fade88",
	name: "deleteMyAccount",
	filename: "src/lib/account.functions.ts"
}, (opts) => deleteMyAccount.__executeServer(opts));
var deleteMyAccount = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(deleteMyAccount_createServerFn_handler, async ({ context }) => {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { error } = await supabaseAdmin.auth.admin.deleteUser(context.userId);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { deleteMyAccount_createServerFn_handler };
