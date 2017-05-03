import PropTypes from 'prop-types'
const createData = {
    defaultProps: function () {
        return {
            prevBatch: 3,
            nextBatch: 3,
            prevSomePage: 5,
            nextSomePage: 5
        }
    },
    propTypes: {
        page: PropTypes.number.isRequired,
        pageCount: PropTypes.number,
        dataCount: PropTypes.number,
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
