import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import rollupJson from '@rollup/plugin-json';
import rollupScss from 'rollup-plugin-scss';
import sass from 'sass';
import pkg from './package.json';

export default [
  {
    input: 'src/js/downpour.js',
    output: [
      { file: pkg.main, format: 'cjs' },
    ],
    plugins: [
      babel({
        babelHelpers: 'bundled',
      }),
      rollupJson(),
      terser(),
    ],
    external: [
      '@cloudfour/hbs-helpers',
      '@sparkbox/if-prod',
      'colors',
      'drizzle-builder',
      'handlebars-helpers',
      'lodash',
      'path',
      'shelljs',
    ],
  },
  {
    input: 'src/js/drizzle.js',
    output: [
      { file: pkg.mainDrizzleJS, format: 'iife' },
    ],
    plugins: [
      babel({
        babelHelpers: 'bundled',
      }),
      rollupScss({
        sass,
        output: pkg.mainDrizzleCSS,
        outputStyle: 'compressed',
      }),
      nodeResolve(),
      terser(),
    ],
  },
];
