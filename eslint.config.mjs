// eslint.config.mjs
import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // Next.js + React + React Hooks + Core Web Vitals
  ...nextVitals,

  // Global ignores, apply to everything
  globalIgnores([
    // Next.js defaults
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',

    // Your project ignores
    '.nx/**',
    'coverage/**',
    'dist/**',
    'node_modules/**',
    '.vs/**',
  ]),

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      // Next.js / React best practices
      '@next/next/no-async-client-component': 'error',
      '@next/next/no-head-element': 'error',
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-sync-scripts': 'error',

      // React / JSX template-equivalent rules
      'react/button-has-type': 'warn',
      'react/jsx-key': 'error',
      'react/no-array-index-key': 'warn',
      'react/self-closing-comp': [
        'warn',
        {
          component: true,
          html: true,
        },
      ],

      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          reservedFirst: true,
          ignoreCase: true,
          noSortAlphabetically: true,
        },
      ],

      // TypeScript best practices
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/array-type': ['warn'],
      '@typescript-eslint/prefer-readonly': 'error',
      // '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/consistent-type-assertions': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      // '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        },
      ],
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'never',
          allowObjectTypes: 'always',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // JavaScript best practices
      'no-empty-function': 'off', // must disable the base rule as it can report incorrect errors and conflicts with the TypeScript version
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      complexity: ['error', 20],
      curly: 'error',
      'guard-for-in': 'error',
      'max-classes-per-file': ['error', 1],
      // 'max-len': [
      //   'warn',
      //   {
      //     code: 120,
      //     comments: 160,
      //   },
      // ],
      // 'max-lines': ['error', 400],
      'no-bitwise': 'error',
      // 'no-console': 'off',
      'no-new-wrappers': 'error',
      'no-useless-concat': 'error',
      'no-var': 'error',
      // 'no-restricted-syntax': 'off',
      'no-shadow': 'off', // must disable the base rule as it can report incorrect errors and conflicts with the TypeScript version
      'one-var': ['error', 'never'],
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          allowSeparatedGroups: true,
        },
      ],
      'no-useless-escape': 'warn',
      'no-useless-rename': 'warn',
      // 'no-useless-return': 'warn',
      'no-with': 'error',
      'operator-assignment': 'warn',
      'prefer-numeric-literals': 'warn',
      'prefer-object-spread': 'warn',
      // 'prefer-promise-reject-errors': 'error',
      'prefer-rest-params': 'warn',
      'prefer-spread': 'warn',
      'prefer-template': 'warn',
      radix: 'error',
      // 'require-await': 'error',
      'require-yield': 'error',

      // Security
      'no-eval': 'error',
      'no-implied-eval': 'error',
    },
  },
]);
