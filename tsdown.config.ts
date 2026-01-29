import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts', 'src/snapshot-serializer.ts', 'src/format-html.ts'],
  format: ['esm', 'cjs'],
  dts: { build: true },
  fixedExtension: false,
})
