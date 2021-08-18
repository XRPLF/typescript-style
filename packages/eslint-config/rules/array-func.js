module.exports = {
  env: {
    // Enable node global variables & Node.js scoping
    node: true,
    // Add all ECMAScript 2020 globals and automatically set the ecmaVersion parser option to ES2020
    es2020: true,
  },
  parserOptions: {
    sourceType: 'module',
  },

  plugins: ['array-func'],

  rules: {
    // Prefer using the mapFn callback of Array.from over an immediate .map() call on the Array.from result.
    // https://github.com/freaktechnik/eslint-plugin-array-func#from-map
    'array-func/from-map': 'error',

    // Avoid the `this` parameter when providing arrow function as callback in array functions.
    // https://github.com/freaktechnik/eslint-plugin-array-func#no-unnecessary-this-arg
    'array-func/no-unnecessary-this-arg': 'error',

    // Use Array.from instead of [...iterable] for performance benefits.
    // https://github.com/freaktechnik/eslint-plugin-array-func#prefer-array-from
    'array-func/prefer-array-from': 'error',

    // Avoid reversing the array and running a method on it
    // if there is an equivalent of the method operating on the array from the other end.
    // https://github.com/freaktechnik/eslint-plugin-array-func#avoid-reverse
    'array-func/avoid-reverse': 'error',

    // Use .flatMap() to flatten an array and map the values instead of using .flat().map().
    // https://github.com/freaktechnik/eslint-plugin-array-func#prefer-flat-map
    'array-func/prefer-flat-map': 'error',

    // Use .flat() to flatten an array of arrays.
    // https://github.com/freaktechnik/eslint-plugin-array-func#prefer-flat
    'array-func/prefer-flat': 'error',
  },

  overrides: [],
}
