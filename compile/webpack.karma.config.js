var webpackConfig = require('./webpack.config.js')
webpackConfig = {
    module: webpackConfig.module,
    devtool: '#inline-source-map',
    externals: {
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
}
module.exports = webpackConfig
