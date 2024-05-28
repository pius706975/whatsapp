module.exports = {
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: ['prettier'],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
            },
        },
    },
    rules: {
        'global-require': 'off',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                trailingComma: 'es5',
                bracketSpacing: true,
                jsxBracketSameLine: false,
                printWidth: 80,
                tabWidth: 4,
            },
        ],
        'no-console': 'warn',
        'no-debugger': 'warn',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'import/no-extraneous-dependencies': 'off',
        'import/no-dynamic-require': 'off',
        'import/no-unresolved': 'off',
        'arrow-body-style': 'off',
        'no-param-reassign': 'off',
        camelcase: 'off',
    },
};
