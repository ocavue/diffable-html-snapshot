import { expect, test } from '@jest/globals'

test('should configure via jest.config.js', () => {
  expect(
    '<img  loading="lazy" src= "https://example.com/image.png"/>',
  ).toMatchSnapshot()
})
