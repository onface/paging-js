var ghpages = require('gh-pages')
var path = require('path')
var fs = require('fs')
ghpages.publish(path.join(__dirname, '../output'), {
    message: 'onface/module auto-generated commit',
    logger: function(message) {
        console.log(message)
    },
    add: true
}, function(err) {
    console.log(err)
    if (err) {throw err}
    console.log('push success')
});
console.log('git branch gh-pages pushing...')
