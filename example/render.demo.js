var paging = require('paging')
var mustache = require('mustache')
var data = paging.createData({
    page: 9,
    pageSize: 10,
    pageCount: 20,
})
data.link = "/news?page="
var template = ''
+ '{{#hasPaging}}'
+ '    <div class="ui-paging">'
+ '        <{{#prevPage}}a{{/prevPage}}{{^prevPage}}span{{/prevPage}} class="ui-paging-prev" href="{{prevPage}}">'
+ '            上一页'
+ '        </{{#prevPage}}a{{/prevPage}}{{^prevPage}}span{{/prevPage}}>'
+ '        {{^isFirstPage}}'
+ '        <a href="1" class="ui-paging-item">1</a>'
+ '        {{/isFirstPage}}'
+ '        {{#prevHasMorePage}}'
+ '        <a class="ui-paging-ellipsis" href="{{prevSomePage}}" >...</a>'
+ '        {{/prevHasMorePage}}'
+ '        {{#prevBatch}}'
+ '        <a class="ui-paging-item" href="{{.}}">{{.}}</a>'
+ '        {{/prevBatch}}'
+ '        <a href="{{page}}" class="ui-paging-item ui-paging-current">{{page}}</a>'
+ '        {{#nextBatch}}'
+ '        <a class="ui-paging-item" href="{{.}}">{{.}}</a>'
+ '        {{/nextBatch}}'
+ '        {{#nextHasMorePage}}'
+ '        <a class="ui-paging-ellipsis" href="{{nextSomePage}}" >...</a>'
+ '        {{/nextHasMorePage}}'
+ '        {{^isLastPage}}'
+ '        <a href="{{pageCount}}" class="ui-paging-item">{{pageCount}}</a>'
+ '        {{/isLastPage}}'
+ '        <{{#nextPage}}a{{/nextPage}}{{^nextPage}}span{{/nextPage}} class="ui-paging-next" href="{{nextPage}}">'
+ '            下一页'
+ '        </{{#nextPage}}a{{/nextPage}}{{^nextPage}}span{{/nextPage}}>'
+ '        <span class="ui-paging-info"><span class="ui-paging-bold">{{page}}/{{pageCount}}</span>页</span>'
+ '    </div>'
+ '{{/hasPaging}}'
document.getElementById('renderNode').innerHTML = mustache.render(template, data)
