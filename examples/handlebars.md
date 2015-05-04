# handlebars & createData

---


## HTML


````iframe:180
<link rel="stylesheet" href="http://static.nimojs.com/umd/alice-paging/1.1.0/index.css">
<script src="http://static.nimojs.com/umd/jquery/1.11.2/jquery.min.js"></script>
<script src="http://static.nimojs.com/umd/paging/0.0.1/paging.js"></script>
<script src="http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-v3.0.0.js"></script>

<script id="template" type="text/template">
<table class="table">
    <tr>
        <td>name</td>
        <td>age</td>
    </tr>
{{#view}}
    <tr>
        <td>{{name}}</td>
        <td>{{age}}</td>
    </tr>
{{/view}}
</table>

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
        <a class="paging-item" href="{{../_link}}{{.}}">{{.}}</a>
        {{/_beforePages}}
        <a href="{{_link}}{{_currentPage}}" class="paging-item paging-current">{{_currentPage}}</a>
        {{#_afterPages}}
        <a class="paging-item" href="{{../_link}}{{.}}">{{.}}</a>
        {{/_afterPages}}
        {{#_hasAfterPages}}
        <span class="paging-ellipsis">...</span>
        {{/_hasAfterPages}}
        {{^_isLastPage}}
        <a href="{{_link}}{{_pageCount}}" class="paging-item">{{_pageCount}}</a>
        {{/_isLastPage}}
        <{{#_nextPage}}a{{/_nextPage}}{{^_nextPage}}span{{/_nextPage}} class="paging-next" href="{{_link}}{{_nextPage}}">
            下一页
        </{{#_nextPage}}a{{/_nextPage}}{{^_nextPage}}span{{/_nextPage}}>
        <span class="paging-info"><span class="paging-bold">{{_currentPage}}/{{_pageCount}}</span>页</span>
    </div>
{{/_hasPaging}}
</script>

<div id="view"></div>

<script>
var template = $('#template').html()
var data = {
  "view":[
    {
      "name": "nimo",
      "age": 23
    },
    {
      "name": "potato",
      "age": 18
    },
    {
      "name": "little nimo",
      "age": 3
    }
  ],
  "pagecount": 10
}

console.log(
$.extend(data, Paging.createData({
    currentPage: 3,
    pageCount: data.pagecount
}))
)
$('#view').html(
    Handlebars.compile(template)(data)
)
</script>

<style>
.table {
    margin-bottom: 1em;
}
.table td {
    border: 1px solid #DDD;
    padding: .2em;
}
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

````

**注意：**因为语法的差异在 Handlebars 中需将 

```html
{{#_beforePages}}
<a class="paging-item" href="{{_link}}{{.}}">{{.}}</a>
{{/_beforePages}}
<a href="{{_link}}{{_currentPage}}" class="paging-item paging-current">{{_currentPage}}</a>
{{#_afterPages}}
<a class="paging-item" href="{{_link}}{{.}}">{{.}}</a>
{{/_afterPages}}
```

改为 `{{_link}} => {{../link}}`

```html
{{#_beforePages}}
<a class="paging-item" href="{{../_link}}{{.}}">{{.}}</a>
{{/_beforePages}}
<a href="{{_link}}{{_currentPage}}" class="paging-item paging-current">{{_currentPage}}</a>
{{#_afterPages}}
<a class="paging-item" href="{{../_link}}{{.}}">{{.}}</a>
{{/_afterPages}}
```
