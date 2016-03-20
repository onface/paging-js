var mustache = require('mustache')
module.exports = function (settings) {
    settings.template = settings.template || this.template.default
    var oPagingData = this.createData(settings)
    return mustache.render(settings.template, oPagingData)
}
