# AJAX无刷新分页

---


## HTML


````iframe:180
<link rel="stylesheet" href="http://static.nimojs.com/umd/alice-paging/1.1.0/index.css">
<script src="http://static.nimojs.com/umd/jquery/1.11.2/jquery.min.js"></script>
<script src="http://static.nimojs.com/umd/paging/0.0.1/paging.js"></script>

<script id="listTemplate" type="text/template">
<table class="ui-table">
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
</script>
<div id="view"></div>
<input type="hidden" id="page" value="2">

<script>
var $view = $('#view')
var $listTemplate = $('#listTemplate')
// 重新
var goto = function (page) {
    $.ajax({
        url:'data.json',
        type: 'get',
        dataType: 'json'
    }).done(function (data) {

        // 模拟随机数据 S
        $.each(data.view, function () {
            this.name = this.name + '-' + new Date().getTime()
        })
        // 模拟随机数据 E

        var listhtml = Paging.mustache.render($listTemplate.html(), data)

        var paginghtml = Paging.render({
            currentPage: page,
            pageCount: data.pagecount,
            link:''
        })

        $view.html(
            listhtml + paginghtml
        )
    })
}
goto($('#page').val())

$view.on('click', 'a.ui-paging-item,a.ui-paging-next,a.ui-paging-prev', function () {
    var $this = $(this);
    var page = $this.attr('href')
    goto(page)
    return false
})
.on('click', '.ui-paging-goto', function () {
    var $this = $(this)
    var $input = $this.prev('.ui-paging-which').find('input')
    var value = $input.val()
    // 必须填入数字
    value = parseInt(value, 10)
    if (isNaN(value)) {
        value = 1
    }
    $input.val(value)
    goto(value)
})
</script>

<style>
.ui-table {
    margin-bottom: 1em;
}
.ui-table td {
    border: 1px solid #DDD;
    padding: .2em;
}
</style>
````


## [data.json](data.json)
```json
{
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
```
