# <%= name %>

> <%= description %>


<!-- MARKRUN-HTML <div style="display:none;"  > -->

[🔗 Live demo](<%= homepage %>)  
[🕐 Releases](https://github.com/<%= __boot.owner %>/<%= __boot.repo %>/releases)

<!-- MARKRUN-HTML </div> -->

[![Build Status](https://api.travis-ci.org/<%= __boot.owner %>/<%= __boot.repo %>.svg)](https://travis-ci.org/<%= __boot.owner %>/<%= __boot.repo %>) [![NPM version](https://img.shields.io/npm/v/<%= name %>.svg?style=flat)](https://npmjs.org/package/<%= name %>) [![NPM downloads](http://img.shields.io/npm/dm/<%= name %>.svg?style=flat)](https://npmjs.org/package/<%= name %>)

<!-- MARKRUN-HTML <div style="display:none;"  > -->

🌀 [Example](./example/README.md) 🌀 [Doc](./doc/README.md) 🌀 [Test](./test/README.md)  

<!-- MARKRUN-HTML </div> -->

## 📦 Install

```shell
npm i <%= name %> --save
```

## 📄 Usage

````html
<div id="demo"></div>
````

````js
var Some = require('<%= name %>')
// Some(element, string)
Some(document.getElementById('demo'), 'abc')
````

<!--MARKRUN-HTML
<style>.gc-comments {font:12px/1.5 Lantinghei SC,Microsoft Yahei,Hiragino Sans GB,Microsoft Sans Serif,WenQuanYi Micro Hei,sans-serif}</style>
<script src="https://unpkg.com/github-comments@latest/gc.js"></script>
<div class="gc-comments" data-repos="<%= __boot.owner %>/<%= __boot.repo %>" data-issues="1" >
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
