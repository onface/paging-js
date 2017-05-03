var ghpages = require('gh-pages')
var path = require('path')
var fs = require('fs')
ghpages.publish(path.join(__dirname, '../output'), {
    message: 'fast-flow/react-component auto-generated commit',
    logger: function(message) {
        console.log(message)
    },
    add: true
}, function(err) {
    if (err) {throw err}
});
console.log('git branch gh-pages pushing...')
