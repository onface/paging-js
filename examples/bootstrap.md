# bootstrap 分页

---


````iframe:100
<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css">
<script src="http://static.nimojs.com/umd/paging/0.0.1/paging.js"></script>

<script id="template" type="text/template">
{{#_hasPaging}}
    <nav>
      <ul class="pagination">
        <li class="{{^_prevPage}}disabled{{/_prevPage}}">
          <{{#_prevPage}}a{{/_prevPage}}{{^_prevPage}}span{{/_prevPage}} href="{{_link}}{{_prevPage}}" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </{{#_prevPage}}a{{/_prevPage}}{{^_prevPage}}span{{/_prevPage}}>
        </li>
        {{^_isFirstPage}}
        <li>
            <a href="{{_link}}1" class="paging-item">1</a>
        </li>
        {{/_isFirstPage}}
        {{#_hasBeforePages}}
        <li>
            <span>...</span>
        </li>
        {{/_hasBeforePages}}
        {{#_beforePages}}
        <li>
          <a href="{{_link}}{{.}}">{{.}}</a>
        </li>
        {{/_beforePages}}
        <li class="active"><a href="{{_link}}{{_currentPage}}">{{_currentPage}}</a></li>
        {{#_afterPages}}
        <li>
            <a href="{{_link}}{{.}}">{{.}}</a>
        </li>
        {{/_afterPages}}
        {{#_hasAfterPages}}
        <li>
            <span>...</span>
        </li>
        {{/_hasAfterPages}}
        {{^_isLastPage}}
        <li><a href="{{_link}}{{_pageCount}}">{{_pageCount}}</a></li>
        {{/_isLastPage}}
        <li class="{{^_nextPage}}disabled{{/_nextPage}}">
            <{{#_nextPage}}a{{/_nextPage}}{{^_nextPage}}span{{/_nextPage}} aria-label="Next" href="{{_link}}{{_nextPage}}">
                <span aria-hidden="true">&raquo;</span>
            </{{#_nextPage}}a{{/_nextPage}}{{^_nextPage}}span{{/_nextPage}}>
        </li>
      </ul>
    </nav>
{{/_hasPaging}}
</script>

<div id="view"></div>

<script>
var html = Paging.render({
    // 当前页
    currentPage: 1,
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
