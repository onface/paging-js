module.exports = function () {
    var aCorrectParameters = ['page', 'pageCount']
    var i = 0
    var iSize = aCorrectParameters.length
    for (;i < iSize; i++) {
        var name = aCorrectParameters[i]
        switch (typeof settings[name]) {
            case 'string':

                settings[name] = parseInt(settings[name], 10)
                if (isNaN(settings.currentPage)) {
                    throw new Error('Paging settings.' + name + ' must be an Number type!')
                }
            break
            default:
            throw new Error('Paging settings.' + name + ' must be an Number type!')
        }
    }
    if (settings.currentPage === 0) {
        settings.currentPage = 1
    }
    return settings
}
