import { snapshotSerializer } from 'diffable-html-snapshot'
import { test, expect } from 'vitest'

test('should configure via expect.addSnapshotSerializer', () => {
  expect.addSnapshotSerializer(snapshotSerializer)
  expect('<img  loading="lazy" src= "https://example.com/image.png"/>')
    .toMatchInlineSnapshot(`
      <img
        loading="lazy"
        src="https://example.com/image.png"
      >
    `)
})
