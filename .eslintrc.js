module.exports = {
root: true,
env: {
    node: true,
    browser: true,
    es6: true,
},
extends: [
'eslint:recommended',
'plugin:vue/vue3-recommended',
'eslint:recommended',
'plugin:vue/vue3-recommended',
'@vue/eslint-config-typescript',
'eslint:recommended',
'plugin:vue/vue3-recommended',
'@vue/eslint-config-typescript',
'plugin:prettier/recommended',
],
parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
},
plugins: ['vue', '@typescript-eslint'],
rules: {
    
},
};