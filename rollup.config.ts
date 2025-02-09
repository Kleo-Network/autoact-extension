import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import copy from 'rollup-plugin-copy';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';
import tailwindcss from 'tailwindcss';
import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// Common plugins used in multiple bundles
const commonPlugins = [
  resolve({
    browser: true,
    extensions,
    preferBuiltins: false,
  }),
  commonjs(),
  json(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
    preventAssignment: true,
  }),
  production && terser(),
];

// React Application (Popup or Options Page)
const reactApp = {
  input: 'sidebar/main.tsx', // Entry point for your React app
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: 'dist/js/app.js',
    strict: true
  },
  plugins: [
    ...commonPlugins,
    typescript({
      tsconfig: './tsconfig.json',
    }),
    babel({
      babelHelpers: 'bundled',
      extensions,
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
    }),
    production &&
      visualizer({
        filename: 'public/app.html',
        template: 'treemap', // or 'sunburst' for different visualization
      }),
      postcss({
        extract: true,
        minimize: production,
        plugins: [postcssImport(), tailwindcss(), autoprefixer()],
      }),
      svgr(),
    copy({
      targets: [
        { src: 'src/logo/**/*', dest: 'dist/logo/' },
        { src: 'src/assets/**/*', dest: 'dist/assets/' },
        { src: 'public/**/*', dest: 'dist/' },
        {
          src: 'manifest.json',
          dest: 'dist/',
          transform: (contents) => {
            const jsonContent = JSON.parse(contents.toString());
            jsonContent.version = pkg.version;
            return JSON.stringify(jsonContent, null, 2);
          },
        },
      ],
    }),
  ],
};

// Background Scripts
// Background Scripts
const background = {
  input: 'background/index.ts',
  output: {
    sourcemap: !production,
    format: 'es',
    name: 'background',
    file: 'dist/background.js',
    inlineDynamicImports: true, // Add this line
  },
  plugins: [
    ...commonPlugins,
    nodePolyfills(),
    typescript({
      tsconfig: './tsconfig.json',
      include: ['background/**/*.ts'],
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts'],
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
    }),
    production &&
      visualizer({
        filename: 'public/background.html',
        template: 'treemap',
      }),
  ],
};


// Content Script
// Previous imports remain the same...

const contentScript = {
    input: 'toolbar/index.ts',
    output: {
      sourcemap: !production,
      format: 'iife',
      name: 'contentScript',
      file: 'dist/contentScript.js',
    },
    plugins: [
      ...commonPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        include: ['toolbar/**/*.ts', 'toolbar/**/*.tsx'], // Add .tsx files
      }),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Ensure .tsx is included
        exclude: 'node_modules/**',
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
      }),
      postcss({
        plugins: [postcssImport(), tailwindcss(), autoprefixer()],
      }),
      production &&
        visualizer({
          filename: 'public/contentScript.html',
          template: 'treemap',
        }),
    ],
  }

// Injected Script
// const injectedScript = {
//   input: 'content/injectedScript.ts',
//   output: {
//     sourcemap: !production,
//     format: 'iife',
//     name: 'injectedScript',
//     file: 'dist/injectedScript.js',
//   },
//   plugins: [
//     ...commonPlugins,
//     typescript({
//       tsconfig: './tsconfig.json',
//       include: ['content/**/*.ts'],
//     }),
//     babel({
//       babelHelpers: 'bundled',
//       extensions: ['.js', '.ts'],
//       exclude: 'node_modules/**',
//       presets: ['@babel/preset-env', '@babel/preset-typescript'],
//     }),
//     production &&
//       visualizer({
//         filename: 'stats-injectedScript.html',
//         template: 'treemap',
//       }),
//   ],
// };

//export default [reactApp, background, contentScript, injectedScript];
export default [reactApp, background, contentScript];