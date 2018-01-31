var hashPort = require('hash-to-port')
var iPackgae = require('../package.json')
module.exports = function () {
    return {
        serverPort: hashPort('server' + iPackgae.name),
        livereloadServerPort: hashPort('livereloadServer' + iPackgae.name)
    }
}
