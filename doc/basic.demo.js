var paging = require('paging')

require('paging/lib/index.css')

var node = document.getElementById('renderNode')

var title = document.createElement('h2')
title.innerHTML = '默认'
node.appendChild(title)
var dom = document.createElement('div')
paging.render(
    {
        page: 9,
        pageSize: 10,
        pageCount: 20,
        dataTotal: 200
    },
    {
        link: "p=",
        goto: true
    },
    dom
)
node.appendChild(dom)

var title = document.createElement('h2')
title.innerHTML = 'group 风格'
node.appendChild(title)
var dom = document.createElement('div')
paging.render(
    {
        page: 1,
        pageSize: 10,
        pageCount: 20
    },
    {
        link: "p=",
        themes: 'group'
    },
    dom
)
node.appendChild(dom)


var title = document.createElement('h2')
title.innerHTML = 'solid 风格'
node.appendChild(title)
var dom = document.createElement('div')
paging.render(
    {
        page: 1,
        pageSize: 10,
        pageCount: 20
    },
    {
        link: "p=",
        themes: 'solid'
    },
    dom
)
node.appendChild(dom)

var title = document.createElement('h2')
title.innerHTML = 'mini 风格'
node.appendChild(title)
var dom = document.createElement('div')
paging.render(
    {
        page: 1,
        pageSize: 10,
        pageCount: 20
    },
    {
        link: "p=",
        themes: 'simple',
        mini: true
    },
    dom
)
node.appendChild(dom)

var title = document.createElement('h2')
title.innerHTML = 'goto'
node.appendChild(title)
var dom = document.createElement('div')
paging.render(
    {
        page: 1,
        pageSize: 10,
        dataTotal: 100,
        pageCount: 20
    },
    {
        link: "p=",
        prevText: '<',
        nextText: '>',
        goto: true
    },
    dom
)
node.appendChild(dom)

var title = document.createElement('h2')
title.innerHTML = 'text'
node.appendChild(title)
var dom = document.createElement('div')
paging.render(
    {
        page: 1,
        pageSize: 10,
        dataTotal: 100,
        pageCount: 20
    },
    {
        link: "p=",
        prevText: '<',
        themes: 'solid',
        nextText: '>',
        dataTotalStartText: 'Total:',
        dataTotalEndText: 'items.',
        goto: true,
        gotoStartText: 'Go to',
        gotoEndText: 'page'
    },
    dom
)
node.appendChild(dom)

var title = document.createElement('h2')
title.innerHTML = '自定义查询条件'
node.appendChild(title)
    var title = document.createElement('h4')
    title.innerHTML = 'string'
    node.appendChild(title)
var dom = document.createElement('div')
paging.render(
    {
        page: 1,
        pageCount: 20
    },
    {
        link: "p=",
        query: 'demo=1'
    },
    dom
)
node.appendChild(dom)

var title = document.createElement('h4')
title.innerHTML = 'object'
node.appendChild(title)

var dom = document.createElement('div')
paging.render(
    {
        page: 1,
        pageCount: 20
    },
    {
        link: "p=",
        query: {
            demo: 2
        }
    },
    dom
)
node.appendChild(dom)

var title = document.createElement('h2')
title.innerHTML = 'onChange'
node.appendChild(title)
var dom = document.createElement('div')
paging.render(
    {
        page: 1,
        pageSize: 10,
        dataTotal: 100,
        pageCount: 20
    },
    {
        link: "p=",
        prevText: '<',
        nextText: '>',
        goto: true,
        onChange: function (page, data) {
            location.href = data.$link + page
        }
    },
    dom
)
node.appendChild(dom)


var title = document.createElement('h2')
title.innerHTML = 'mini onChange'
node.appendChild(title)
var dom = document.createElement('div')
paging.render(
    {
        page: 1,
        pageSize: 10,
        dataTotal: 100,
        pageCount: 20
    },
    {
        mini: true,
        goto: false,
        onChange: function (page, data) {
            location.href = data.$link + page
        }
    },
    dom
)
node.appendChild(dom)
