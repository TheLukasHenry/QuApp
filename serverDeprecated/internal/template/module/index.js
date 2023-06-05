/* eslint-disable @typescript-eslint/no-var-requires */
const files = require('./files')

function getFiles() {
  return files.map((name) => ({
    type: 'add',
    path: `../../src/{{snakeCase name}}/${
      name.includes('case_name') ? name.replace('case_name', '{{snakeCase name}}') : name
    }`,
    templateFile: `./module/${name}.hbs`,
    abortOnFail: true,
  }))
}

module.exports = function (plop) {
  plop.setGenerator('module', {
    description: 'Generating basic module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name? ex: Answer',
        validate: (value) => {
          if (/.+/.test(value)) {
            return true
          }
          return 'Name is required'
        },
      },
    ],
    actions: getFiles,
  })
}
