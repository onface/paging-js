# 基于模板生成 HTML

---


Paging 是基于 [Mustache](https://github.com/janl/mustache.js) 模板引擎渲染生成 HTML 。通过编辑模板可以自由的控制生成的 HTML 结果。（[Mustache](https://github.com/janl/mustache.js) 语法模板）

请先理解 [mustache variables](https://github.com/janl/mustache.js#variables) 后继续阅读


````iframe:40
<link rel="stylesheet" href="http://static.nimojs.com/umd/alice-paging/1.1.0/index.css">
<script src="http://static.nimojs.com/umd/paging/0.0.1/paging.js"></script>

<div id="view-template"></div>

<script>
var template  = ''
+ '{{#_hasPaging}}'
+ '    <div class="ui-paging">'
+ '        <{{#_prevPage}}a{{/_prevPage}}{{^_prevPage}}span{{/_prevPage}} class="ui-paging-prev" href="{{_link}}{{_prevPage}}">'
+ '            <'
+ '        </{{#_prevPage}}a{{/_prevPage}}{{^_prevPage}}span{{/_prevPage}}>'
+ '        {{^_isFirstPage}}'
+ '        <a href="{{_link}}1" class="ui-paging-item">1</a>'
+ '        {{/_isFirstPage}}'
+ '        {{#_hasBeforePages}}'
+ '        <span class="ui-paging-ellipsis">...</span>'
+ '        {{/_hasBeforePages}}'
+ '        {{#_beforePages}}'
+ '        <a class="ui-paging-item" href="{{_link}}{{.}}">{{.}}</a>'
+ '        {{/_beforePages}}'
+ '        <a href="{{_link}}{{_currentPage}}" class="ui-paging-item ui-paging-current">{{_currentPage}}</a>'
+ '        {{#_afterPages}}'
+ '        <a class="ui-paging-item" href="{{_link}}{{.}}">{{.}}</a>'
+ '        {{/_afterPages}}'
+ '        {{#_hasAfterPages}}'
+ '        <span class="ui-paging-ellipsis">...</span>'
+ '        {{/_hasAfterPages}}'
+ '        {{^_isLastPage}}'
+ '        <a href="{{_link}}{{_pageCount}}" class="ui-paging-item">{{_pageCount}}</a>'
+ '        {{/_isLastPage}}'
+ '        <{{#_nextPage}}a{{/_nextPage}}{{^_nextPage}}span{{/_nextPage}} class="ui-paging-next" href="{{_link}}{{_nextPage}}">'
+ '            >'
+ '        </{{#_nextPage}}a{{/_nextPage}}{{^_nextPage}}span{{/_nextPage}}>'
+ '        <span class="ui-paging-info"><span class="ui-paging-bold">{{_currentPage}}/{{_pageCount}}</span>页</span>'
+ '        <span class="ui-paging-which"><input value="{{_currentPage}}" type="text"></span>'
+ '        <a class="ui-paging-info ui-paging-goto" href="{{_link}}{{_currentPage}}" >Go</a>'
+ '    </div>'
+ '{{/_hasPaging}}'

document.getElementById('view-template').innerHTML = Paging.render({
    // 当前页码
    currentPage: 3,
    // 总页数
    pageCount: 10,
    // 前几页显示数量
    beforePageCount: 3,
    // 后几页显示数量
    afterPageCount: 3,
    // 渲染模板字符串
    template: template
})
</script>
````

## 数据源解析

```js
// {Bolean} 存在分页
_hasPaging
// {Number} 总页数 10
_pageCount
// {Number} 当前页 5
_currentPage
// {Boolean} 当前页是第一页
_isFirstPage
// {Boolean} 当前页是最后一页
_isLastPage
// {Array} 当前页前几页 [2,3,4]
_beforePages
// {Boolean} 是否存在前几页
_hasBeforePages
// {Array} 当前页后几页 [6,7,8]
_afterPages
// {Boolean} 是否存在后几页
_hasAfterPages
// {Number|false} 上一页 4
_prevPage
// {Number|false} 下一页 6
_nextPage
// {String}链接前缀替换字符
_link
```