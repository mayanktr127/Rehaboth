const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

module.exports = [
  {
    ignores: [
      'dist/*',
      'web/*',
      'Rehaboth-full-codebase-no-kotlin-6ebde9a/*',
      '_reference/*',
      '.expo/*',
      'node_modules/*',
    ],
  },
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },
];
