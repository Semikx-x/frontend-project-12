import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import functionalPlugin from 'eslint-plugin-functional';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  ...compat.extends('eslint-config-airbnb'),
  ...compat.extends('plugin:react/recommended'),
  ...compat.extends('plugin:react-hooks/recommended'),

  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin,
      functional: functionalPlugin,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'import/extensions': 0,
      'import/no-unresolved': 0,
      'react/prop-types': 0,
      'no-console': 0,
      'react/react-in-jsx-scope': 0,

      'functional/no-conditional-statements': 0,
      'functional/no-expression-statements': 0,
      'functional/immutable-data': 0,
      'functional/functional-parameters': 0,
      'functional/no-try-statements': 0,
      'functional/no-throw-statements': 0,
      'functional/no-return-void': 0,

      'no-underscore-dangle': [2, { allow: ['__filename', '__dirname'] }],
      'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
      'testing-library/no-debug': 0,
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    },
  },
]);
