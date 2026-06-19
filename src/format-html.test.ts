import { expect, test } from 'vitest'

import { formatHTML } from './format-html'

test('should format a simple HTML', () => {
  const html = `
  <div id="header">
    <h1>Hello World!</h1>
    <ul id="main-list" class="list"><li><a href="#">My HTML</a></li></ul>
  </div>
  `

  expect(formatHTML(html)).toMatchInlineSnapshot()
})

test('should properly nest everything', () => {
  const html = `<ul><li><a href="#">List item 1</a></li><li><a href="#">List item 2</a></li></ul>`

  expect(formatHTML(html)).toMatchInlineSnapshot()
})

test('should align attributes vertically', () => {
  const html = `<input name="test" value="true" class="form-control">`

  expect(formatHTML(html)).toMatchInlineSnapshot()
})

test('should close tag on the same line if there is only one attribute', () => {
  const html = `<input  name="test" >`

  expect(formatHTML(html)).toMatchInlineSnapshot()
})

test('should not decode entities', () => {
  const html = `<div>&nbsp;</div>`

  expect(formatHTML(html)).toMatchInlineSnapshot()
})

test('should trim text nodes', () => {
  const html = `<span> surrounded    </span>`

  expect(formatHTML(html)).toMatchInlineSnapshot()
})

test('should not trim Unicode whitespace', () => {
  const html = `<span> \u{2009} surrounded  \u{2005}\u{200A}  </span>`

  expect(formatHTML(html)).toMatchInlineSnapshot()
})

test('should not introduce line break if text node is empty', () => {
  const html = `<span>     </span>`

  expect(formatHTML(html)).toMatchInlineSnapshot()
})

test('should not lower case tags', () => {
  const html = `<Span></Span>`

  expect(formatHTML(html)).toMatchInlineSnapshot()
})

test('should support xml', () => {
  const xml = `<?xml version="1.0" encoding="utf-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.example.com</loc></url><url><loc>https://www.example.com/test</loc></url></urlset>`

  expect(formatHTML(xml)).toMatchInlineSnapshot()
})

test('should keep self-closing tags as they are', () => {
  const xml = `<xhtml:link href="https://en.example.com" /><xhtml:link href="https://en.example.com" />`

  // in the future this should be a self closing tag instead
  // see htmlparser2#69
  expect(formatHTML(xml)).toMatchInlineSnapshot()
})

test('should support doctype directives', () => {
  const html = `<!doctype html ><html></html>`
  expect(formatHTML(html)).toMatchInlineSnapshot()
})

test('should support html directives', () => {
  const html = `<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>test</title>
  </head>
  <body>
    <!--[if lte IE 9]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
    <![endif]-->

    <!-- Add your site or application content here -->
    <p>Hello world! This is HTML5 Boilerplate.</p>
    <script src="https://code.jquery.com/jquery-{{JQUERY_VERSION}}.min.js" integrity="{{JQUERY_SRI_HASH}}" crossorigin="anonymous"></script>
    <script src="js/plugins.js"></script>
    <script src="js/main.js"></script>

    <!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. -->
    <script>
      window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
      ga('create','UA-XXXXX-Y','auto');ga('send','pageview')
    </script>
    <script src="https://www.google-analytics.com/analytics.js" async defer></script>
  </body>
</html>`

  expect(formatHTML(html)).toMatchInlineSnapshot()
})

test('should strip out comments', () => {
  const html = `<p>Start</p><!-- This comment should be removed --><p>End</p>`

  expect(formatHTML(html)).toMatchInlineSnapshot()
})

test('should strip out empty comments', () => {
  const html = `<p>Start</p><!----><p>End</p>`

  expect(formatHTML(html)).toMatchInlineSnapshot()
})

test('should not strip out conditional comments', () => {
  const html = `<p>Start</p><!--[if IE 9]>.... some HTML here ....<![endif]--><p>End</p>`

  expect(formatHTML(html)).toMatchInlineSnapshot()
})

test('should sort attributes with `sortAttributes` function', () => {
  const html = `<input name="test" value="true" class="form-control" data-attr-1 data-attr-2>`
  const sortAttributes = (names: string[]) => names.slice().sort().reverse()
  expect(formatHTML(html, { sortAttributes })).toMatchInlineSnapshot()
})
