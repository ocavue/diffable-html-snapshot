//#region src/snapshot-serializer.d.ts
declare function serialize(value: unknown): string;
declare function test(value: unknown): boolean;
declare const plugin: {
  serialize: typeof serialize;
  test: typeof test;
};
export = plugin;
//# sourceMappingURL=snapshot-serializer.d.cts.map