import { expect, test } from '@jest/globals'
import { snapshotSerializer } from 'diffable-html-snapshot'

test('should configure via expect.addSnapshotSerializer', () => {
  expect.addSnapshotSerializer(snapshotSerializer)
  expect(
    '<img  loading="lazy" src= "https://example.com/image.png"/>',
  ).toMatchSnapshot()
})
