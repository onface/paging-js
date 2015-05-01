# 自定义界面

---

````iframe:100
<script src="http://static.nimojs.com/umd/paging/0.0.1/paging.js"></script>

<script id="template" type="text/template">
{{#_hasPaging}}
    <div class="paging">
        <{{#_prevPage}}a{{/_prevPage}}{{^_prevPage}}span{{/_prevPage}} class="paging-prev" href="{{_link}}{{_prevPage}}">
            上一页
        </{{#_prevPage}}a{{/_prevPage}}{{^_prevPage}}span{{/_prevPage}}>
        {{^_isFirstPage}}
        <a href="{{_link}}1" class="paging-item">1</a>
        {{/_isFirstPage}}
        {{#_hasBeforePages}}
        <span class="paging-ellipsis">...</span>
        {{/_hasBeforePages}}
        {{#_beforePages}}
        <a class="paging-item" href="{{_link}}{{.}}">{{.}}</a>
        {{/_beforePages}}
        <a href="{{_link}}{{_currentPage}}" class="paging-item paging-current">{{_currentPage}}</a>
        {{#_afterPages}}
        <a class="paging-item" href="{{_link}}{{.}}">{{.}}</a>
        {{/_afterPages}}
        {{#_hasAfterPages}}
        <span class="paging-ellipsis">...</span>
        {{/_hasAfterPages}}
        {{^_isLastPage}}
        <a href="{{_link}}{{_pageCount}}" class="paging-item" >{{_pageCount}}</a>
        {{/_isLastPage}}
        <{{#_nextPage}}a{{/_nextPage}}{{^_nextPage}}span{{/_nextPage}} class="paging-next" href="{{_link}}{{_nextPage}}">
            下一页
        </{{#_nextPage}}a{{/_nextPage}}{{^_nextPage}}span{{/_nextPage}}>
        <span class="paging-info"><span class="paging-bold">{{_currentPage}}/{{_pageCount}}</span>页</span>
    </div>
{{/_hasPaging}}
</script>

<div id="view"></div>

<style class="nimo-show">
.paging{
    font-size: 12px;
}
.paging a {
    padding: .3em .5em;
    color: #6c97c2;
    text-decoration: none;
}
.paging-item,
.paging-prev,
.paging-next
{
    display: inline-block;*display: inline;_zoom:1;
    border: 1px solid #EEE;
    border-bottom-color: #CCC;
    border-radius: 3px;
    min-width: 20px;
    text-align: center;
}
.paging-prev,
.paging-next
{
    padding-left: .5em;
    padding-right: .5em;
}
.paging .paging-current{
    color:#333;
}
</style>

<script>
var html = Paging.render({
    // 当前页
    currentPage: 4,
    // 总页数
    pageCount: 10,
    // 链接前缀
    link: '#/page/',
    // 指定模板
    template: document.getElementById('template').innerHTML
})
document.getElementById('view').innerHTML = html
</script>
````