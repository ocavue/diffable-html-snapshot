import { test, expect } from 'vitest'

test('should configure via vitest.config.js', () => {
  expect('<img  loading="lazy" src= "https://example.com/image.png"/>')
    .toMatchInlineSnapshot(`
      <img
        loading="lazy"
        src="https://example.com/image.png"
      >
    `)
})
