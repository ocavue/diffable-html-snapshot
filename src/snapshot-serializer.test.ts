import { expect, test } from 'vitest'

import snapshotSerializer from './snapshot-serializer'

expect.addSnapshotSerializer(snapshotSerializer)

test('should serialize HTML', () => {
  expect('<div>  Hello, world!  </ div>').toMatchInlineSnapshot(`
    <div>
      Hello, world!
    </div>
  `)
})
