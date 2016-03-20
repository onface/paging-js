module.exports = function (settings){
    // 向前兼容 0.0.1 版本 API
    settings.page = settings.page || settings.page
    var defaultSettings = {
        beforePageCount: 3,
        afterPageCount: 3,
        link: ''
    }
    // extend
    var name
    for (name in settings) {
        defaultSettings[name] = settings[name]
    }
    settings = defaultSettings

    // output 输出
        // {Bolean} 存在分页
    var _hasPaging,
        // {Number} 总页数 10
        _pageCount,
        // {Number} 当前页 5
        _page,
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
    _page = settings.page
    // 当前页不会大于总页数
    if (_page > _pageCount) {
      _page = _pageCount
    }
    if (_page < 1) {
        _page = 1
    }
    if (_pageCount < 0) {
        _pageCount = 0
    }

    // 存在分页？
    if (_pageCount < 2) {
        _hasPaging = false
    }
    else {
        _hasPaging = true
    }

    // 是第一页？
    _isFirstPage = _page === 1 ? true : false
    // 是最后一页？
    _isLastPage = _page === _pageCount ? true : false

    // 当前页前几页
    _beforePages = []
    var i;
    for (i = 0;i < settings.beforePageCount;i++) {
        var iPage = _page - i - 1

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
    if (_page > 2 + settings.beforePageCount) {
        _hasBeforePages = true
    }
    else {
        _hasBeforePages = false
    }

    // 当前页后几页
    _afterPages = [];
    var i;
    for (i = 0; i < settings.afterPageCount; i ++) {
        var iPage = _page + i + 1;
        if (iPage < _pageCount) {
            _afterPages.push(iPage)
        }
        else{
            // stop loop
            i = settings.afterPageCount
        }
    }
    // 是否存在后几页?
    if (_page < _pageCount - settings.afterPageCount - 1) {
        _hasAfterPages = true
    }
    else {
        _hasAfterPages = false
    }

    // 上一页
    _prevPage = _page - 1
    if (_prevPage < 1) {
        _prevPage = false
    }
    // 下一页
    _nextPage = _page + 1
    if (_nextPage > _pageCount) {
        _nextPage = false
    }
    settings.page = _page
    settings.pageCount = _pageCount
    return {
        _hasPaging: _hasPaging,
        _pageCount: _pageCount,
        _page: _page,
        _isFirstPage: _isFirstPage,
        _isLastPage: _isLastPage,
        _beforePages: _beforePages,
        _hasBeforePages: _hasBeforePages,
        _afterPages: _afterPages,
        _hasAfterPages: _hasAfterPages,
        _prevPage: _prevPage,
        _nextPage: _nextPage,
        _settings: settings
    }
}
