var paging = require('paging')
document.getElementById('renderNode').innerHTML = [
    '<h2>默认</h2>',
    paging.render(
        {
            page: 9,
            pageSize: 10,
            pageCount: 20
        },
        {
            link: "?page="
        }
    ),
    '<h2>group 风格</h2>',
    ,
    paging.render(
        {
            page: 1,
            pageSize: 10,
            pageCount: 20
        },
        {
            link: "?page=",
            themes: 'group'
        }
    ),
    '<h2>solid 风格</h2>',
    paging.render(
        {
            page: 1,
            pageSize: 10,
            pageCount: 20
        },
        {
            link: "?page=",
            themes: 'solid'
        }
    ),
    '<h2>mini 风格</h2>',
    paging.render(
        {
            page: 1,
            pageSize: 10,
            pageCount: 20
        },
        {
            link: "?page=",
            themes: 'simple',
            mini: true
        }
    ),
    '<h2>text</h2>',
    paging.render(
        {
            page: 1,
            pageSize: 10,
            dataTotal: 100,
            pageCount: 20
        },
        {
            link: "?page=",
            prevText: '<',
            themes: 'solid',
            nextText: '>',
            dataTotalStartText: 'Total:',
            dataTotalEndText: 'items.'
        }
    )
    // pagingSettings 参数参考 paing.createData
    // styleSettings 默认参数是
    /*
        {
            themes: 'simple',
            link: '',
            mini: false,
            prefix: 'face-paging',
            prevText: '上一页',
            nextText: '下一页',
            dataTotalStartText: '共',
            dataTotalEndText: '条',
        }
    */
].join('\r\n')
