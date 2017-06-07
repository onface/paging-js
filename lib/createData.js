import PropTypes from "prop-types"
import extend from "extend"
const props = require('./props').createData
const createData = function (settings) {
    PropTypes.validate(props.propTypes, settings, 'paging.createData')
    // object.assign
    settings = extend(true, {}, settings)
    settings = extend(true, props.defaultProps(), settings)
    for( var key in settings ) {
        var item = settings[key]
        var num = Number(item)
        if (!isNaN(num)) {
            settings[key] = num
        }
    }
    if (typeof settings.pageCount === 'undefined') {
        if (typeof settings.pageSize === 'undefined' || typeof settings.dataCount === 'undefined') {
            throw new Error('settings: need pageCount or pageSize&dataCount!')
        }
    }
    if (settings.page < 1) {
        settings.page = 1
    }
    if (settings.pageCount < 1) {
        settings.pageCount = 1
    }
    if (settings.dataCount < 0) {
        settings.dataCount = 0
    }
    let output = {
        // {Bolean} 存在分页
        hasPaging: null,
        // {Number} 20 总页数
        pageCount: null,
        // {Number} 200 总数据量
        dataCount: null,
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
    }
    // ## pageCount
    // 根据 dataCount 和 pageSize 计算出 pageCount
    if (!settings.pageCount) {
        settings.pageCount = Math.ceil(settings.dataCount/settings.pageSize)
    }
    else {
        output.dataCount = settings.dataCount
    }
    output.pageCount = settings.pageCount

    // ## dataCount
    output.dataCount = settings.dataCount || null
    // ## pageSize
    output.pageSize = settings.pageSize || null

    // ## hasPaging
    if (output.pageCount < 2) {
        output.hasPaging = false
    }
    else {
        output.hasPaging = true
    }
    // ## page
    // 当前页不会大于总页数
    if (settings.page > settings.pageCount) {
        output.page = settings.pageCount
    }
    else {
        output.page = settings.page
    }
    // ## isFirstPage
    output.isFirstPage = (output.page === 1)
    // ## isLastPage
    output.isLastPage = (output.page === output.pageCount)
    // ## prevBatch
    // 当前页前几页
    output.prevBatch = []
    var i;
    for (i = 0; i < settings.prevBatch; i++) {
        var iPage = output.page - i - 1

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
            output.prevBatch.unshift(iPage)
            // [4]
            // [3, 4]
            // [2, 3, 4]
        }
        else {
            // stop loop
            i = settings.prevBatch
        }
    }

    // ## prevHasMorePage
    output.prevHasMorePage = (output.page > 2 + settings.prevBatch)

    // ## nextBatch
    output.nextBatch = []
    var i;
    for (i = 0; i < settings.nextBatch; i ++) {
        var iPage = output.page + i + 1;
        if (iPage < output.pageCount) {
            output.nextBatch.push(iPage)
        }
        else{
            // stop loop
            i = settings.nextBatch
        }
    }
    // ## nextHasMorePage
    output.nextHasMorePage = output.page < output.pageCount - settings.nextBatch - 1
    // ## prevPage
    output.prevPage = output.page - 1
    if (output.prevPage < 1) {
        output.prevPage = false
    }
    // ## nextPage
    output.nextPage = output.page + 1
    if (output.nextPage > output.pageCount) {
        output.nextPage = false
    }
    // ## prevSomePage
    output.prevSomePage = output.page - settings.prevSomePage
    if (output.prevSomePage < 1) {
        output.prevSomePage = 1
    }
    // ## nextSomePage
    output.nextSomePage = output.page + settings.nextSomePage
    if (output.nextSomePage > output.pageCount) {
        output.nextSomePage = output.pageCount
    }

    return output
}
export default createData
module.exports = createData
