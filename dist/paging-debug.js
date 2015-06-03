/*! Paging 0.0.1 | http://spmjs.io/docs/paging/0.0.1/ */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["Paging"] = factory();
	else
		root["Paging"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	var Paging = {
	    render: function(){},
	    createData: function(){},
	    mustache: function(){},
	    defaultTemplate: '',
	    _correctSettings: function(){}
	}
	module.exports = Paging

	Paging.mustache = __webpack_require__(1)
	Paging._correctSettings = function (settings) {
	    var aCorrectParameters = ['currentPage', 'pageCount'],
	        i,
	        iSize = aCorrectParameters.length
	    for (i = 0;i < iSize; i++) {
	        var name = aCorrectParameters[i]
	        switch (typeof settings[name]) {
	            case 'string':
	            
	                settings[name] = parseInt(settings[name], 10)
	                if (isNaN(settings.currentPage)) {
	                    throw new Error('Paging settings.' + name + ' must be an Number type!')
	                }
	            break
	            case 'number':
	            break
	            default:
	            throw new Error('Paging settings.' + name + ' must be an Number type!')
	        }
	    }
	    if (settings.currentPage === 0) {
	        settings.currentPage = 1
	    }
	    return settings
	}
	Paging.createData = function (settings) {

	    var defaultSettings = {
	        beforePageCount: 3,
	        afterPageCount: 3,
	        link: '?id='
	    }

	    // extend
	    var name
	    for (name in settings) {
	        defaultSettings[name] = settings[name]
	    }
	    settings = defaultSettings
	    
	    settings = this._correctSettings(settings)
	    // output 输出
	        // {Bolean} 存在分页
	    var _hasPaging,
	        // {Number} 总页数 10
	        _pageCount,
	        // {Number} 当前页 5
	        _currentPage,
	        // {Boolean} 当前页是第一页
	        _isFirstPage,
	        // {Boolean} 当前页是最后一页
	        _isLastPage,
	        // {Array} 当前页前几页 [2,3,4]
	        _beforePages,
	        // {Boolean} 是否存在前几页
	        _hasBeforePages,
	        // {Array} 当前页后几页 [6,7,8]
	        _afterPages,
	        // {Boolean} 是否存在后几页
	        _hasAfterPages,
	        // {Number|false} 上一页 4
	        _prevPage,
	        // {Number|false} 下一页 6
	        _nextPage,
	        // {String}链接前缀替换字符
	        _link

	    // 总页数
	    _pageCount = settings.pageCount
	    
	    // 当前页
	    _currentPage = settings.currentPage
	    // 当前页不会大于总页数
	    if (_currentPage > _pageCount) {
	      _currentPage = _pageCount
	    }
	    
	    // 存在分页？
	    if (_pageCount < 2) {
	        _hasPaging = false
	    }
	    else {
	        _hasPaging = true
	    }

	    // 是第一页？
	    _isFirstPage = _currentPage === 1 ? true : false
	    // 是最后一页？
	    _isLastPage = _currentPage === _pageCount ? true : false

	    // 当前页前几页
	    _beforePages = []
	    var i;
	    for (i = 0;i < settings.beforePageCount;i++) {
	        var iPage = _currentPage - i - 1

	        /*
	            只允许最小是 2 
	                只存在 [2,3]
	                不存在 [1,2,3]
	            1 是可以在模板中输出的

	            例如模板是：
	            <a href="page/?id=1" ></a>
	            {{#each _beforePages}}
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
	            _beforePages.unshift(iPage)
	            // [4]
	            // [3, 4]
	            // [2, 3, 4]
	        }
	        else {
	            // stop loop
	            i = settings.beforePageCount
	        }
	    }
	    // 存在前几页？
	    if (_currentPage > 2 + settings.beforePageCount) {
	        _hasBeforePages = true
	    }
	    else {
	        _hasBeforePages = false
	    }

	    // 当前页后几页
	    _afterPages = [];
	    var i;
	    for (i = 0; i < settings.afterPageCount; i ++) {
	        var iPage = _currentPage + i + 1;
	        if (iPage < _pageCount) {
	            _afterPages.push(iPage)
	        }
	        else{
	            // stop loop
	            i = settings.afterPageCount
	        }
	    }
	    // 是否存在后几页?
	    if (_currentPage < _pageCount - settings.afterPageCount - 1) {
	        _hasAfterPages = true
	    }
	    else {
	        _hasAfterPages = false
	    }

	    // 上一页
	    _prevPage = _currentPage - 1
	    if (_prevPage < 1) {
	        _prevPage = false
	    }
	    // 下一页
	    _nextPage = _currentPage + 1
	    if (_nextPage > _pageCount) {
	        _nextPage = false
	    }
	    return {
	        _hasPaging: _hasPaging,
	        _pageCount: _pageCount,
	        _currentPage: _currentPage,
	        _isFirstPage: _isFirstPage,
	        _isLastPage: _isLastPage,
	        _beforePages: _beforePages,
	        _hasBeforePages: _hasBeforePages,
	        _afterPages: _afterPages,
	        _hasAfterPages: _hasAfterPages,
	        _prevPage: _prevPage,
	        _nextPage: _nextPage,
	        _link: settings.link
	    }
	}

	Paging.defaultTemplate = ''
	+ '{{#_hasPaging}}'
	+ '    <div class="ui-paging">'
	+ '        <{{#_prevPage}}a{{/_prevPage}}{{^_prevPage}}span{{/_prevPage}} class="ui-paging-prev" href="{{_link}}{{_prevPage}}">'
	+ '            上一页'
	+ '        </{{#_prevPage}}a{{/_prevPage}}{{^_prevPage}}span{{/_prevPage}}>'
	+ '        {{^_isFirstPage}}'
	+ '        <a href="{{_link}}1" class="ui-paging-item">1</a>'
	+ '        {{/_isFirstPage}}'
	+ '        {{#_hasBeforePages}}'
	+ '        <span class="ui-paging-ellipsis">...</span>'
	+ '        {{/_hasBeforePages}}'
	+ '        {{#_beforePages}}'
	+ '        <a class="ui-paging-item" href="{{_link}}{{.}}">{{.}}</a>'
	+ '        {{/_beforePages}}'
	+ '        <a href="{{_link}}{{_currentPage}}" class="ui-paging-item ui-paging-current">{{_currentPage}}</a>'
	+ '        {{#_afterPages}}'
	+ '        <a class="ui-paging-item" href="{{_link}}{{.}}">{{.}}</a>'
	+ '        {{/_afterPages}}'
	+ '        {{#_hasAfterPages}}'
	+ '        <span class="ui-paging-ellipsis">...</span>'
	+ '        {{/_hasAfterPages}}'
	+ '        {{^_isLastPage}}'
	+ '        <a href="{{_link}}{{_pageCount}}" class="ui-paging-item">{{_pageCount}}</a>'
	+ '        {{/_isLastPage}}'
	+ '        <{{#_nextPage}}a{{/_nextPage}}{{^_nextPage}}span{{/_nextPage}} class="ui-paging-next" href="{{_link}}{{_nextPage}}">'
	+ '            下一页'
	+ '        </{{#_nextPage}}a{{/_nextPage}}{{^_nextPage}}span{{/_nextPage}}>'
	+ '        <span class="ui-paging-info"><span class="ui-paging-bold">{{_currentPage}}/{{_pageCount}}</span>页</span>'
	+ '        <span class="ui-paging-which"><input value="{{_currentPage}}" type="text"></span>'
	+ '        <a class="ui-paging-info ui-paging-goto" href="{{_link}}{{_currentPage}}" >跳转</a>'
	+ '    </div>'
	+ '{{/_hasPaging}}'

	Paging.render = function (settings) {
	    settings.template = settings.template || this.defaultTemplate

	    var oPagingData = this.createData(settings)
	    return this.mustache.render(settings.template, oPagingData)
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * mustache.js - Logic-less {{mustache}} templates with JavaScript
	 * http://github.com/janl/mustache.js
	 */

	/*global define: false*/

	(function (global, factory) {
	  if (typeof exports === "object" && exports) {
	    factory(exports); // CommonJS
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
	  } else {
	    factory(global.Mustache = {}); // <script>
	  }
	}(this, function (mustache) {

	  var Object_toString = Object.prototype.toString;
	  var isArray = Array.isArray || function (object) {
	    return Object_toString.call(object) === '[object Array]';
	  };

	  function isFunction(object) {
	    return typeof object === 'function';
	  }

	  function escapeRegExp(string) {
	    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
	  }

	  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
	  // See https://github.com/janl/mustache.js/issues/189
	  var RegExp_test = RegExp.prototype.test;
	  function testRegExp(re, string) {
	    return RegExp_test.call(re, string);
	  }

	  var nonSpaceRe = /\S/;
	  function isWhitespace(string) {
	    return !testRegExp(nonSpaceRe, string);
	  }

	  var entityMap = {
	    "&": "&amp;",
	    "<": "&lt;",
	    ">": "&gt;",
	    '"': '&quot;',
	    "'": '&#39;',
	    "/": '&#x2F;'
	  };

	  function escapeHtml(string) {
	    return String(string).replace(/[&<>"'\/]/g, function (s) {
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
	  function parseTemplate(template, tags) {
	    if (!template)
	      return [];

	    var sections = [];     // Stack to hold section tokens
	    var tokens = [];       // Buffer to hold the tokens
	    var spaces = [];       // Indices of whitespace tokens on the current line
	    var hasTag = false;    // Is there a {{tag}} on the current line?
	    var nonSpace = false;  // Is there a non-space char on the current line?

	    // Strips all whitespace tokens array for the current line
	    // if there was a {{#tag}} on it and otherwise only space.
	    function stripSpace() {
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
	    function compileTags(tags) {
	      if (typeof tags === 'string')
	        tags = tags.split(spaceRe, 2);

	      if (!isArray(tags) || tags.length !== 2)
	        throw new Error('Invalid tags: ' + tags);

	      openingTagRe = new RegExp(escapeRegExp(tags[0]) + '\\s*');
	      closingTagRe = new RegExp('\\s*' + escapeRegExp(tags[1]));
	      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tags[1]));
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
	  function squashTokens(tokens) {
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
	  function nestTokens(tokens) {
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
	  function Scanner(string) {
	    this.string = string;
	    this.tail = string;
	    this.pos = 0;
	  }

	  /**
	   * Returns `true` if the tail is empty (end of string).
	   */
	  Scanner.prototype.eos = function () {
	    return this.tail === "";
	  };

	  /**
	   * Tries to match the given regular expression at the current position.
	   * Returns the matched text if it can match, the empty string otherwise.
	   */
	  Scanner.prototype.scan = function (re) {
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
	  Scanner.prototype.scanUntil = function (re) {
	    var index = this.tail.search(re), match;

	    switch (index) {
	    case -1:
	      match = this.tail;
	      this.tail = "";
	      break;
	    case 0:
	      match = "";
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
	  function Context(view, parentContext) {
	    this.view = view;
	    this.cache = { '.': this.view };
	    this.parent = parentContext;
	  }

	  /**
	   * Creates a new context using the given view with this context
	   * as the parent.
	   */
	  Context.prototype.push = function (view) {
	    return new Context(view, this);
	  };

	  /**
	   * Returns the value of the given name in this context, traversing
	   * up the context hierarchy if the value is absent in this context's view.
	   */
	  Context.prototype.lookup = function (name) {
	    var cache = this.cache;

	    var value;
	    if (name in cache) {
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
	            if (index === names.length - 1 && value != null)
	              lookupHit = (typeof value === 'object') &&
	                value.hasOwnProperty(names[index]);
	            value = value[names[index++]];
	          }
	        } else if (context.view != null && typeof context.view === 'object') {
	          value = context.view[name];
	          lookupHit = context.view.hasOwnProperty(name);
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
	  function Writer() {
	    this.cache = {};
	  }

	  /**
	   * Clears all cached templates in this writer.
	   */
	  Writer.prototype.clearCache = function () {
	    this.cache = {};
	  };

	  /**
	   * Parses and caches the given `template` and returns the array of tokens
	   * that is generated from the parse.
	   */
	  Writer.prototype.parse = function (template, tags) {
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
	  Writer.prototype.render = function (template, view, partials) {
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
	  Writer.prototype.renderTokens = function (tokens, context, partials, originalTemplate) {
	    var buffer = '';

	    var token, symbol, value;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      value = undefined;
	      token = tokens[i];
	      symbol = token[0];

	      if (symbol === '#') value = this._renderSection(token, context, partials, originalTemplate);
	      else if (symbol === '^') value = this._renderInverted(token, context, partials, originalTemplate);
	      else if (symbol === '>') value = this._renderPartial(token, context, partials, originalTemplate);
	      else if (symbol === '&') value = this._unescapedValue(token, context);
	      else if (symbol === 'name') value = this._escapedValue(token, context);
	      else if (symbol === 'text') value = this._rawValue(token);

	      if (value !== undefined)
	        buffer += value;
	    }

	    return buffer;
	  };

	  Writer.prototype._renderSection = function (token, context, partials, originalTemplate) {
	    var self = this;
	    var buffer = '';
	    var value = context.lookup(token[1]);

	    // This function is used to render an arbitrary template
	    // in the current context by higher-order sections.
	    function subRender(template) {
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

	  Writer.prototype._renderInverted = function(token, context, partials, originalTemplate) {
	    var value = context.lookup(token[1]);

	    // Use JavaScript's definition of falsy. Include empty arrays.
	    // See https://github.com/janl/mustache.js/issues/186
	    if (!value || (isArray(value) && value.length === 0))
	      return this.renderTokens(token[4], context, partials, originalTemplate);
	  };

	  Writer.prototype._renderPartial = function(token, context, partials) {
	    if (!partials) return;

	    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
	    if (value != null)
	      return this.renderTokens(this.parse(value), context, partials, value);
	  };

	  Writer.prototype._unescapedValue = function(token, context) {
	    var value = context.lookup(token[1]);
	    if (value != null)
	      return value;
	  };

	  Writer.prototype._escapedValue = function(token, context) {
	    var value = context.lookup(token[1]);
	    if (value != null)
	      return mustache.escape(value);
	  };

	  Writer.prototype._rawValue = function(token) {
	    return token[1];
	  };

	  mustache.name = "mustache.js";
	  mustache.version = "2.0.0";
	  mustache.tags = [ "{{", "}}" ];

	  // All high-level mustache.* functions use this writer.
	  var defaultWriter = new Writer();

	  /**
	   * Clears all cached templates in the default writer.
	   */
	  mustache.clearCache = function () {
	    return defaultWriter.clearCache();
	  };

	  /**
	   * Parses and caches the given template in the default writer and returns the
	   * array of tokens it contains. Doing this ahead of time avoids the need to
	   * parse templates on the fly as they are rendered.
	   */
	  mustache.parse = function (template, tags) {
	    return defaultWriter.parse(template, tags);
	  };

	  /**
	   * Renders the `template` with the given `view` and `partials` using the
	   * default writer.
	   */
	  mustache.render = function (template, view, partials) {
	    return defaultWriter.render(template, view, partials);
	  };

	  // This is here for backwards compatibility with 0.4.x.
	  mustache.to_html = function (template, view, partials, send) {
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

	}));


/***/ }
/******/ ])
});
;