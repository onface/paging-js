var webpack = require('webpack')
var compiler = webpack(require('./webpack.config.js'))
var express = require('express')
var path = require('path')
var app = express();
require('./livereload.js')
app.use(express.static(path.join(__dirname, '../output')))
app.use(require("webpack-dev-middleware")(compiler, {
	publicPath: '/',
}));
app.use(require("webpack-hot-middleware")(compiler))
var config = require('./getConfig')()
app.listen(config.serverPort)
