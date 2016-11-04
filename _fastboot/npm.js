var exec = require('child_process').exec
var path = require('path')
require('./rm')()
var shellPath = path.join(__dirname, 'npm.sh')
exec('sh ' + shellPath, function(error, stdout, stderr) {
    console.log('stdout: ' + stdout)
    console.log('stderr: ' + stderr)
    if (error !== null) {
        console.log('exec error: ' + error)
    }
})
