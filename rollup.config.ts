import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

/* Export as a command line */
const cliBundle = {
  input: 'src/cli.ts',
  output: {
    file: 'bin/cli.cjs',
    format: 'cjs',
    banner: '#!/usr/bin/env node'
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript()
  ]
};

/* Export as a library */
const libBundle = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm'
  },
  plugins: [
    resolve(),
    typescript()
  ]
};

export default [ cliBundle, libBundle ];
