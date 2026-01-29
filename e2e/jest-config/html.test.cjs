const { expect, test } = require('@jest/globals')

test('should configure via jest.config.cjs', () => {
  expect('<div>  Hello, world!  </ div>').toMatchInlineSnapshot(`

   <div>
     Hello, world!
   </div>

  `)
})
