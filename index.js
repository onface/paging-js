var paging = {}
module.exports = paging

paging.createData = function (pagecount) {
    var settings = typeof pagecount === 'object' ? pagecount : {
        pagecount: pagecount
    }
}
paging.render = function (pagecount, tpl) {
    var settings = typeof pagecount === 'object' ? pagecount : {
        pagecount: pagecount,
        tpl: tpl
    }
}