// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';

export default tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-class-suffix': [
        'error',
        {
          'suffixes': ['Component']
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'flag',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['enum', 'enumMember', 'interface', 'typeParameter'],
          format: ['PascalCase']
        },
        {
          selector: 'function',
          format: ['camelCase']
        },
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase']
        },
        {
          selector: 'variable',
          modifiers: ['global'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE']
        }
      ],
      '@typescript-eslint/no-explicit-any': 'error',    
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_',
          'ignoreRestSiblings': true
        }
      ],
      '@typescript-eslint/no-use-before-define': [
        'warn',
        {
          'functions': false,
          'classes': false,
          'variables': true
        }
      ],
      'eol-last': ['error', 'always'],
      'indent': [
        'error',
        2,
        {
          'SwitchCase': 1
        }
      ],
      'max-len': [
        'error',
        {
          'code': 100
        }
      ],
      'max-lines': [
        'error',
        {
          'max': 200
        }
      ],
      'no-multiple-empty-lines': 'error',
      'padding-line-between-statements': [
        'warn',
        {
          'blankLine': 'always',
          'prev': '*',
          'next': 'class'
        },
        {
          'blankLine': 'always',
          'prev': '*',
          'next': 'function'
        },
        {
          'blankLine': 'always',
          'prev': 'block-like',
          'next': ['let', 'const']
        }
      ],
      'quotes': [
        'error',
        'single'
      ],
      'semi': ['error', 'always'],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
