const path = require('path')
const { script } = require('./script.config.js')

const ownConfiguration = {
  directory: {
    root: path.resolve(`${__dirname}/..`),
    get source() {
      return path.join(ownConfiguration.directory.root, './source')
    },
    get distribution() {
      return path.join(ownConfiguration.directory.root, './distribution')
    }, 
  },
  entrypoint: {
    programmaticAPI: './server/script.js',
  },
  script,
  transpilation: {
    babelConfigKey: 'serverRuntime.BabelConfig.js',
    get babelConfig() {
      const { getBabelConfig } = require('@dependency/javascriptTranspilation')
      return getBabelConfig(ownConfiguration.transpilation.babelConfigKey, { configType: 'json' })
    },
  },
}

module.exports = ownConfiguration
