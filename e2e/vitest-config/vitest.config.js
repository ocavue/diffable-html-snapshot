import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    snapshotSerializers: ['diffable-html-snapshot/snapshot-serializer'],
  },
})
