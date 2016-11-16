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
const render = {
    defaultProp: createData.defaultProps(),
    propTypes: {
        page: 'number|required',
        dataCount: 'number',
        pageCount: 'number',
        pageSize: 'number'
    },
    propExample: {
        page: [
            1,
            5
        ],
        dataCount: [
            100,
            200
        ],
        pageCount: [
            10,
            20
        ],
        pageSize: [
            10
        ]
    },
    propDesc: {
        page: '当前页',
        dataCount: '总数据量',
        pageCount: '总页码',
        pageSize: '每页显示多少条'
    }
}
module.exports = {
    render: render,
    createData: createData
}
