module.exports = {
  "root": true,

  "env": {
    node: true,
  },

  "extends": [
    'plugin:vue/recommended',
  ],

  "rules": {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': [0],
    'vue/no-v-html': 'off',
    'import/no-unresolved': 'off',
    'no-unused-expressions': ['error', { 'allowTernary': true }],
    'no-param-reassign': 0,
    'quote-props': ['error', 'consistent'],
    // vue rules
    "vue/order-in-components": ["error", {
      "order": [
        "el",
        "name",
        "parent",
        "functional",
        ["delimiters", "comments"],
        ["components", "directives", "filters"],
        "extends",
        "mixins",
        "inheritAttrs",
        "model",
        ["props", "propsData"],
        "data",
        "computed",
        "watch",
        "LIFECYCLE_HOOKS",
        "methods",
        ["template", "render"],
        "renderError"
      ]
    }],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never'
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'always'
    }],
    'vue/script-indent': ['error', 2, {
      'baseIndent': 0,
      'switchCase': 1,
      'ignores': []
    }],
    'vue/max-attributes-per-line': [2, {
      'singleline': 5,
      'multiline': {
        'max': 5,
        'allowFirstLine': false
      }
    }],
  },

  "parserOptions": {
    parser: '@typescript-eslint/parser',
  },

  'extends': [
    'plugin:vue/recommended',
    '@vue/typescript'
  ]
};
