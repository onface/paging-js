# paging

> Paging generator,Completely custom style. 简单自由的分页生成器

 [![NPM version](https://img.shields.io/npm/v/paging.svg?style=flat)](https://npmjs.org/package/paging) [![NPM downloads](https://img.shields.io/npm/dt/paging.svg)](https://npmjs.org/package/paging)

<!-- MARKRUN-HTML <div style="display:none;"  > -->

[🔗 Live demo](https://paging.github.io/paging-js/)  
[🕐 Releases](https://github.com/paging/paging-js/releases)

🌀 [Example](./example/README.md) 🌀 [Doc](./doc/README.md) 🌀 [Test](./test/README.md)  

<!-- MARKRUN-HTML </div> -->

## 📦 Install

```shell
npm i paging --save
```

## 📄 Usage

````html
<div id="demo"></div>
````

````js
var paging = require('paging')
console.log(
    paging.createData({
        page: 1,
        pageCount: 10
    })
)
````

```js
{
    "hasPaging": false,
    "pageCount": 10,
    "dataCount": null,
    "page": 1,
    "isFirstPage": true,
    "isLastPage": false,
    "prevBatch": [],
    "nextBatch": [2,3,4],
    "prevPage": false,
    "nextPage": false,
    "prevHasMorePage": false,
    "nextHasMorePage": true,
    "prevSomePage": 1,
    "nextSomePage": 6,
    "pageSize": null
}
```

````js
var paging = require('paging')
console.log(
    paging.createData({
        page: 5,
        dataCount: 200,
        pageSize: 10
    })
)
````

```js
{
    "hasPaging": false,
    "pageCount": 20,
    "dataCount": 200,
    "page": 5,
    "isFirstPage": false,
    "isLastPage": false,
    "prevBatch": [2, 3, 4],
    "nextBatch": [6, 7, 8],
    "prevPage": 4,
    "nextPage": false,
    "prevHasMorePage": false,
    "nextHasMorePage": true,
    "prevSomePage": 1,
    "nextSomePage": 10,
    "pageSize": 10
}
```

<!--MARKRUN-HTML
<style>.gc-comments {font:12px/1.5 Lantinghei SC,Microsoft Yahei,Hiragino Sans GB,Microsoft Sans Serif,WenQuanYi Micro Hei,sans-serif}</style>
<script src="https://unpkg.com/github-comments@latest/gc.js"></script>
<div class="gc-comments" data-repos="paging/paging-js" data-issues="5" >
    <div class="gc-comments-title">
        Comments
    </div>
    <div class="gc-comments-info">
        Synchronous comments <a target="_blank" href="issues_link">issues_link</a>
    </div>
</div>
-->

## 🔨 development

```shell
npm i -g fis3 --registry=https://registry.npm.taobao.org
# Install dependencies | 安装依赖
npm run dep
    # > Suggested Use `yarn` replace `npm run dep` | 建议使用 `yarn` 替代 `npm run dep`
    # npm i -g yarn
    # npm run yi

# Server
npm run s

# Build
npm run dev


#  build document ./output | 构建 gh-pages 版本 到 output/
npm run gh
#  git push ./output branch:gh-pages | 将 output/** 发布到 gh-pages 分支
npm run gh-push
# build commonjs code ./output | 构建 npm 要发布的代码到 output/
npm run npm
cd ./output
npm publish
```

Build based on [fast-boot](https://github.com/fast-flow/boot#es6)

> For npm owner: npm publish Need to be in ./output
