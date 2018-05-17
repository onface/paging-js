# 文档

`render` 用于渲染 DOM ，如果你用到是 `React` 请使用 [paging.react](http://onface.github.io/paging.react) 他们都是 [onface](http://github.com/onface) 的作品

> 如果你想完全自行封装，请使用 `paging.createData`


 **自定义样式：** 下载[lib/less](https://github.com/onface/paging-js/tree/master/lib/less) 中的文件，并在修改后加载自定义样式。并修改 `paging.render(pageData, style)` 中的 `style.prefixClassName`  比如： `{prefixClassName: 'my-paging'}`

## render

因为配置参数比较多，请根据界面效果，找到对应示例代码。

````code
{
    title: '渲染DOM',
    desc: 'paging.render([createDataSettings](../lib/createDataDefault.js), [styleSettings](../lib/renderStyleDefault.js), dom) 函数返回值是 渲染的HTML',
    html: '<div id="renderNode" ></div>',
    js: './basic.demo.js',
    source: './basic.demo.js',
    open: true
}
````



## createData


````code
{
    title: '获取渲染数据',
    desc: '渲染数据的作用请参考：[Paging solution](https://github.com/onface/paging)',
    html: '<pre id="dataNode" ></pre>',
    js: './createData.demo.js',
    source: './createData.demo.js',
    open: true
}
````

## template



````code
{
    title: '渲染模板',
    desc: '`paging.render()` 的渲染模板,一般情况下不需要修改，但是要完全自定义样式时候，可参考此模板修改。 **模板语法参考[mustache](https://github.com/janl/mustache.js#templates)**',
    html: '<div id="tempalteRenderNode" ></div><textarea id="templateNode" style="width:100%;height:16em;" ></textarea>',
    js: './template.demo.js',
    source: './template.demo.js',
    open: true
}
````

<script>
if (!/keyword/.test(location.search)) {
    history.replaceState({
        keyword: 'nimo',
        type: 'off'
        }, 'mock query', "?keyword=nimo&type=off" + location.hash)
}
</script>
