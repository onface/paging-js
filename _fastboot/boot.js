var ejs = require('ejs')
var fs = require('fs')
var path = require('path')
var glob = require('glob')
var writeJsonFile = require('write-json-file')

var iPackage = JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'package.json')).toString())

var initFile = [
    '**.md',
    'example/**/**.md',
    'doc/**/**.md',
    'test/**/**.md'
]

iPackage = ejs.render(JSON.stringify(iPackage), iPackage)
iPackage = JSON.parse(iPackage)

writeJsonFile.sync(path.join(__dirname, '../', 'package.json'), iPackage, {
    indent: '  '
})

initFile.forEach(function (globfile) {
    glob(globfile, function (err, files) {
        if (err) { throw err }
        files.forEach(function (filepath) {
            filepath = path.join(__dirname, '../', filepath)
            var content = fs.readFileSync(filepath).toString()
            var renderResult = ejs.compile(content)(iPackage)
            fs.writeFileSync(filepath, renderResult, 'utf-8')
            console.log('## writeFile: ' + filepath)
        })
    })
})
var gitignorePath = path.join(__dirname, '../', '.gitignore')
var gitignoreContent = [
    '\nnode_modules',
    '.DS_Store',
    'npm-debug.log',
    'output'
].join('\n')
var exist = fs.existsSync(gitignorePath)
if (exist) {
    gitignoreContent = fs.readFileSync(gitignorePath).toString() + gitignoreContent
}
fs.writeFileSync(gitignorePath, gitignoreContent, 'utf-8')
