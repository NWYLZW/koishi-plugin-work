module.exports = {
  extends: [
    'eslint:recommended',
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [
    '@typescript-eslint',
  ],
  env: {
    browser: true, node: true, es6: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_.*$',
        varsIgnorePattern: '^_.*$'
      }
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_.*$',
        varsIgnorePattern: '^_.*$'
      }
    ]
  }
}
