import { snapshotSerializer } from 'diffable-html-snapshot'
import { test, expect } from 'vitest'

test('should configure via expect.addSnapshotSerializer', () => {
  expect.addSnapshotSerializer(snapshotSerializer)
  expect('<div>  Hello, world!  </ div>').toMatchInlineSnapshot(`

   <div>
     Hello, world!
   </div>

  `)
})
