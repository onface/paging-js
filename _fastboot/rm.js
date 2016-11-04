// Don't change this file
// 不要修改这个文件
var rm = require('rm-r')
var path = require('path')
module.exports = function () {
    var OUTPUT = path.join(__dirname, '../output')
    rm.dir(OUTPUT)
    console.log('remove dir:' + OUTPUT)
}
