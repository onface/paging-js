var fs = require('fs')
var path = require('path')
var config = fs.readFileSync(path.join(__dirname, '../.babelrc')).toString()
config = JSON.parse(config)
module.exports = config
