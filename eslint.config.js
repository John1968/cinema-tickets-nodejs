const { FlatCompat } = require('@eslint/eslintrc');
const dwpConfigBase = require('@dwp/eslint-config-base')


module.exports [{
    ...dwpConfigBase,
    languageOptions: {
        globals: {
            ...globals.mocha,
            ...globals.node,
        },
    },

    rules: {
       'no-console':'off',
    },
}];