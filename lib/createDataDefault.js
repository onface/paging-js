module.exports = function () {
    return {
        /*
            required settings:
                Plan A:
                    page: 1,
                    pageCount: 11,
                Plan B:
                    page: 1,
                    pageSize: 10,
                    dataTotal: 110
        */
        prevBatch: 3,
        nextBatch: 3,
        prevSomePage: 5,
        nextSomePage: 5
    }
}
