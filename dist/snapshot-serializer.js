import { formatHTML } from "./format-html.js";
//#region src/snapshot-serializer.ts
function serialize(value) {
	return typeof value === "string" ? formatHTML(value).trim() : "";
}
function test(value) {
	if (typeof value !== "string") return false;
	const trimmed = value.trim();
	return trimmed.length > 2 && trimmed.startsWith("<") && trimmed.endsWith(">");
}
const plugin = {
	serialize,
	test
};
//#endregion
export { plugin as default };

//# sourceMappingURL=snapshot-serializer.js.map