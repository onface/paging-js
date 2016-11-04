var iPackage = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, 'package.json')).toString())
/*
 * mose(Mock Server)
 * Homepage: http://www.mosejs.org
 */
var mose = require('mose')
var app = mose({
    name: iPackage.name,
    root: __dirname,
    static: './output'
})
