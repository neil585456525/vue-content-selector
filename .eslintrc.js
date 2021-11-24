/*eslint-disable*/
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  ignorePatterns: ["**/dist/**"],
  rules: {
    '@typescript-eslint/indent': [
      'error',
      2
    ],
    "import/no-absolute-path": "off",
    "prefer-destructuring": ["error", { "object": true, "array": false }],
    'operator-linebreak': "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "no-return-await": "off",
    "function-paren-newline": "off",
    "implicit-arrow-linebreak": "off",
    "object-curly-newline": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "import/prefer-default-export": "off",
    // "import/no-default-export": "warn",
    'arrow-parens': 'off',
    'max-len': "off",
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    // 'quotes': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};