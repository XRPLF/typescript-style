module.exports = {
  extends: ['airbnb', 'airbnb/hooks'],

  rules: {
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],

    'react/require-default-props': 'off',
  },
}
