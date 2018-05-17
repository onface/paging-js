/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/paging-js/0.5.0";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./doc/createData.demo.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var paging = __webpack_require__("./lib/index.js");
var jsonFormat = __webpack_require__("./node_modules/json-format/index.js");
document.getElementById('dataNode').innerHTML = jsonFormat(paging.createData({
    page: 1,
    pageCount: 20
}));

/***/ }),

/***/ "./lib/createData.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__("./node_modules/prop-types-0.2.0/lib/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _extend = __webpack_require__("./node_modules/extend/index.js");

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = __webpack_require__("./lib/props.js").createData;
var createData = function createData(settings) {
    _propTypes2.default.validate(props.propTypes, settings, 'paging.createData');
    // 向前兼容
    if (typeof settings.dataCount !== 'undefined') {
        settings.dataTotal = settings.dataCount;
    }
    // object.assign
    settings = (0, _extend2.default)(true, {}, settings);
    settings = (0, _extend2.default)(true, props.defaultProps(), settings);
    for (var key in settings) {
        var item = settings[key];
        var num = Number(item);
        if (!isNaN(num)) {
            settings[key] = num;
        }
    }
    if (typeof settings.pageCount === 'undefined') {
        if (typeof settings.pageSize === 'undefined' || typeof settings.dataTotal === 'undefined') {
            throw new Error('settings: need pageCount or pageSize&dataTotal!');
        }
    }
    if (settings.page < 1) {
        settings.page = 1;
    }
    if (settings.pageCount < 1) {
        settings.pageCount = 1;
    }
    if (settings.dataTotal < 0) {
        settings.dataTotal = 0;
    }
    var output = {
        // {Bolean} 存在分页
        hasPaging: null,
        // {Number} 20 总页数
        pageCount: null,
        // {Number} 200 总数据量
        dataTotal: null,
        // {Number} 9 当前页
        page: null,
        // {Boolean} false 当前页是第一页
        isFirstPage: null,
        // {Boolean} false 当前页是最后一页
        isLastPage: null,
        // {Array,Boolean} [6,7,8] false 当前页前几页不存在前几页则为 false (根据 传入的 prevPages 扩展)
        prevBatch: null,
        // {Array,Boolean} [10,11,12] false 当前页后几页  不存在后几页则为 false (根据 传入的 prevPages 扩展)
        nextBatch: null,
        // {Number} 8 上一页
        prevPage: null,
        // {Number} 10 下一页
        nextPage: null,
        // {Boolean} true 除了 prevBatch 和 第一页还存在其他页
        prevHasMorePage: null,
        // {Boolean} true除了 nextBatch 和 最后一页还存在其他页
        nextHasMorePage: null,
        // {Number|Boolean} 4 当前页前 5 页 (根据 传入的 prevSomePage 决定是前几页)
        prevSomePage: null,
        // {Number|Boolean} 14 当前页后 5 页 (根据 传入的 nextSomePage 决定是前几页)
        nextSomePage: null,
        // {Number} 每页显示多少条数据
        pageSize: null
        // ## pageCount
        // 根据 dataTotal 和 pageSize 计算出 pageCount
    };if (!settings.pageCount) {
        settings.pageCount = Math.ceil(settings.dataTotal / settings.pageSize);
    } else {
        output.dataTotal = settings.dataTotal;
    }
    output.pageCount = settings.pageCount;

    // ## dataTotal
    output.dataTotal = settings.dataTotal || null;
    // ## pageSize
    output.pageSize = settings.pageSize || null;

    // ## hasPaging
    if (output.pageCount < 2) {
        output.hasPaging = false;
    } else {
        output.hasPaging = true;
    }
    // ## page
    // 当前页不会大于总页数
    if (settings.page > settings.pageCount) {
        output.page = settings.pageCount;
    } else {
        output.page = settings.page;
    }
    // ## isFirstPage
    output.isFirstPage = output.page === 1;
    // ## isLastPage
    output.isLastPage = output.page === output.pageCount;
    // ## prevBatch
    // 当前页前几页
    output.prevBatch = [];
    var i;
    for (i = 0; i < settings.prevBatch; i++) {
        var iPage = output.page - i - 1;

        /*
            只允许最小是 2
                只存在 [2,3]
                不存在 [1,2,3]
            1 是可以在模板中输出的
            例如模板是：
            <a href="page/?id=1" ></a>
            {{#each prevBatch}}
            <a href="page/?id={{this}}" ></a>
            {{/each}}
            渲染结果：
            <a href="page/?id=1" ></a>
            <a href="page/?id=2" ></a>
            <a href="page/?id=3" ></a>
            如果不需要 第一页就在模板中去掉
            <a href="page/?id=1" ></a>
        */
        if (iPage > 1) {
            output.prevBatch.unshift(iPage);
            // [4]
            // [3, 4]
            // [2, 3, 4]
        } else {
            // stop loop
            i = settings.prevBatch;
        }
    }

    // ## prevHasMorePage
    output.prevHasMorePage = output.page > 2 + settings.prevBatch;

    // ## nextBatch
    output.nextBatch = [];
    var i;
    for (i = 0; i < settings.nextBatch; i++) {
        var iPage = output.page + i + 1;
        if (iPage < output.pageCount) {
            output.nextBatch.push(iPage);
        } else {
            // stop loop
            i = settings.nextBatch;
        }
    }
    // ## nextHasMorePage
    output.nextHasMorePage = output.page < output.pageCount - settings.nextBatch - 1;
    // ## prevPage
    output.prevPage = output.page - 1;
    if (output.prevPage < 1) {
        output.prevPage = false;
    }
    // ## nextPage
    output.nextPage = output.page + 1;
    if (output.nextPage > output.pageCount) {
        output.nextPage = false;
    }
    // ## prevSomePage
    output.prevSomePage = output.page - settings.prevSomePage;
    if (output.prevSomePage < 1) {
        output.prevSomePage = 1;
    }
    // ## nextSomePage
    output.nextSomePage = output.page + settings.nextSomePage;
    if (output.nextSomePage > output.pageCount) {
        output.nextSomePage = output.pageCount;
    }

    return output;
};
exports.default = createData;

