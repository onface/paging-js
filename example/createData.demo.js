var paging = require('paging')
var jsonFormat = require('json-format')
var data = paging.createData({
    page: 1,
    pageSize: 10,
    pageCount: 20,
})
document.getElementById('createDataNode').innerHTML = jsonFormat(data)
