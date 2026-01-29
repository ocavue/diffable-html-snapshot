const { expect, test } = require('@jest/globals')
const { snapshotSerializer } = require('diffable-html-snapshot')

test('should configure via expect.addSnapshotSerializer', () => {
  expect.addSnapshotSerializer(snapshotSerializer)
  expect('<div>  Hello, world!  </ div>').toMatchInlineSnapshot(`

   <div>
     Hello, world!
   </div>

  `)
})
