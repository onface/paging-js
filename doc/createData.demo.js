var paging = require('paging')
var jsonFormat = require('json-format')
document.getElementById('dataNode').innerHTML = jsonFormat(
    paging.createData({
        page: 1,
        pageCount: 20
    })
)
