import PropTypes from "prop-types"
import extend from "extend"
const props = require('./props').createData
const createData = function (settings) {
    PropTypes.validate(props.propTypes, settings, 'paging.createData')
    // object.assign
    settings = extend(true, {}, settings)
    settings = extend(true, props.defaultProps(), settings)
    if (typeof settings.pageCount === 'undefined') {
        if (typeof settings.pageSize === 'undefined' || typeof settings.dataCount === 'undefined') {
            throw new Error('settings: need pageCount or pageSize&dataCount!')
        }
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
    }
    // ## pageCount
    // 根据 dataCount 和 pageSize 计算出 pageCount
    if (!settings.pageCount) {
        settings.pageCount = Math.ceil(settings.dataCount/settings.pageSize)
    }
    output.pageCount = settings.pageCount
    // ## hasPaging
    if (output.pageCount < 2) {
        output.hasPaging = false
    }
    else {
        output.hasPaging = false
    }
    // ## page
    // 当前页不会大于总页数
    if (settings.page > settings.pageCount) {
        output.page = settings.pageCount
    }
    else {
        output.page = settings.page
    }

    return output
}
export default createData
module.exports = createData
