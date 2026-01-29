import { formatHTML } from './format-html'

function serialize(value: unknown): string {
  return typeof value === 'string' ? formatHTML(value) : ''
}

function test(value: unknown): boolean {
  if (typeof value !== 'string') {
    return false
  }
  const trimmed = value.trim()
  return trimmed.length > 2 && trimmed.startsWith('<') && trimmed.endsWith('>')
}

const plugin = {
  serialize,
  test,
}

export default plugin
