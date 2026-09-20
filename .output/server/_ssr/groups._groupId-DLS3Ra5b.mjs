import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/groups._groupId-DLS3Ra5b.js
var $$splitComponentImporter = () => import("./groups._groupId-wvU_-Whi.mjs");
var Route = createFileRoute("/_authenticated/groups/$groupId")({
	head: () => ({ meta: [
		{ title: "Group workspace — Hub" },
		{
			name: "description",
			content: "Tasks, assignees, deadlines and shared notes for one project group."
		},
		{
			property: "og:title",
			content: "Group workspace — Hub"
		},
		{
			property: "og:description",
			content: "Split the work, track deadlines and keep notes in one place."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
