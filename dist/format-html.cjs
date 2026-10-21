Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
let htmlparser2 = require("htmlparser2");
//#region src/format-html.ts
const voidElements = [
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"keygen",
	"link",
	"menuitem",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
];
function defaultSortAttributes(names) {
	return names.slice().sort();
}
function formatHTML(html, { sortAttributes = defaultSortAttributes } = {}) {
	const elements = [];
	const indentSize = 2;
	let currentDepth = 0;
	const increaseCurrentDepth = () => {
		currentDepth++;
	};
	const decreaseCurrentDepth = () => {
		currentDepth--;
	};
	const getIndentation = (size) => {
		return " ".repeat(size);
	};
	const getIndentationForDepth = (depth) => {
		return getIndentation(indentSize * depth);
	};
	const getCurrentIndentation = () => {
		return getIndentationForDepth(currentDepth);
	};
	const getAttributeIndentation = () => {
		return getIndentation(indentSize * currentDepth - 1);
	};
	const append = (content) => {
		elements.push(content);
	};
	const appendLineBreak = () => {
		append("\n");
	};
	const appendIndentation = (depth) => {
		append(getIndentationForDepth(depth));
	};
	const appendCurrentIndentation = () => {
		append(getCurrentIndentation());
	};
	const appendOpeningTag = (name) => {
		append("<" + name);
	};
	const appendClosingTagOnSameLine = (closeWith = ">") => {
		append(closeWith);
	};
	const appendClosingTagOnNewLine = (closeWith = ">") => {
		appendLineBreak();
		appendIndentation(currentDepth - 1);
		append(closeWith);
	};
	const appendAttribute = (name, value) => {
		let attribute = " " + name;
		if (value.length > 0) attribute += `="${value}"`;
		append(attribute);
	};
	const appendAttributeOnNewLine = (name, value) => {
		appendLineBreak();
		append(getAttributeIndentation());
		appendAttribute(name, value);
	};
	const appendAttributes = (attributes) => {
		const names = sortAttributes(Object.keys(attributes));
		if (names.length === 1) appendAttribute(names[0], attributes[names[0]]);
		if (names.length <= 1) return;
		for (const name of names) appendAttributeOnNewLine(name, attributes[name]);
	};
	const appendClosingTag = (attributes, closeWith) => {
		if (Object.keys(attributes).length <= 1) {
			appendClosingTagOnSameLine(closeWith);
			return;
		}
		appendClosingTagOnNewLine(closeWith);
	};
	const render = () => {
		return elements.join("");
	};
	const isXmlDirective = (name) => {
		return name === "?xml";
	};
	const isVoidTagName = (name) => {
		return voidElements.includes(name);
	};
	const trimText = (text) => {
		return text.replaceAll(/^[\t\n\f\r ]+|[\t\n\f\r ]+$/g, "");
	};
	const extractAttributesFromString = (content) => {
		const attributes = {};
		const pieces = content.split(/\s/);
		pieces.shift();
		for (const element of pieces) {
			if (element.length === 0) continue;
			if (!element.includes("=")) attributes[element] = "";
		}
		const attributesRegex = /(\S+)=["']?((?:.(?!["']?\s+\S+=|["'>]))+.)["']?/gim;
		let result;
		while (result = attributesRegex.exec(content)) attributes[result[1]] = result[2];
		return attributes;
	};
	const parser = new htmlparser2.Parser({
		onprocessinginstruction: function(name, data) {
			let closingTag = ">";
			if (isXmlDirective(name)) closingTag = "?>";
			appendLineBreak();
			appendCurrentIndentation();
			increaseCurrentDepth();
			appendOpeningTag(name);
			const attributes = extractAttributesFromString(data);
			appendAttributes(attributes);
			appendClosingTag(attributes, closingTag);
			decreaseCurrentDepth();
		},
		onopentag: function(name, attributes) {
			appendLineBreak();
			appendCurrentIndentation();
			increaseCurrentDepth();
			appendOpeningTag(name);
			appendAttributes(attributes);
			appendClosingTag(attributes, ">");
		},
		ontext: function(text) {
			const trimmed = trimText(text);
			if (trimmed.length === 0) return;
			appendLineBreak();
			appendCurrentIndentation();
			append(trimmed);
		},
		onclosetag: function(tagname) {
			const isVoidTag = isVoidTagName(tagname);
			if (isVoidTagName(tagname) === false) appendLineBreak();
			decreaseCurrentDepth();
			if (isVoidTag === true) return;
			appendCurrentIndentation();
			append(`</${tagname}>`);
		},
		oncomment: function(data) {
			if (!data.startsWith("[")) return;
			appendLineBreak();
			appendCurrentIndentation();
			append("<!--");
			append(data);
			append("-->");
		}
	}, {
		lowerCaseTags: false,
		recognizeSelfClosing: true,
		decodeEntities: false
	});
	parser.write(html);
	parser.end();
	appendLineBreak();
	return render();
}
//#endregion
exports.formatHTML = formatHTML;
