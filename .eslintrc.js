module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "off" or 0 - turn the rule off
        // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
        // "error" or 2 - turn the rule on as an error (exit code will be 1)
    },
};
