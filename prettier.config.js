export default {
    arrowParens: 'avoid',
    singleQuote: true,
    trailingComma: 'es5',
    tabWidth: 4,
    printWidth: 100,
    overrides: [
        {
            files: '*.json',
            options: {
                tabWidth: 2,
            },
        },
    ],
    endOfLine: 'lf',
};
