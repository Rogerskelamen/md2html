# md2html

A simple markdown-html converter written in Typescript.

The style relies on browser pure style, inspired by [`txti`](https://txti.es/).

## Goal

> I create this project for learning TS and node dev, not for the purpose of building another better markdown parse engine.

Markdown syntax was first promoted with the release of `markdown.pl` by John Gruber. This leads to Markdown has no explicit definition, which means how markdown is parsed to HTML highly depends on the implementation of the tool. *And I choose a simplest way(line-by-line parsing)*

To stay as close as possible to the 'Standard Markdown', [CommonMark](https://commonmark.org/) is a great reference.

## Requirement

[Node](https://nodejs.org/) environment(>= v12.0.0) is necessary.

## Installation

Using npm:

```sh
npm i -g @rokelamen/md2html
```

## Usage

### As a command-line

```sh
md2html [options] [input]
```

1. Parse from/to stdio

```sh
md2html "# Markdown content" > index.html
```

2. Parse from/to file

```sh
md2html -f input.md -o index.html
```

### As a library

```javascript
import { parse } from '@rokelamen/md2html';
```

## Development

For development logs, please refer to the [Development Log](docs/development.md).
