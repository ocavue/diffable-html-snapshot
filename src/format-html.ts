import { Parser } from 'htmlparser2'

// https://www.w3.org/TR/html/syntax.html#writing-html-documents-elements
const voidElements = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'menuitem',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]

interface FormatHTMLOptions {
  sortAttributes?: (names: string[]) => string[]
}

function formatHTML(
  html: string,
  { sortAttributes = (names) => names }: FormatHTMLOptions = {},
) {
  const elements: string[] = []
  const indentSize = 2

  let currentDepth = 0

  const increaseCurrentDepth = () => {
    currentDepth++
  }

  const decreaseCurrentDepth = () => {
    currentDepth--
  }

  const getIndentation = (size: number) => {
    return ' '.repeat(size)
  }

  const getIndentationForDepth = (depth: number) => {
    return getIndentation(indentSize * depth)
  }

  const getCurrentIndentation = () => {
    return getIndentationForDepth(currentDepth)
  }

  const getAttributeIndentation = () => {
    return getIndentation(indentSize * currentDepth - 1)
  }

  const append = (content: string) => {
    elements.push(content)
  }

  const appendLineBreak = () => {
    append('\n')
  }

  const appendIndentation = (depth: number) => {
    append(getIndentationForDepth(depth))
  }

  const appendCurrentIndentation = () => {
    append(getCurrentIndentation())
  }

  const appendOpeningTag = (name: string) => {
    append('<' + name)
  }

  const appendClosingTagOnSameLine = (closeWith = '>') => {
    append(closeWith)
  }

  const appendClosingTagOnNewLine = (closeWith = '>') => {
    appendLineBreak()
    appendIndentation(currentDepth - 1)
    append(closeWith)
  }

  const appendAttribute = (name: string, value: string) => {
    let attribute = ' ' + name

    if (value.length > 0) {
      attribute += `="${value}"`
    }

    append(attribute)
  }

  const appendAttributeOnNewLine = (name: string, value: string) => {
    appendLineBreak()
    append(getAttributeIndentation())
    appendAttribute(name, value)
  }

  const appendAttributes = (attributes: Record<string, string>) => {
    const names = sortAttributes(Object.keys(attributes))

    if (names.length === 1) {
      appendAttribute(names[0], attributes[names[0]])
    }

    if (names.length <= 1) {
      return
    }

    for (let name of names) {
      appendAttributeOnNewLine(name, attributes[name])
    }
  }

  const appendClosingTag = (
    attributes: Record<string, string>,
    closeWith: string,
  ) => {
    if (Object.keys(attributes).length <= 1) {
      appendClosingTagOnSameLine(closeWith)

      return
    }
    appendClosingTagOnNewLine(closeWith)
  }

  const render = () => {
    return elements.join('')
  }

  const isXmlDirective = (name: string) => {
    return name === '?xml'
  }

  const isVoidTagName = (name: string) => {
    return voidElements.includes(name)
  }

  // https://www.w3.org/TR/html52/infrastructure.html#space-characters
  // defines "space characters" to include SPACE, TAB, LF, FF, and CR.
  const trimText = (text: string) => {
    return text.replace(/^[\t\n\f\r ]+|[\t\n\f\r ]+$/g, '')
  }

  const extractAttributesFromString = (
    content: string,
  ): Record<string, string> => {
    const attributes: Record<string, string> = {}

    const pieces = content.split(/\s/)
    // Remove tag name.
    pieces.splice(0, 1)

    pieces.forEach((element) => {
      if (element.length === 0) {
        return
      }
      if (!element.includes('=')) {
        attributes[element] = ''
      }
    })

    const attributesRegex = /(\S+)=["']?((?:.(?!["']?\s+\S+=|["'>]))+.)["']?/gim

    let result
    while ((result = attributesRegex.exec(content))) {
      attributes[result[1]] = result[2]
    }

    return attributes
  }

  const parser = new Parser(
    {
      onprocessinginstruction: function (name, data) {
        let closingTag = '>'
        if (isXmlDirective(name)) {
          closingTag = '?>'
        }

        appendLineBreak()
        appendCurrentIndentation()
        increaseCurrentDepth()
        appendOpeningTag(name)

        const attributes = extractAttributesFromString(data)
        appendAttributes(attributes)
        appendClosingTag(attributes, closingTag)
        decreaseCurrentDepth()
      },
      onopentag: function (name, attributes) {
        appendLineBreak()
        appendCurrentIndentation()
        increaseCurrentDepth()
        appendOpeningTag(name)

        appendAttributes(attributes)
        appendClosingTag(attributes, '>')
      },
      ontext: function (text) {
        const trimmed = trimText(text)
        if (trimmed.length === 0) {
          return
        }

        appendLineBreak()
        appendCurrentIndentation()
        append(trimmed)
      },
      onclosetag: function (tagname) {
        const isVoidTag = isVoidTagName(tagname)
        if (isVoidTagName(tagname) === false) {
          appendLineBreak()
        }
        decreaseCurrentDepth()
        if (isVoidTag === true) {
          return
        }
        appendCurrentIndentation()
        append(`</${tagname}>`)
      },
      oncomment: function (data) {
        // Only display conditional comments.
        if (!data.startsWith('[')) {
          return
        }
        appendLineBreak()
        appendCurrentIndentation()
        append('<!--')
        append(data)
        append('-->')
      },
    },
    {
      lowerCaseTags: false,
      recognizeSelfClosing: true,
      decodeEntities: false,
    },
  )
  parser.write(html)
  parser.end()

  appendLineBreak()

  return render()
}

export { formatHTML, type FormatHTMLOptions }
