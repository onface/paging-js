# Paging [![spm version](http://spmjs.io/badge/paging)](http://spmjs.io/package/paging)

---

<div id="online-tip">
<strong>
  请访问 <a href="http://spmjs.io/docs/paging/0.0.1/">在线文档: v0.0.1</a>
  或 <a href="http://spmjs.io/docs/paging/latest/">最新版本</a>
</strong>
<br><br>
<img src="https://cloud.githubusercontent.com/assets/3949015/7386863/150a781c-ee8b-11e4-91a3-ec686b565e50.gif" style="width:500px;" />
</div>

<script>
if (/^\/docs\/paging\//.test(location.pathname)) {
    document.getElementById('online-tip').style.display = 'none'
}
</script>

简单自由的分页生成器

## 浏览器中使用

````iframe:40
<link rel="stylesheet" href="http://static.nimojs.com/umd/alice-paging/1.1.0/index.css">
<script src="http://static.nimojs.com/umd/paging/0.0.1/paging.js"></script>

<div id="view"></div>

<script>
var html = Paging.render({
    // 当前页
    currentPage: 2,
    // 总页数
    pageCount: 10,
    // 链接前缀
    link: '?id='
})
document.getElementById('view').innerHTML = html
</script>
````
## bower

```html
$ bower install --save paging.js

<script type="text/javascript" src="./bower_components/paging.js/dist/paging.js"></script>
```

## seajs


````iframe:40
<link rel="stylesheet" href="http://static.nimojs.com/umd/alice-paging/1.1.0/index.css">
<script src="http://static.nimojs.com/umd/seajs/3.0.0/sea.js" id="seajsnode" ></script>

<div id="view"></div>

<script>
seajs.config({
    // 配置 alias 使用在线版本或下载 paging 和 mustache 存放在本地
    // 下载到本地使用时请注意 《ID 和路径匹配原则》https://github.com/seajs/seajs/issues/930
    alias: {
        "paging/0.0.1/paging": 'http://cmd.nimojs.com/cmd/paging/0.0.1/paging.js',
        "mustache/2.0.0/mustache": "http://cmd.nimojs.com/cmd/mustache/2.0.0/mustache.js"
    }
})
seajs.use('paging/0.0.1/paging' ,function (Paging) {
    var html = Paging.render({
        // 当前页
        currentPage: 1,
        // 总页数
        pageCount: 10,
        // 链接前缀
        link: '?id='
    })
    document.getElementById('view').innerHTML = html
})
</script>
````
## 基于 node/spm 开发

### 命令行安装

```
$ spm install paging --save
// 或者
$ npm install paging --save
```

### 使用

```js
var Paging = require('paging');
// use paging
```


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
        currentPage: i,
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