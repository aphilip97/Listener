// @ts-check
import fs from 'fs';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

/**
 * Promisified fs.readFile
 * @param {string} filepath The path to the file to read.
 * @returns {Promise<string[]>} File contents as a string array.
 */
const asyncReadFile = filepath => new Promise(
  (resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if (err) reject(err);
      resolve(data.toString().split('\n'));
    });
  }
);

const createConfig = async () => {

  const envFile = await asyncReadFile('.env');
  const env = {};

  for (let index = 0; index < envFile.length; index++) {
    const variable = envFile[index];
    let [key, value] = variable.split('=');
    if (key && value) {
      value = value.replace(/^"(.*)"$/, '$1');
      env[key] = value;
    } else {
      throw new Error(
        `Bad key value pair in .env file at line ${index + 1}.`,
      );
    }
  }

  /** @type {import('rollup').RollupOptions[]} */
  const config = [
    // Bundle the react app
    {
      input: './src/index.tsx',
      output: {
        dir: process.env["DEV"] ? './output/' : './dist/',
      },
      plugins: [
        replace({
          /*
            Couldn't figure out how to get React DevTools
            working with a chrome extension so I'm going to set
            the NODE_ENV to 'production' because there is no
            point setting it to development.
          */
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        nodeResolve({
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          browser: true,
        }),
        commonjs(),
        typescript({
          tsconfig: './tsconfig.prod.json',
        }),
      ],
    },
    // Bundle the redirect content script
    {
      input: './src/redirect.ts',
      output: {
        dir: process.env["DEV"] ? './output/' : './dist/',
      },
      plugins: [
        typescript({
          tsconfig: './tsconfig.prod.json',
        }),
      ],
    },
    // Bundle the background script
    {
      input: './src/background.ts',
      output: {
        dir: process.env["DEV"] ? './output/' : './dist/',
      },
      plugins: [
        typescript({
          tsconfig: './tsconfig.prod.json',
          outDir: process.env["DEV"] ? './output/' : './dist/',
        }),
      ],
    },
  ];

  return config;

};

export default createConfig();
