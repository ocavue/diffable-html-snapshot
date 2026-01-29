import { test, expect } from 'vitest'

test('should configure via vitest.config.js', () => {
  expect('<div>  Hello, world!  </ div>').toMatchInlineSnapshot(`

   <div>
     Hello, world!
   </div>

  `)
})
