var createData = require('./createData')
var mustache = require('mustache')
var extend = require('extend')
var qs = require('qs')
require('./index.css')
function renderPaging (settings, style, dom) {
    var data = createData(settings)

    var defaultStyle = require('./renderStyleDefault.js')()
    var userStyle = extend(true, defaultStyle ,style)
    var renderStyle = {}
    Object.keys(userStyle).map(function (key){
        renderStyle['$' + key] = userStyle[key]
    })
    extend(true, data, renderStyle)
    data.$themes = data.$themes.split(' ').map(function (item) {
        return data.$prefixClassName + '--' + item
    }).join(' ')

    var getQuery = function (query, link) {
        if (typeof query === 'object') {
            query = qs.stringify(query)
        }
        if (query === 'auto') {
            query = location.search
        }
        var query = qs.parse(query.replace(/^\?/, ''))
        extend(true, query, qs.parse(link.replace(/^\?/,'')))
        return '?' + qs.stringify(query)
    }

    data.$link = getQuery(userStyle.query, data.$link)

    var html = mustache.render(userStyle.template, data)
    // 去除空白符
    // http://blog.csdn.net/helloliuhai/article/details/50484758
    html = html.replace(/\>\s*\</g, '><')
    if (dom) {
        dom.innerHTML = html
        var targetAttr = 'data-paging-js-value'
        dom.addEventListener('input', function (e) {
            var filterNumber = /[^\d]/g
            if (e.target.getAttribute(targetAttr)) {
                if (filterNumber.test(e.target.value)) {
                    e.target.value = e.target.value.replace(filterNumber, '')

                }
            }
        }, true)
        dom.addEventListener('blur', function (e) {
            if (e.target.getAttribute(targetAttr)) {
                var value = parseFloat(e.target.value)
                if (parseInt(e.target.value) > data.pageCount) {
                    e.target.value = data.pageCount
                }
                if (e.target.value === '0') {
                    e.target.value = 1
                }
                if (e.target.value.trim() === '') {
                    e.target.value = data.page
                }
                else {
                    userStyle.onChange(
                        e.target.value,
                        data
                    )
                }
            }
        }, true)
    }
    return html
}
module.exports = renderPaging
