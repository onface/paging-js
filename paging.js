var Paging = {
    render: function(){},
    createData: function(){},
    mustache: function(){},
    defaultTemplate: '',
    _correctSettings: function(){}
}
module.exports = Paging

Paging.mustache = require('mustache')
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