var paging = require('paging')
var mustache = require('mustache')
var data = paging.createData({
    page: 9,
    pageSize: 10,
    dataCount: 232
})
data.link = "/news?page="
var template = ''
+ '{{#hasPaging}}'
+ '    <div class="ui-paging">'

+ '        {{#dataCount}}共{{dataCount}}条数据{{/dataCount}}'

+ '        <{{#prevPage}}a{{/prevPage}}{{^prevPage}}span{{/prevPage}} class="ui-paging-prev" href="{{link}}{{prevPage}}">'
+ '            上一页'
+ '        </{{#prevPage}}a{{/prevPage}}{{^prevPage}}span{{/prevPage}}>'
+ '        {{^isFirstPage}}'
+ '        <a href="{{link}}1" class="ui-paging-item">1</a>'
+ '        {{/isFirstPage}}'
+ '        {{#prevHasMorePage}}'
+ '        <a class="ui-paging-ellipsis" href="{{link}}{{prevSomePage}}" >...</a>'
+ '        {{/prevHasMorePage}}'
+ '        {{#prevBatch}}'
+ '        <a class="ui-paging-item" href="{{link}}{{.}}">{{.}}</a>'
+ '        {{/prevBatch}}'
+ '        <a href="{{link}}{{page}}" class="ui-paging-item ui-paging-current">{{page}}</a>'
+ '        {{#nextBatch}}'
+ '        <a class="ui-paging-item" href="{{link}}{{.}}">{{.}}</a>'
+ '        {{/nextBatch}}'
+ '        {{#nextHasMorePage}}'
+ '        <a class="ui-paging-ellipsis" href="{{link}}{{nextSomePage}}" >...</a>'
+ '        {{/nextHasMorePage}}'
+ '        {{^isLastPage}}'
+ '        <a href="{{link}}{{pageCount}}" class="ui-paging-item">{{pageCount}}</a>'
+ '        {{/isLastPage}}'
+ '        <{{#nextPage}}a{{/nextPage}}{{^nextPage}}span{{/nextPage}} class="ui-paging-next" href="{{link}}{{nextPage}}">'
+ '            下一页'
+ '        </{{#nextPage}}a{{/nextPage}}{{^nextPage}}span{{/nextPage}}>'
+ '        <span class="ui-paging-info"><span class="ui-paging-bold">{{page}}/{{pageCount}}</span>页</span>'
+ '    </div>'
+ '{{/hasPaging}}'
document.getElementById('dataCountNode').innerHTML = mustache.render(template, data)
