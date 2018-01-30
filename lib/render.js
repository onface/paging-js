var createData = require('./createData')
var mustache = require('mustache')
var extend = require('extend')
function renderPaging (settings, style) {
    var data = createData(settings)
    var defaultStyle = {
        themes: 'simple',
        link: '',
        mini: false,
        prefix: 'face-paging',
        prevText: '上一页',
        nextText: '下一页',
        dataTotalStartText: '共',
        dataTotalEndText: '条',
    }
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

    // 模板字符串
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings
    var template = `
    {{#hasPaging}}
        <div class="{{$prefix}} {{$themes}}">
            {{#dataTotal}}
            <span class="{{$prefix}}-dataTotal">
                {{$dataTotalStartText}}
                <span class="{{$prefix}}-dataTotal-value">
                    {{dataTotal}}
                </span>
                {{$dataTotalEndText}}
            </span>
            {{/dataTotal}}
            <{{#prevPage}}a{{/prevPage}}{{^prevPage}}span{{/prevPage}}
                class="{{$prefix}}-prev {{^prevPage}}{{$prefix}}-prev--disabled{{/prevPage}}"
                href="{{$link}}{{prevPage}}"
            >
                {{$prevText}}
            </{{#prevPage}}a{{/prevPage}}{{^prevPage}}span{{/prevPage}}>
            {{#$mini}}
                <span class="{{$prefix}}-mini">
                    <input type="text" class="{{$prefix}}-mini-value" value="{{page}}">
                    <span class="{{$prefix}}-mini-separate">/</span>
                    <span class="{{$prefix}}-mini-pagecount">{{pageCount}}</span>
                </span>
            {{/$mini}}

            {{^$mini}}
                {{^isFirstPage}}
                <a href="{{$link}}1" class="{{$prefix}}-item">1</a>
                {{/isFirstPage}}
                {{#prevHasMorePage}}
                <a href="{{$link}}{{prevSomePage}}" class="{{$prefix}}-more {{$prefix}}-more--prev">
                    <span class="{{$prefix}}-more-text">
                        ...
                    </span>
                    <span class="{{$prefix}}-more-icon">
                        <span class="fi fi-angle-double-left"></span>
                    </span>
                </a>
                {{/prevHasMorePage}}
                {{#prevBatch}}
                <a class="{{$prefix}}-item" href="{{$link}}{{.}}">{{.}}</a>
                {{/prevBatch}}
                <a href="{{$link}}{{page}}" class="{{$prefix}}-item {{$prefix}}-item--current">{{page}}</a>
                {{#nextBatch}}
                <a class="{{$prefix}}-item" href="{{$link}}{{.}}">{{.}}</a>
                {{/nextBatch}}
                {{#nextHasMorePage}}
                <a href="{{$link}}{{nextSomePage}}" class="{{$prefix}}-more {{$prefix}}-more--prev">
                    <span class="{{$prefix}}-more-text">
                        ...
                    </span>
                    <span class="{{$prefix}}-more-icon">
                        <span class="fi fi-angle-double-right"></span>
                    </span>
                </a>
                {{/nextHasMorePage}}
                {{^isLastPage}}
                <a href="{{$link}}{{pageCount}}" class="{{$prefix}}-item">{{pageCount}}</a>
                {{/isLastPage}}
            {{/$mini}}

            <{{#nextPage}}a{{/nextPage}}{{^nextPage}}span{{/nextPage}}
                class="{{$prefix}}-next {{^nextPage}}{{$prefix}}-next--disabled{{/nextPage}}"
                href="{{$link}}{{nextPage}}"
            >
                {{$nextText}}
            </{{#nextPage}}a{{/nextPage}}{{^nextPage}}span{{/nextPage}}>
        </div>
    {{/hasPaging}}
    `
    var html = mustache.render(template, data)
    // 去除空白符
    // http://blog.csdn.net/helloliuhai/article/details/50484758
    html = html.replace(/\>\s*\</g, '><')
    return html
}
module.exports = renderPaging
