module.exports = function () {
    return {
        themes: 'simple',
        link: 'p=',
        // auto: location.search
        query: 'auto',
        mini: false,
        prefix: 'face-paging',
        prevText: '上一页',
        nextText: '下一页',
        dataTotalStartText: '共',
        dataTotalEndText: '条',
        goto: false,
        gotoStartText: '前往',
        gotoEndText: '页',
        onChange: function (page, data) {
            location.href = data.$link + page
        }
    }
}
