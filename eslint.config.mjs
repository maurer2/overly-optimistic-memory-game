import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const configList = tseslint.config(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  tseslint.configs.recommendedTypeChecked,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
);

/** @type { import("eslint").Linter.Config[] } */
export default configList;
