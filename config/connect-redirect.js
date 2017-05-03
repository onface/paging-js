var iPackage = require('../package.json')
module.exports = function (req, res, next) {
    var versionUrl = '/' + iPackage.version
    var repositoryUrl = '/' + iPackage.gitRepository
    if (req.path.indexOf(versionUrl) === 0 || req.path.indexOf(repositoryUrl) === 0) {
        var redirectUrl = req.path.replace(versionUrl, '')
        redirectUrl = redirectUrl.replace(repositoryUrl, '')
        res.redirect(redirectUrl)
    }
    next()
}
