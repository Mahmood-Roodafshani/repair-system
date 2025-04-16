import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist']
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020
      },
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module'
      }
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'prettier/prettier': 'off',
      'react/jsx-filename-extension': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'react/display-name': 'off',
      'import/prefer-default-export': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'no-console': 'off',
      'no-param-reassign': 'off',
      'no-plusplus': 'off',
      'no-return-assign': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'import/no-extraneous-dependencies': 'off',
      'react/no-unescaped-entities': 'off',
      'react/forbid-prop-types': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_|^[A-Z]',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_'
        }
      ]
    }
  },
  {
    files: ['src/routes/index.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off'
    }
  }
];