module.exports = createData;

/***/ }),

/***/ "./lib/createDataDefault.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
    return {
        /*
            required settings:
                Plan A:
                    page: 1,
                    pageCount: 11,
                Plan B:
                    page: 1,
                    pageSize: 10,
                    dataTotal: 110
        */
        prevBatch: 3,
        nextBatch: 3,
        prevSomePage: 5,
        nextSomePage: 5
    };
};

/***/ }),

/***/ "./lib/index.css":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/less-loader/index.js!./lib/index.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/addStyles.js")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/index.js!./index.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./lib/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var output = {
    createData: __webpack_require__("./lib/createData.js"),
    render: __webpack_require__("./lib/render.js"),
    template: __webpack_require__("./lib/template.js")
};
module.exports = output;
exports.default = output;

/***/ }),

/***/ "./lib/props.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _propTypes = __webpack_require__("./node_modules/prop-types-0.2.0/lib/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createData = {
    defaultProps: __webpack_require__("./lib/createDataDefault.js"),
    propTypes: {
        page: _propTypes2.default.number.isRequired,
        pageCount: _propTypes2.default.number,
        dataTotal: _propTypes2.default.number,
        pageSize: _propTypes2.default.number,
        prevBatch: _propTypes2.default.number,
        nextBatch: _propTypes2.default.number,
        prevSomePage: _propTypes2.default.number,
        nextSomePage: _propTypes2.default.number
    }
};
module.exports = {
    createData: createData
};

/***/ }),

/***/ "./lib/render.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var createData = __webpack_require__("./lib/createData.js");
var mustache = __webpack_require__("./node_modules/mustache/mustache.js");
var extend = __webpack_require__("./node_modules/extend/index.js");
var qs = __webpack_require__("./node_modules/qs/lib/index.js");
__webpack_require__("./lib/index.css");
function renderPaging(settings, style, dom) {
    var data = createData(settings);

    var defaultStyle = __webpack_require__("./lib/renderStyleDefault.js")();
    var userStyle = extend(true, defaultStyle, style);
    var renderStyle = {};
    Object.keys(userStyle).map(function (key) {
        renderStyle['$' + key] = userStyle[key];
    });
    extend(true, data, renderStyle);
    data.$themes = data.$themes.split(' ').map(function (item) {
        return data.$prefixClassName + '--' + item;
    }).join(' ');

    var getQuery = function getQuery(query, link) {
        if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object') {
            query = qs.stringify(query);
        }
        if (query === 'auto') {
            query = location.search;
        }
        var query = qs.parse(query.replace(/^\?/, ''));
        extend(true, query, qs.parse(link.replace(/^\?/, '')));
        return '?' + qs.stringify(query);
    };

    data.$link = getQuery(userStyle.query, data.$link);

    var html = mustache.render(userStyle.template, data);
    // 去除空白符
    // http://blog.csdn.net/helloliuhai/article/details/50484758
    html = html.replace(/\>\s*\</g, '><');
    if (dom) {
        dom.innerHTML = html;
        var targetAttr = 'data-paging-js-value';
        dom.addEventListener('input', function (e) {
            var filterNumber = /[^\d]/g;
            if (e.target.getAttribute(targetAttr)) {
                if (filterNumber.test(e.target.value)) {
                    e.target.value = e.target.value.replace(filterNumber, '');
                }
            }
        }, true);
        dom.addEventListener('blur', function (e) {
            if (e.target.getAttribute(targetAttr)) {
                var value = parseFloat(e.target.value);
                if (parseInt(e.target.value) > data.pageCount) {
                    e.target.value = data.pageCount;
                }
                if (e.target.value === '0') {
                    e.target.value = 1;
                }
                if (e.target.value.trim() === '') {
                    e.target.value = data.page;
                } else {
                    userStyle.onChange(e.target.value, data);
                }
            }
        }, true);
    }
    return html;
}
module.exports = renderPaging;

/***/ }),

