import PropTypes from "prop-types"
import extend from "extend"
const props = require('./props').createData
const createData = function (settings) {
    PropTypes.validate(props.propTypes, settings, 'paging.createData')
    // object.assign
    settings = extend(true, {}, settings)
    settings = extend(true, props.defaultProps(), settings)
    // TODO: 校验 settings
    // pageSize dataCount 不存在时必须存在 pageCount
    // pageCount 不存在时必须存在 pageSize dataCount
    return settings
}
export default createData
module.exports = createData
