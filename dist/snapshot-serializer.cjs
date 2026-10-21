const require_format_html = require("./format-html.cjs");
//#region src/snapshot-serializer.ts
function serialize(value) {
	return typeof value === "string" ? require_format_html.formatHTML(value).trim() : "";
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
module.exports = plugin;
