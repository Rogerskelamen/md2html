import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';

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
    json(),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts'],
      presets: [
        ['@babel/preset-env', { targets: { node: '10' } }]
      ]
    })
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
    typescript({
      tsconfig: './tsconfig.json'
    })
  ]
};

export default [ cliBundle, libBundle ];
