# md2html

A simple markdown-html conventer written in Typescript.

## Goal

> I create this project for learning TS and node dev, not for the purpose of building another better markdown parse engine.

Markdown syntax was first promoted with the release of `markdown.pl` by John Gruber. This leads to Markdown has no explicit definition, which means how markdown is parsed to HTML highly depends on the implementation of the tool. *And I choosed a simplest way(line-by-line parsing)*

To stay as close as possible to the 'Standard Markdown', [CommonMark](https://commonmark.org/) is a great reference.

## Development Log

Why I choose to use [`rollup`](https://rollupjs.org/)?

A: Every time I `import` a module, I have to add extension to the module file and it is probably a `.js` ranther than `.ts`. It's wired that I must `import` a future JS file. So I decided to use a build tool(`rollup` of course) to pack all files together, which eliminates all `import` statements.

