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
        onChange: function (page, data) {
            location.href = data.$link + page
        },
        template: require('./template.js')()
    }
}
