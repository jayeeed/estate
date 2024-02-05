module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    // Stylistic rules
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    // 'comma-dangle': ['error', 'always-multiline'],

    // Best practices
    'no-console': 'error',
    'no-eval': 'error',

    // Variable declaration
    // 'no-unused-vars': 'error',
    'no-shadow': 'error',

    // ES6 and Modules
    'arrow-spacing': 'error',
    'prefer-const': 'error',

    // React rules (if using React)
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',

    // Additional rules for prompts or input/output
    // Example: Disallow synchronous methods in Promises
    'require-await': 'error',

    // Example: Disallow the use of alert, confirm, and prompt
    'no-alert': 'error',
    'no-confirm': 'error',
    'no-prompt': 'error',
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}

