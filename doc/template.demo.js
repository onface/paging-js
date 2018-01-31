var paging = require('paging')
paging.render(
    {
        page: 1,
        pageCount: 20
    },
    {
        template: ''+
        '<a href="{{$link}}{{prevPage}}">上一页</a>' +
        '{{page}}/{{pageCount}}'+
        '<a href="{{$link}}{{nextPage}}">下一页</a>'
    },
    document.getElementById('tempalteRenderNode')
)

document.getElementById('templateNode').innerHTML = paging.template()