/***/ "./lib/renderStyleDefault.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
    return {
        themes: 'simple',
        link: 'p=',
        // auto: location.search
        query: 'auto',
        mini: false,
        prefixClassName: 'face-paging',
        text: {
            prev: '上一页',
            next: '下一页',
            dataTotal: {
                before: '共',
                after: '条'
            },
            goto: {
                before: '前往',
                gotoAfterText: '页'
            }
        },
        goto: false,
        onChange: function onChange(page, data) {
            location.href = data.$link + page;
        },
        template: __webpack_require__("./lib/template.js")()
    };
};

/***/ }),

/***/ "./lib/template.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
    // 模板字符串
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings
    return "\n    {{#hasPaging}}\n        <div class=\"{{$prefixClassName}} {{$themes}}\">\n            {{#dataTotal}}\n            <span class=\"{{$prefixClassName}}-dataTotal\">\n                {{{$text.dataTotal.before}}}\n                <span class=\"{{$prefixClassName}}-dataTotal-value\">\n                    {{dataTotal}}\n                </span>\n                {{{$text.dataTotal.after}}}\n            </span>\n            {{/dataTotal}}\n            <{{#prevPage}}a{{/prevPage}}{{^prevPage}}span{{/prevPage}}\n                class=\"{{$prefixClassName}}-prev {{^prevPage}}{{$prefixClassName}}-prev--disabled{{/prevPage}}\"\n                href=\"{{$link}}{{prevPage}}\"\n            >\n                {{{$text.prev}}}\n            </{{#prevPage}}a{{/prevPage}}{{^prevPage}}span{{/prevPage}}>\n            {{#$mini}}\n                <span class=\"{{$prefixClassName}}-mini\">\n                    <input type=\"text\" data-paging-js-value=\"true\" class=\"{{$prefixClassName}}-mini-value\" value=\"{{page}}\">\n                    <span class=\"{{$prefixClassName}}-mini-separate\">/</span>\n                    <span class=\"{{$prefixClassName}}-mini-pagecount\">{{pageCount}}</span>\n                </span>\n            {{/$mini}}\n\n            {{^$mini}}\n                {{^isFirstPage}}\n                <a href=\"{{$link}}1\" class=\"{{$prefixClassName}}-item {{$prefixClassName}}-item--first-page\">1</a>\n                {{/isFirstPage}}\n                {{#prevHasMorePage}}\n                <a href=\"{{$link}}{{prevSomePage}}\" class=\"{{$prefixClassName}}-more {{$prefixClassName}}-more--prev\">\n                    <span class=\"{{$prefixClassName}}-more-text\">\n                        ...\n                    </span>\n                    <span class=\"{{$prefixClassName}}-more-icon\">\n                        <span class=\"fi fi-angle-double-left\"></span>\n                    </span>\n                </a>\n                {{/prevHasMorePage}}\n                {{#prevBatch}}\n                <a class=\"{{$prefixClassName}}-item\" href=\"{{$link}}{{.}}\">{{.}}</a>\n                {{/prevBatch}}\n                <a href=\"{{$link}}{{page}}\" class=\"{{$prefixClassName}}-item {{$prefixClassName}}-item--current\">{{page}}</a>\n                {{#nextBatch}}\n                <a class=\"{{$prefixClassName}}-item\" href=\"{{$link}}{{.}}\">{{.}}</a>\n                {{/nextBatch}}\n                {{#nextHasMorePage}}\n                <a href=\"{{$link}}{{nextSomePage}}\" class=\"{{$prefixClassName}}-more {{$prefixClassName}}-more--prev\">\n                    <span class=\"{{$prefixClassName}}-more-text\">\n                        ...\n                    </span>\n                    <span class=\"{{$prefixClassName}}-more-icon\">\n                        <span class=\"fi fi-angle-double-right\"></span>\n                    </span>\n                </a>\n                {{/nextHasMorePage}}\n                {{^isLastPage}}\n                <a href=\"{{$link}}{{pageCount}}\" class=\"{{$prefixClassName}}-item {{$prefixClassName}}-item--last-page\">{{pageCount}}</a>\n                {{/isLastPage}}\n            {{/$mini}}\n\n            <{{#nextPage}}a{{/nextPage}}{{^nextPage}}span{{/nextPage}}\n                class=\"{{$prefixClassName}}-next {{^nextPage}}{{$prefixClassName}}-next--disabled{{/nextPage}}\"\n                href=\"{{$link}}{{nextPage}}\"\n            >\n                {{{$text.next}}}\n            </{{#nextPage}}a{{/nextPage}}{{^nextPage}}span{{/nextPage}}>\n            {{#$goto}}\n                <span class=\"{{$prefixClassName}}-goto\">\n                    {{{$text.goto.before}}}\n                    <input type=\"text\" data-paging-js-value=\"true\" value=\"{{page}}\" class=\"{{$prefixClassName}}-goto-value\" >\n                    {{{$text.goto.after}}}\n                </span>\n            {{/$goto}}\n        </div>\n    {{/hasPaging}}\n    ";
};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/less-loader/index.js!./lib/index.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, ".face-paging {\n  text-align: center;\n  color: rgba(0, 0, 0, 0.55);\n  line-height: 1.8;\n}\n.face-paging a:hover {\n  text-decoration: none;\n}\n.face-paging--ghost .face-paging-item,\n.face-paging--ghost .face-paging-prev,\n.face-paging--ghost .face-paging-next,\n.face-paging--ghost .face-paging-more {\n  background-color: white;\n  border: 1px solid #d9d9d9;\n  border-radius: .3em;\n  padding-left: .3em;\n  padding-right: .3em;\n  min-width: 1.2em;\n  display: inline-block;\n  color: rgba(0, 0, 0, 0.55);\n  text-decoration: none;\n  margin-left: .2em;\n  margin-right: .2em;\n}\n.face-paging--ghost .face-paging-item:hover,\n.face-paging--ghost .face-paging-prev:hover,\n.face-paging--ghost .face-paging-next:hover,\n.face-paging--ghost .face-paging-more:hover {\n  color: #4387fd;\n  border-color: #4387fd;\n}\n.face-paging--ghost .face-paging-item--current {\n  color: #4387fd;\n  border-color: #4387fd;\n}\n.face-paging--ghost .face-paging-dataTotal {\n  font-size: 0.91em;\n}\n.face-paging--ghost .face-paging-goto {\n  font-size: 0.91em;\n}\n.face-paging--ghost .face-paging-goto-value {\n  border: 1px solid #d9d9d9;\n  border-radius: .3em;\n  line-height: 1.8;\n  padding-left: .3em;\n  padding-right: .3em;\n  min-width: 1.2em;\n}\n.face-paging--ghost .face-paging-next--disabled:hover,\n.face-paging--ghost .face-paging-prev--disabled:hover {\n  border-color: #d9d9d9;\n  color: rgba(0, 0, 0, 0.55);\n}\n.face-paging--solid .face-paging-item,\n.face-paging--solid .face-paging-prev,\n.face-paging--solid .face-paging-next,\n.face-paging--solid .face-paging-more {\n  background-color: white;\n  border: 1px solid transparent;\n  border-radius: .3em;\n  padding-left: .3em;\n  padding-right: .3em;\n  min-width: 1.2em;\n  display: inline-block;\n  color: rgba(0, 0, 0, 0.55);\n  text-decoration: none;\n  background-color: #f7f7f7;\n  margin-left: .2em;\n  margin-right: .2em;\n}\n.face-paging--solid .face-paging-item:hover,\n.face-paging--solid .face-paging-prev:hover,\n.face-paging--solid .face-paging-next:hover,\n.face-paging--solid .face-paging-more:hover {\n  background-color: #4387fd;\n  color: white;\n  transition: none;\n}\n.face-paging--solid .face-paging-item--current {\n  background-color: #4387fd;\n  color: white;\n}\n.face-paging--solid .face-paging-dataTotal {\n  font-size: 0.91em;\n}\n.face-paging--solid .face-paging-goto {\n  font-size: 0.91em;\n}\n.face-paging--solid .face-paging-goto-value {\n  border: 1px solid #d9d9d9;\n  border-radius: .3em;\n  line-height: 1.8;\n  padding-left: .3em;\n  padding-right: .3em;\n  min-width: 1.2em;\n}\n.face-paging--solid .face-paging-next--disabled:hover,\n.face-paging--solid .face-paging-prev--disabled:hover {\n  background-color: #f7f7f7;\n  color: rgba(0, 0, 0, 0.55);\n}\n.face-paging--simple .face-paging-item,\n.face-paging--simple .face-paging-prev,\n.face-paging--simple .face-paging-next,\n.face-paging--simple .face-paging-more {\n  display: inline-block;\n  color: rgba(0, 0, 0, 0.55);\n  text-decoration: none;\n}\n.face-paging--simple .face-paging-item:hover,\n.face-paging--simple .face-paging-prev:hover,\n.face-paging--simple .face-paging-next:hover,\n.face-paging--simple .face-paging-more:hover {\n  color: #4387fd;\n}\n.face-paging--simple .face-paging-item--current {\n  color: #4387fd;\n}\n.face-paging--simple-mini .face-paging-next,\n.face-paging--simple-mini .face-paging-prev {\n  font-size: 1.2em;\n}\n.face-paging-mini {\n  padding-left: .5em;\n  padding-right: .5em;\n}\nhtml .face-paging-mini-value {\n  width: 2em;\n  line-height: 1;\n}\n.face-paging-mini-separate {\n  padding-left: .3em;\n  padding-right: .3em;\n}\n.face-paging--group .face-paging-item,\n.face-paging--group .face-paging-prev,\n.face-paging--group .face-paging-next,\n.face-paging--group .face-paging-more {\n  background-color: white;\n  position: relative;\n  border: 1px solid #d9d9d9;\n  margin-left: -1px;\n  padding-left: .3em;\n  padding-right: .3em;\n  min-width: 1.2em;\n  display: inline-block;\n  color: rgba(0, 0, 0, 0.55);\n  text-decoration: none;\n}\n.face-paging--group .face-paging-item:hover,\n.face-paging--group .face-paging-prev:hover,\n.face-paging--group .face-paging-next:hover,\n.face-paging--group .face-paging-more:hover {\n  z-index: 2;\n  color: #4387fd;\n  border-color: #4387fd;\n}\n.face-paging--group .face-paging-prev {\n  border-top-left-radius: .3em;\n  border-bottom-left-radius: .3em;\n}\n.face-paging--group .face-paging-next {\n  border-top-right-radius: .3em;\n  border-bottom-right-radius: .3em;\n}\n.face-paging--group .face-paging-item--current {\n  z-index: 2;\n  color: #4387fd;\n  border-color: #4387fd;\n}\n.face-paging--group .face-paging-dataTotal {\n  font-size: 0.91em;\n}\n.face-paging--group .face-paging-goto {\n  font-size: 0.91em;\n}\n.face-paging--group .face-paging-goto-value {\n  border: 1px solid #d9d9d9;\n  border-radius: .3em;\n  padding-left: .3em;\n  padding-right: .3em;\n  min-width: 1.2em;\n}\n.face-paging--group .face-paging-next--disabled:hover,\n.face-paging--group .face-paging-prev--disabled:hover {\n  border-color: #d9d9d9;\n  color: rgba(0, 0, 0, 0.55);\n}\n.face-paging--group-solid .face-paging-item,\n.face-paging--group-solid .face-paging-prev,\n.face-paging--group-solid .face-paging-next,\n.face-paging--group-solid .face-paging-more {\n  background-color: white;\n}\n.face-paging--group-solid .face-paging-item--current {\n  background-color: #4387fd;\n  color: white;\n}\n.face-paging--full .face-paging-dataTotal {\n  float: left;\n}\n.face-paging--full .face-paging-goto {\n  float: right;\n}\n.face-paging--full .face-paging-item,\n.face-paging--full .face-paging-prev,\n.face-paging--full .face-paging-next,\n.face-paging--full .face-paging-more {\n  background-color: white;\n  position: relative;\n  border: 1px solid #d9d9d9;\n  margin-left: -1px;\n  padding-left: .3em;\n  padding-right: .3em;\n  min-width: 1.2em;\n  display: inline-block;\n  color: rgba(0, 0, 0, 0.55);\n  text-decoration: none;\n  margin-right: .15em;\n  margin-left: .15em;\n}\n.face-paging--full .face-paging-item:hover,\n.face-paging--full .face-paging-prev:hover,\n.face-paging--full .face-paging-next:hover,\n.face-paging--full .face-paging-more:hover {\n  z-index: 2;\n  color: #4387fd;\n  border-color: #4387fd;\n}\n.face-paging--full .face-paging-item--current {\n  background-color: #4387fd;\n  border-color: #4387fd;\n  color: white;\n}\n.face-paging--full .face-paging-goto-submit,\n.face-paging--full .face-paging-goto-value {\n  border-radius: 0;\n}\n.face-paging--full .face-paging-goto-value {\n  margin-right: .1em;\n}\n.face-paging-dataTotal {\n  color: #666;\n  padding-right: 1em;\n  padding-left: 1em;\n}\n.face-paging-goto {\n  display: inline-block;\n  padding-left: 1em;\n  padding-right: 1em;\n}\n.face-paging-goto-submit {\n  color: inherit;\n  line-height: inherit;\n  padding: 0;\n}\n.face-paging-goto-submit:focus {\n  outline: none;\n  border-color: #4a99f3;\n  box-shadow: 0 0 0 0.125em rgba(98, 164, 239, 0.3);\n}\n.face-paging-mini-value,\n.face-paging-goto-value {\n  padding: 0;\n  box-sizing: border-box;\n  text-align: center;\n  display: inline-block;\n  border: 1px solid #d9d9d9;\n  border-radius: .3em;\n  line-height: inherit;\n  width: 2.4em;\n  padding-left: .3em;\n  padding-right: .3em;\n  color: rgba(0, 0, 0, 0.55);\n}\n.face-paging-mini-value:focus,\n.face-paging-goto-value:focus {\n  outline: none;\n  border-color: #4a99f3;\n  box-shadow: 0 0 0 0.125em rgba(98, 164, 239, 0.3);\n}\n.face-paging-item,\n.face-paging-more {\n  min-width: 2em;\n}\n.face-paging-prev,\n.face-paging-next {\n  min-width: 1em;\n}\n.face-paging--prev-disabled .face-paging-prev {\n  cursor: not-allowed;\n}\n.face-paging--prev-disabled .face-paging-prev,\n.face-paging--prev-disabled .face-paging-prev:hover {\n  color: rgba(0, 0, 0, 0.25);\n}\n.face-paging--next-disabled .face-paging-next {\n  cursor: not-allowed;\n}\n.face-paging--next-disabled .face-paging-next,\n.face-paging--next-disabled .face-paging-next:hover {\n  color: rgba(0, 0, 0, 0.25);\n}\n.face-paging-prev-icon,\n.face-paging-next-icon {\n  transform: scale(0.6);\n}\n.face-paging-more {\n  min-width: 1em;\n}\n.face-paging-more:hover .face-paging-more-icon {\n  display: block;\n}\n.face-paging-more:hover .face-paging-more-text {\n  display: none;\n}\n.face-paging-more-text {\n  vertical-align: top;\n  position: relative;\n  top: -0.25em;\n}\n.face-paging-more-icon {\n  display: none;\n}\n.face-paging-goto-submit {\n  border: 1px solid #d9d9d9;\n  background-color: white;\n  border-radius: .3em;\n  padding-left: .3em;\n  padding-right: .3em;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ "./node_modules/extend/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


