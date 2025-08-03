const looseBase = require('./loose-base')
const react = require('./rules/react')

module.exports = [...react, ...looseBase]
