import { expect, test } from 'vitest'

import snapshotSerializer from './snapshot-serializer'

test('should add itself to the snapshot serializer', () => {
  expect.addSnapshotSerializer(snapshotSerializer)
  expect('<img  loading="lazy" src= "https://example.com/image.png"/>')
    .toMatchInlineSnapshot(`
      <img
        loading="lazy"
        src="https://example.com/image.png"
      >
    `)
})
