const { getBabelConfig } = require('@dependency/javascriptTranspilation')

module.exports = getBabelConfig('serverRuntime.BabelConfig.js', { configType: 'functionApi' })
