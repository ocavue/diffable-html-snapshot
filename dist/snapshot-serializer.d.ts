//#region src/snapshot-serializer.d.ts
declare function serialize(value: unknown): string;
declare function test(value: unknown): boolean;
declare const plugin: {
  serialize: typeof serialize;
  test: typeof test;
};
//#endregion
export { plugin as default };
//# sourceMappingURL=snapshot-serializer.d.ts.map