var createData = require('./createData')
var mustache = require('mustache')
var extend = require('extend')
var template = require('./template')()
var qs = require('qs')
function renderPaging (settings, style, dom) {
    var data = createData(settings)

    var defaultStyle = require('./renderStyleDefault.js')()
    var cloneStyle = extend(true, defaultStyle ,style)
    var newStyle = {

    }
    Object.keys(cloneStyle).map(function (key){
        newStyle['$' + key] = cloneStyle[key]
    })
    extend(true, data, newStyle)
    data.$themes = data.$themes.split(' ').map(function (item) {
        return data.$prefix + '--' + item
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

    data.$link = getQuery(cloneStyle.query, data.$link)

    // 模板字符串
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings
    var html = mustache.render(template, data)
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
                cloneStyle.onChange(
                    e.target.value,
                    data
                )
            }
        }, true)
    }
    else {
        return html
    }
}
module.exports = renderPaging
