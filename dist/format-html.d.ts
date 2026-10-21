//#region src/format-html.d.ts
interface FormatHTMLOptions {
  sortAttributes?: (names: string[]) => string[];
}
declare function formatHTML(html: string, {
  sortAttributes
}?: FormatHTMLOptions): string;
//#endregion
export { type FormatHTMLOptions, formatHTML };
//# sourceMappingURL=format-html.d.ts.map