var path = require('path')
var webpack = require('webpack')
var express = require('express')
var open = require("open")
var iPackage = require('../package.json')
var hashToPort = require('hash-to-port')
var hotServerPort = hashToPort(iPackage.name + 'fast-flow/react:server')
var hotConfig = require('./webpack.hot')
var webpackConfig = require('./webpack.webpack')

module.exports = function (settings) {
    var config
    if (settings.hot) {
        config = hotConfig
    }
    else {
        config = webpackConfig
    }
    var app = express();
    var compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
    app.use(express.static(__dirname + '/../output'))
    app.use(require('./connect-redirect.js'))
    console.log(__dirname + '/../output')
    app.listen(hotServerPort, function(err) {
      if (err) {
        return console.error(err);
      }
      var url = 'http://localhost:' + hotServerPort
      open(url)
      console.log('React hot reload server listening at ' + url);
    })
}
