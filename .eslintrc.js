module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2019,
  },
  plugins: [
    'prettier',
    'import',
    'jsdoc',
    'eslint-comments',
  ],
  rules: {
    // overrides
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'require-await': 'error',
    'no-restricted-syntax': 'off',
    'prefer-destructuring': 'off',
    'linebreak-style': 'off',

    // prettier
    'prettier/prettier': 'error',

    // import
    'import/no-cycle': 'off',
    'import/extensions': ['error', 'always', { ignorePackages: true }],

    // jsdoc
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-examples': 'error',
    'jsdoc/check-indentation': 'error',
    'jsdoc/check-param-names': 'error',
    'jsdoc/check-syntax': 'error',
    'jsdoc/check-tag-names': 'error',
    'jsdoc/check-types': 'error',
    'jsdoc/newline-after-description': 'error',
    'jsdoc/no-undefined-types': 'error',
    'jsdoc/require-hyphen-before-param-description': 'error',
    'jsdoc/require-param-description': 'error',
    'jsdoc/require-param-name': 'error',
    'jsdoc/require-param': 'error',
    'jsdoc/require-returns-description': 'error',
    'jsdoc/valid-types': 'error',

    // eslint-comments
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'eslint-comments/no-aggregating-enable': 'error',
    'eslint-comments/no-duplicate-disable': 'error',
    'eslint-comments/no-unlimited-disable': 'error',
    'eslint-comments/no-unused-disable': 'error',
    'eslint-comments/no-unused-enable': 'error',

    'no-plusplus': 'off',
    'no-restricted-globals': "off",
    'radix': "off",
    "consistent-return": "off",
  },
};
