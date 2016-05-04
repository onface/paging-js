# Paging

---


简单自由的分页生成器

## 浏览器中使用

````iframe:40
<link rel="stylesheet" href="http://static.nimojs.com/umd/alice-paging/1.1.0/index.css">
<script src="http://static.nimojs.com/umd/paging/0.0.1/paging.js"></script>

<div id="view"></div>

<script>
var html = Paging.render({
    // 当前页
    page: 2,
    // 总页数
    pageCount: 10,
    // 链接前缀
    link: '?id='
})
document.getElementById('view').innerHTML = html
</script>
````

## 显示总页数为 10 的分页


````iframe:205
<link rel="stylesheet" href="http://static.nimojs.com/umd/alice-paging/1.1.0/index.css">
<script src="http://static.nimojs.com/umd/paging/0.0.1/paging.js"></script>
<div id="view1"></div><hr>
<div id="view2"></div><hr>
<div id="view3"></div><hr>
<div id="view4"></div><hr>
<div id="view5"></div><hr>
<div id="view6"></div><hr>
<div id="view7"></div><hr>
<div id="view8"></div><hr>
<div id="view9"></div><hr>
<div id="view10"></div>

<script>
for (var i = 1;i < 11; i++) {
    document.getElementById('view' + i).innerHTML = Paging.render({
        page: i,
        pageCount: 10,
        beforePageCount: 10,
        afterPageCount: 10,
        link: '#view'
    })    
}
</script>
````

## 更多示例

1. [自定义界面](examples/index.md)
2. [AJAX无刷新分页](examples/ajax.md)
3. [控制前后几页显示数量](examples/before-page-count.md)
4. [bootstrap 分页](examples/bootstrap.md)
5. [handlebars & createData](examples/handlebars.md)
