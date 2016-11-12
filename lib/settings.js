mdoule.exoprts = {
    defaultSettings: {
        prevBatch: 3,
        nextBatch: 3,
        prevSomePage: 5,
        nextSomePage: 5
    },
    settingsType: {
        page: 'number|required',
        dataCount: 'number',
        pageCount: 'number',
        pageSize: 'number'
    },
    settingsExample: {
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
    settingsDesc: {
        page: '当前页',
        dataCount: '总数据量',
        pageCount: '总页码',
        pageSize: '每页显示多少条'
    }
}
