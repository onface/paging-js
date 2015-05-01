# API 说明

---


## render `.render(config)`
Paging 可根据 2 个关键信息渲染出完整的分页，分别是当前页码 `currentPage` 和 总页数 `pageCount`。（必填项）

```js
Paging.render({
    // 当前页码
    currentPage: 3,
    // 总页数
    pageCount: 10
})
```

---

`beforePageCount` 和 `afterPageCount` 控制前后几页显示数量。

[控制前后几页显示数量 - 示例](../examples/beforePageCount.md)

```js
Paging.render({
    currentPage: 5,
    pageCount: 10,
    // 前几页显示数量
    beforePageCount: 2,
    // 后几页显示数量
    afterPageCount: 1
})
```

---

`link` 控制链接 `href` 前缀

```js
Paging.render({
    currentPage: 5,
    pageCount: 10,
    link: '?id='
})
```
```html
<a class="ui-paging-prev" href="?id=4">上一页</a>
<a href="?id=1" class="ui-paging-item">1</a>
<a href="?id=2" class="ui-paging-item">2</a>
```

---

`template` 模板

[基于模板生成HTML](template.md)

## mustache 

Paging.mustache 就是 [mustache.js](https://github.com/janl/mustache.js)

## defaultTemplate

template 的默认值

```js
Paging.defaultTemplate = '{{#_hasPaging}} ... {{/_hasPaging}}'
```

## createData `.createData(config)`

根据 `cureentPage` 和 `pageCount` 返回渲染数据源

```js
Paging.createData({
    currentPage: 3,
    pageCount: 10
})
/*
{
    "_hasPaging": true,
    "_pageCount": 10,
    "_currentPage": 3,
    "_isFirstPage": false,
    "_isLastPage": false,
    "_beforePages": [
        2
    ],
    "_hasBeforePages": false,
    "_afterPages": [
        4,
        5,
        6
    ],
    "_hasAfterPages": true,
    "_prevPage": 2,
    "_nextPage": 4,
    "_link": "?id=1"
}
*/
```

你可以利用 createData 返回的渲染数据源结合其他模板引擎渲染数据。例如使用 handlebars。