/***/ }),

/***/ "./node_modules/json-format/index.js":
/***/ (function(module, exports) {

/*
  change for npm modules.
  by Luiz Estácio.

  json-format v.1.1
  http://github.com/phoboslab/json-format

  Released under MIT license:
  http://www.opensource.org/licenses/mit-license.php
*/
var p = [],
  indentConfig = {
    tab: { char: '\t', size: 1 },
    space: { char: ' ', size: 4 }
  },
  configDefault = {
    type: 'tab'
  },
  push = function( m ) { return '\\' + p.push( m ) + '\\'; },
  pop = function( m, i ) { return p[i-1] },
  tabs = function( count, indentType) { return new Array( count + 1 ).join( indentType ); };

function JSONFormat ( json, indentType ) {
  p = [];
  var out = "",
      indent = 0;

  // Extract backslashes and strings
  json = json
    .replace( /\\./g, push )
    .replace( /(".*?"|'.*?')/g, push )
    .replace( /\s+/, '' );    

  // Indent and insert newlines
  for( var i = 0; i < json.length; i++ ) {
    var c = json.charAt(i);

    switch(c) {
      case '{':
      case '[':
        out += c + "\n" + tabs(++indent, indentType);
        break;
      case '}':
      case ']':
        out += "\n" + tabs(--indent, indentType) + c;
        break;
      case ',':
        out += ",\n" + tabs(indent, indentType);
        break;
      case ':':
        out += ": ";
        break;
      default:
        out += c;
        break;      
    }         
  }

  // Strip whitespace from numeric arrays and put backslashes 
  // and strings back in
  out = out
    .replace( /\[[\d,\s]+?\]/g, function(m){ return m.replace(/\s/g,''); } )
    .replace( /\\(\d+)\\/g, pop ) // strings
    .replace( /\\(\d+)\\/g, pop ); // backslashes in strings

  return out;
};

module.exports = function(json, config){
  config = config || configDefault;
  var indent = indentConfig[config.type];

  if ( indent == null ) {
    throw new Error('Unrecognized indent type: "' + config.type + '"');
  }
  var indentType = new Array((config.size || indent.size) + 1).join(indent.char);
  return JSONFormat(JSON.stringify(json), indentType);
}


/***/ }),

