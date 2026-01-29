const { expect, test } = require('@jest/globals')

test('should configure via jest.config.cjs', () => {
  expect('<img  loading="lazy" src= "https://example.com/image.png"/>')
    .toMatchInlineSnapshot(`
   <img
     loading="lazy"
     src="https://example.com/image.png"
   >
  `)
})
