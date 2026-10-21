# diffable-html-snapshot

[![NPM version](https://img.shields.io/npm/v/diffable-html-snapshot?color=a1b858&label=)](https://www.npmjs.com/package/diffable-html-snapshot)

**Making HTML diffs readable for tests.**

This formatter will normalize your HTML in a way that when you diff it, you get a clear sense of what changed.

This is a "zero-config" and opinionated HTML formatter. Default rules might change in future releases in which case we will push a major release.

Feel free to open issues to discuss better defaults.

Formatting consists of:

- indenting every level with 2 spaces
- align attributes
- sort attributes alphabetically
- put every opening and closing tag on its own line
- trimming text nodes

_Be aware that this plugin is intended for making HTML diffs more readable.
We took the compromise of not dealing with white-spaces like the browsers do._

## Install

```bash
npm install diffable-html-snapshot
```

## Example

```js
import { formatHTML } from 'diffable-html-snapshot'

const html = `
<div id="header">
  <h1>Hello World!</h1>
  <ul id="main-list" class="list"><li><a href="#">My HTML</a></li></ul>
</div>
`

console.log(formatHTML(html))
```

Will output:

```
<div id="header">
  <h1>
    Hello World!
  </h1>
  <ul
    class="list"
    id="main-list"
  >
    <li>
      <a href="#">
        My HTML
      </a>
    </li>
  </ul>
</div>
```

## Usage with [Vitest](https://vitest.dev/)

There are three ways to use this library with Vitest:

### 1. Explicitly call `formatHTML` in your tests

```js
// html.test.js
import { formatHTML } from 'diffable-html-snapshot'
import { test, expect } from 'vitest'

test('should format HTML', () => {
  expect(
    formatHTML('<input type="button" > Click me</input>'),
  ).toMatchSnapshot()
})
```

### 2. Use `expect.addSnapshotSerializer` in your test file

```js
// html.test.js
import { snapshotSerializer } from 'diffable-html-snapshot'
import { test, expect } from 'vitest'

expect.addSnapshotSerializer(snapshotSerializer)

test('should format HTML', () => {
  expect('<input type="button" > Click me</input>').toMatchSnapshot()
})
```

### 3. Configure in your `vitest.config.js` file

```js
// vitest.config.js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    snapshotSerializers: ['diffable-html-snapshot/snapshot-serializer'],
  },
})
```

## Usage with [Jest](https://jestjs.io/)

This library is ESM-only. Jest's ESM support is still experimental, so you need to run Jest with `--experimental-vm-modules` and disable code transforms with `transform: {}`, for example:

```json
// package.json
{
  "type": "module",
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
  }
}
```

```js
// jest.config.js
/** @type {import('jest').Config} */
export default {
  transform: {},
}
```

See the [Jest ECMAScript Modules guide](https://jestjs.io/docs/ecmascript-modules) for more details.

There are three ways to use this library with Jest:

### 1. Explicitly call `formatHTML` in your tests

```js
// html.test.js
import { expect, test } from '@jest/globals'
import { formatHTML } from 'diffable-html-snapshot'

test('should format HTML', () => {
  expect(
    formatHTML('<input type="button" > Click me</input>'),
  ).toMatchSnapshot()
})
```

### 2. Use `expect.addSnapshotSerializer` in your test file

```js
// html.test.js
import { expect, test } from '@jest/globals'
import { snapshotSerializer } from 'diffable-html-snapshot'

expect.addSnapshotSerializer(snapshotSerializer)

test('should format HTML', () => {
  expect('<input type="button" > Click me</input>').toMatchSnapshot()
})
```

### 3. Configure in your `jest.config.js` file

Add `snapshotSerializers` to the config above:

```js
// jest.config.js
/** @type {import('jest').Config} */
export default {
  transform: {},
  snapshotSerializers: ['diffable-html-snapshot/snapshot-serializer'],
}
```

## Credits

This project is a fork of [diffable-html](https://github.com/algolia/diffable-html) with the following changes:

- Add ESM support
- Add TypeScript declarations
- Add built-in snapshot serializer for Jest and Vitest
- Sort attributes alphabetically

## License

MIT
