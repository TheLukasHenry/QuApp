/* eslint-disable @typescript-eslint/no-var-requires */
// const dirCase = require('lodash').upperCase
const moduleTemplate = require('./module')
const kebabCase = require('lodash').kebabCase
const camelCase = require('lodash').camelCase

module.exports = function (plop) {
  moduleTemplate(plop)

  plop.addHelper('kebabCase', kebabCase)
  plop.addHelper('camelCase', camelCase)
  plop.addHelper('dbAlias', (p) => p[0].toLowerCase())
}
