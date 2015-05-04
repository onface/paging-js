# 控制前后几页显示数量

---

## 显示前2页与后1页

<link rel="stylesheet" href="http://static.nimojs.com/umd/alice-paging/1.1.0/index.css">
<script src="http://static.nimojs.com/umd/paging/0.0.1/paging.js"></script>

````iframe:40
<link rel="stylesheet" href="http://static.nimojs.com/umd/alice-paging/1.1.0/index.css">
<script src="http://static.nimojs.com/umd/paging/0.0.1/paging.js"></script>
<div id="view"></div>

<script>
var html = Paging.render({
    // 当前页
    currentPage: 5,
    // 总页数
    pageCount: 10,
    // 前几页显示数量
    beforePageCount: 2,
    // 后几页显示数量
    afterPageCount: 1,
    // 链接前缀
    link: '?id='
})
document.getElementById('view').innerHTML = html
</script>
````
