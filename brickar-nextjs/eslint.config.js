import next from '@next/eslint-plugin-next';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default [
  {
    // Add ignored files/directories here
    ignores: ['.next/', 'node_modules/', 'dist/', 'build/'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': typescript,
      react,
      prettier,
      'simple-import-sort': simpleImportSort,
      tailwindcss,
    },
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        React: true,
        JSX: true,
      },
    },
    rules: {
      'no-multi-spaces': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^\\u0000', '^@?\\w'], ['^'], ['^\\.']],
        },
      ],
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/enforces-shorthand': 'error',
      'tailwindcss/no-contradicting-classname': 'error',
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  //   {
  //     files: ['**/*.js'],
  //     rules: {
  //       'no-undef': 'error',
  //     },
  //   },
];
