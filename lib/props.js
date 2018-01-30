import PropTypes from "prop-types"
const createData = {
    defaultProps: require('./createDataDefault.js'),
    propTypes: {
        page: PropTypes.number.isRequired,
        pageCount: PropTypes.number,
        dataTotal: PropTypes.number,
        pageSize: PropTypes.number,
        prevBatch: PropTypes.number,
        nextBatch: PropTypes.number,
        prevSomePage: PropTypes.number,
        nextSomePage: PropTypes.number
    }
}
module.exports = {
    createData: createData
}