/***/ "./node_modules/mustache/mustache.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false Mustache: true*/

(function defineMustache (global, factory) {
  if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
    factory(exports); // CommonJS
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
  } else {
    global.Mustache = {};
    factory(global.Mustache); // script, wsh, asp
  }
}(this, function mustacheFactory (mustache) {

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill (object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction (object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr (obj) {
    return isArray(obj) ? 'array' : typeof obj;
  }

  function escapeRegExp (string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty (obj, propName) {
    return obj != null && typeof obj === 'object' && (propName in obj);
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;
  function testRegExp (re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace (string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate (template, tags) {
    if (!template)
      return [];

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace () {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags (tagsToCompile) {
      if (typeof tagsToCompile === 'string')
        tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n')
            stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens (tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens (tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner (string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos () {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil (re) {
    var index = this.tail.search(re), match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context (view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup (name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, names, index, lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           **/
          while (value != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = hasProperty(value, names[index]);

            value = value[names[index++]];
          }
        } else {
          value = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit)
          break;

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer () {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null)
      tokens = cache[template] = parseTemplate(template, tags);

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function render (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
      else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
      else if (symbol === '&') value = this.unescapedValue(token, context);
      else if (symbol === 'name') value = this.escapedValue(token, context);
      else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined)
        buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender (template) {
      return self.render(template, context, partials);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
      }
    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate);
  };

  Writer.prototype.renderPartial = function renderPartial (token, context, partials) {
    if (!partials) return;

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null)
      return this.renderTokens(this.parse(value), context, partials, value);
  };

  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };

  Writer.prototype.escapedValue = function escapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return mustache.escape(value);
  };

  Writer.prototype.rawValue = function rawValue (token) {
    return token[1];
  };

  mustache.name = 'mustache.js';
  mustache.version = '2.3.0';
  mustache.tags = [ '{{', '}}' ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function render (template, view, partials) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' +
                          'but "' + typeStr(template) + '" was given as the first ' +
                          'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.,
  /*eslint-disable */ // eslint wants camel cased function name
  mustache.to_html = function to_html (template, view, partials, send) {
    /*eslint-enable*/

    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

  return mustache;
}));


/***/ }),

/***/ "./node_modules/prop-types-0.2.0/lib/index.js":
/***/ (function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var PropTypes = _interopRequire(__webpack_require__(1));

	var validate = _interopRequire(__webpack_require__(2));

	var validateWithErrors = _interopRequire(__webpack_require__(3));

	var assign = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];
	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }
	  return target;
	};

	module.exports = assign({}, PropTypes, { validate: validate, validateWithErrors: validateWithErrors });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	function nullFunction() {
	  return null;
	}

	var ANONYMOUS = "<<anonymous>>";

	// Equivalent of `typeof` but with special handling for array and regexp.
	function getPropType(propValue) {
	  var propType = typeof propValue;
	  if (Array.isArray(propValue)) {
	    return "array";
	  }
	  if (propValue instanceof RegExp) {
	    // Old webkits (at least until Android 4.0) return 'function' rather than
	    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	    // passes PropTypes.object.
	    return "object";
	  }
	  return propType;
	}

	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, descriptiveName, location) {
	    descriptiveName = descriptiveName || ANONYMOUS;
	    if (props[propName] == null) {
	      var locationName = location;
	      if (isRequired) {
	        return new Error("Required " + locationName + " `" + propName + "` was not specified in " + ("`" + descriptiveName + "`."));
	      }
	      return null;
	    } else {
	      return validate(props, propName, descriptiveName, location);
	    }
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

	function createPrimitiveTypeChecker(expectedType) {
	  function validate(props, propName, descriptiveName, location) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== expectedType) {
	      var locationName = location;
	      // `propValue` being instance of, say, date/regexp, pass the 'object'
	      // check, but we can offer a more precise error message here rather than
	      // 'of type `object`'.
	      var preciseType = getPreciseType(propValue);

	      return new Error("Invalid " + locationName + " `" + propName + "` of type `" + preciseType + "` " + ("supplied to `" + descriptiveName + "`, expected `" + expectedType + "`."));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createAnyTypeChecker() {
	  return createChainableTypeChecker(nullFunction);
	}

	function createArrayOfTypeChecker(typeChecker) {
	  function validate(props, propName, descriptiveName, location) {
	    var propValue = props[propName];
	    if (!Array.isArray(propValue)) {
	      var locationName = location;
	      var propType = getPropType(propValue);
	      return new Error("Invalid " + locationName + " `" + propName + "` of type " + ("`" + propType + "` supplied to `" + descriptiveName + "`, expected an array."));
	    }
	    for (var i = 0; i < propValue.length; i++) {
	      var error = typeChecker(propValue, i, descriptiveName, location);
	      if (error instanceof Error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createInstanceTypeChecker(expectedClass) {
	  function validate(props, propName, descriptiveName, location) {
	    if (!(props[propName] instanceof expectedClass)) {
	      var locationName = location;
	      var expectedClassName = expectedClass.name || ANONYMOUS;
	      return new Error("Invalid " + locationName + " `" + propName + "` supplied to " + ("`" + descriptiveName + "`, expected instance of `" + expectedClassName + "`."));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createEnumTypeChecker(expectedValues) {
	  function validate(props, propName, descriptiveName, location) {
	    var propValue = props[propName];
	    for (var i = 0; i < expectedValues.length; i++) {
	      if (propValue === expectedValues[i]) {
	        return null;
	      }
	    }

	    var locationName = location;
	    var valuesString = JSON.stringify(expectedValues);
	    return new Error("Invalid " + locationName + " `" + propName + "` of value `" + propValue + "` " + ("supplied to `" + descriptiveName + "`, expected one of " + valuesString + "."));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createObjectOfTypeChecker(typeChecker) {
	  function validate(props, propName, descriptiveName, location) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== "object") {
	      var locationName = location;
	      return new Error("Invalid " + locationName + " `" + propName + "` of type " + ("`" + propType + "` supplied to `" + descriptiveName + "`, expected an object."));
	    }
	    for (var key in propValue) {
	      if (propValue.hasOwnProperty(key)) {
	        var error = typeChecker(propValue, key, descriptiveName, location);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createUnionTypeChecker(arrayOfTypeCheckers) {
	  function validate(props, propName, descriptiveName, location) {
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (checker(props, propName, descriptiveName, location) == null) {
	        return null;
	      }
	    }

	    var locationName = location;
	    return new Error("Invalid " + locationName + " `" + propName + "` supplied to " + ("`" + descriptiveName + "`."));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createShapeTypeChecker(shapeTypes) {
	  function validate(props, propName, descriptiveName, location) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== "object") {
	      var locationName = location;
	      return new Error("Invalid " + locationName + " `" + propName + "` of type `" + propType + "` " + ("supplied to `" + descriptiveName + "`, expected `object`."));
	    }
	    for (var key in shapeTypes) {
	      var checker = shapeTypes[key];
	      if (!checker) {
	        continue;
	      }
	      var error = checker(propValue, key, descriptiveName, location);
	      if (error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	// This handles more types than `getPropType`. Only used for error messages.
	// See `createPrimitiveTypeChecker`.
	function getPreciseType(propValue) {
	  var propType = getPropType(propValue);
	  if (propType === "object") {
	    if (propValue instanceof Date) {
	      return "date";
	    } else if (propValue instanceof RegExp) {
	      return "regexp";
	    }
	  }
	  return propType;
	}

	module.exports = {
	  array: createPrimitiveTypeChecker("array"),
	  bool: createPrimitiveTypeChecker("boolean"),
	  func: createPrimitiveTypeChecker("function"),
	  number: createPrimitiveTypeChecker("number"),
	  object: createPrimitiveTypeChecker("object"),
	  string: createPrimitiveTypeChecker("string"),

	  any: createAnyTypeChecker(),
	  arrayOf: createArrayOfTypeChecker,
	  instanceOf: createInstanceTypeChecker,
	  objectOf: createObjectOfTypeChecker,
	  oneOf: createEnumTypeChecker,
	  oneOfType: createUnionTypeChecker,
	  shape: createShapeTypeChecker
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	var invariant = _interopRequire(__webpack_require__(5));

	var warning = _interopRequire(__webpack_require__(4));

	var loggedTypeFailures = {};

	var validate = function (propTypes, props, className) {
	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        // This is intentionally an invariant that gets caught. It's the same
	        // behavior as without this statement except with a better message.
	        invariant(typeof propTypes[propName] === "function", "%s: %s type `%s` is invalid; it must be a function, usually from " + "PropTypes.", className, "attributes", propName);

	        error = propTypes[propName](props, propName, className, "prop");
	      } catch (ex) {
	        error = ex;
	      }
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;
	        warning(false, "Failed propType: " + error.message);
	      }
	    }
	  }
	};

	module.exports = validate;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	var invariant = _interopRequire(__webpack_require__(5));

	var validateWithErrors = function (propTypes, props, className) {
	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        // This is intentionally an invariant that gets caught. It's the same
	        // behavior as without this statement except with a better message.
	        invariant(typeof propTypes[propName] === "function", "%s: %s type `%s` is invalid; it must be a function, usually from " + "PropTypes.", className, "attributes", propName);

	        error = propTypes[propName](props, propName, className, "prop");
	      } catch (ex) {
	        error = ex;
	      }
	      // rethrow the error
	      if (error instanceof Error) {
	        throw error;
	      }
	    }
	  }
	};

	module.exports = validateWithErrors;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	var warning = function (condition, format) {
	  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  if (format === undefined) {
	    throw new Error("`warning(condition, format, ...args)` requires a warning " + "message argument");
	  }

	  if (format.length < 10 || /^[s\W]*$/.test(format)) {
	    throw new Error("The warning format should be able to uniquely identify this " + "warning. Please, use a more descriptive format than: " + format);
	  }

	  if (!condition) {
	    var argIndex = 0;
	    var message = "Warning: " + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    console.warn(message);
	    try {
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  }
	};

	module.exports = warning;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * BSD License
	 *
	 * For Flux software
	 *
	 * Copyright (c) 2014, Facebook, Inc. All rights reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without modification,
	 * are permitted provided that the following conditions are met:
	 *
	 *  * Redistributions of source code must retain the above copyright notice, this
	 *    list of conditions and the following disclaimer.
	 *
	 *  * Redistributions in binary form must reproduce the above copyright notice,
	 *    this list of conditions and the following disclaimer in the
	 *    documentation and/or other materials provided with the distribution.
	 *
	 *  * Neither the name Facebook nor the names of its contributors may be used to
	 *    endorse or promote products derived from this software without specific
	 *    prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
	 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
	 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
	 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 *
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function (condition, format, a, b, c, d, e, f) {
	  // if (process.env.NODE_ENV !== 'production') {
	  //   if (format === undefined) {
	  //     throw new Error('invariant requires an error message argument');
	  //   }
	  // }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error("Minified exception occurred; use the non-minified dev environment " + "for the full error message and additional helpful warnings.");
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error("Invariant Violation: " + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

/***/ }
/******/ ]);

/***/ }),

/***/ "./node_modules/qs/lib/formats.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),

/***/ "./node_modules/qs/lib/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__("./node_modules/qs/lib/stringify.js");
var parse = __webpack_require__("./node_modules/qs/lib/parse.js");
var formats = __webpack_require__("./node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "./node_modules/qs/lib/parse.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("./node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]') {
            obj = [];
            obj = obj.concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("./node_modules/qs/lib/utils.js");
var formats = __webpack_require__("./node_modules/qs/lib/formats.js");

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "./node_modules/qs/lib/utils.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    var obj;

    while (queue.length) {
        var item = queue.pop();
        obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }

    return obj;
};

exports.arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function encode(str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

exports.compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    return compactQueue(queue);
};

exports.isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};


/***/ }),

/***/ "./node_modules/style-loader/addStyles.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./doc/createData.demo.js");


/***/ })

/******/ });