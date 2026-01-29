import { expect, test } from 'vitest'

import snapshotSerializer from './snapshot-serializer'

test('should add itself to the snapshot serializer', () => {
  expect.addSnapshotSerializer(snapshotSerializer)
  expect('<div>  Hello, world!  </ div>').toMatchInlineSnapshot(`
    <div>
      Hello, world!
    </div>
  `)
})
