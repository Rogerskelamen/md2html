# Development Log

This document records the technical decisions and development process of the `md2html` project.

## Tooling Decisions

Q: Why I choose to use [`rollup`](https://rollupjs.org/)?

A: Every time I `import` a module, I have to add extension to the module file and it is probably a `.js` rather than `.ts`. It's wired that I must `import` a future JS file. So I decided to use a build tool (`rollup` of course) to pack all files together, which eliminates all `import` statements.

Q: Why I choose to use [`babel`](https://babeljs.io/)?

A: The default TS compiler only handles compilation job and is not good at transforming code to other ES version. So babel here as a professional transpiler, ensure that users could use this `md2html` cli in any node environment.
