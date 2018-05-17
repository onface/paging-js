var paging = require('paging')
var node = document.getElementById('renderNode')
require('face-icon/lib/index.css')
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
title.innerHTML = 'group group-solid 风格'
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
        themes: 'group group-solid'
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
        page: 8,
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
title.innerHTML = 'full 风格'
node.appendChild(title)
var dom = document.createElement('div')
paging.render(
    {
        page: 8,
        pageSize: 10,
        pageCount: 20,
        dataTotal: 201
    },
    {
        link: "p=",
        themes: 'full',
        goto: true
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
        text: {
            prev: '<span class="fi fi-double-left"></span>',
            next: '<span class="fi fi-double-right"></span>'
        },
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
        themes: 'solid',
        text: {
            prev: '<',
            next: '>',
            dataTotal: {
                before: 'Total:',
                after: 'items.'
            },
            goto: {
                before : 'Go to',
                after: 'page.'
            }
        },
        goto: true
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
        text: {
            prev: '<',
            next: '>'
        },
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
