import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  rootDir: './src/',
  testPathIgnorePatterns: ['setup.ts'],
};

export default config;
