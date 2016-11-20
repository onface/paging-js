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
    return settings
}
export default createData
module.exports = createData
