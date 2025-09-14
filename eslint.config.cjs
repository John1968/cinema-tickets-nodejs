const dwpConfigBase = require('@dwp/eslint-config-base');
const globals = require('globals');

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
