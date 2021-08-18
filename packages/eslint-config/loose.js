module.exports = {
  extends: [
    './rules/react',
    './loose-base',
  ].map(require.resolve),
}
