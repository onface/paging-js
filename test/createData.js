// _Package = require('../index')
var paging = _Package
describe('#createData.js', function() {
    it('proptypes need page', function (){
        paging.createData({pageCount: 10})
        expect(window.console._warnMsg).to.eql('Warning: Failed propType: Required prop `page` was not specified in `paging.createData`.')
    })
    it('proptypes page type need is number ', function (){
        paging.createData({page: '1', pageCount: 10})
        expect(window.console._warnMsg).to.eql('Warning: Failed propType: Invalid prop `page` of type `string` supplied to `paging.createData`, expected `number`.')
    })
    it('Error settings: need pageCount or pageSize&dataCount!', function (){
        var errorMessage = ''
        try {
            paging.createData({page: 1})
        } catch (e) {
            errorMessage = e.message
        }
        expect(errorMessage).to.eql('settings: need pageCount or pageSize&dataCount!')
    })
    it('calculation pageCount', function () {
        var output = paging.createData({
            page: 1,
            dataCount: 102,
            pageSize: 10
        })
        expect(output.pageCount).to.eql(11)
    })
    it('hasPaging dataCount 1', function () {
        var output = paging.createData({
            page: 1,
            dataCount: 1,
            pageSize: 10
        })
        expect(output.hasPaging).to.eql(false)
    })
    it('hasPaging pageCount 1', function () {
        var output = paging.createData({
            page: 1,
            pageCount: 4
        })
        expect(output.hasPaging).to.eql(false)
    })
    it('当前页不会大于总页数', function () {
        var output = paging.createData({
            page: 7,
            pageCount: 4
        })
        expect(output.page).to.eql(4)
    })
    it('isFirstPage true', function () {
        var output = paging.createData({
            page: 1,
            pageCount: 4
        })
        expect(output.isFirstPage).to.eql(true)
    })
    it('isFirstPage false', function () {
        var output = paging.createData({
            page: 2,
            pageCount: 4
        })
        expect(output.isFirstPage).to.eql(false)
    })
    it('isLastPage true', function () {
        var output = paging.createData({
            page: 4,
            pageCount: 4
        })
        expect(output.isLastPage).to.eql(true)
    })
    it('isLastPage false', function () {
        var output = paging.createData({
            page: 3,
            pageCount: 4
        })
        expect(output.isLastPage).to.eql(false)
    })
    it('prevBatch page 10', function () {
        var output = paging.createData({
            page: 10,
            pageCount: 20
        })
        expect(output.prevBatch).to.eql([7,8,9])
    })
    it('prevBatch page 1', function () {
        var output = paging.createData({
            page: 1,
            pageCount: 20
        })
        expect(output.prevBatch).to.eql([])
    })
    it('prevBatch page 2', function () {
        var output = paging.createData({
            page: 2,
            pageCount: 20
        })
        expect(output.prevBatch).to.eql([])
    })
    it('prevBatch page 3', function () {
        var output = paging.createData({
            page: 3,
            pageCount: 20
        })
        expect(output.prevBatch).to.eql([ 2])
    })
    it('prevBatch page 4', function () {
        var output = paging.createData({
            page: 4,
            pageCount: 20
        })
        expect(output.prevBatch).to.eql([ 2, 3])
    })
    it('prevBatch page 5', function () {
        var output = paging.createData({
            page: 5,
            pageCount: 20
        })
        expect(output.prevBatch).to.eql([ 2, 3, 4 ])
    })
    it('prevHasMorePage page 4', function () {
        var output = paging.createData({
            page: 4,
            pageCount: 20
        })
        expect(output.prevHasMorePage).to.eql(false)
    })
    it('prevHasMorePage page 5', function () {
        var output = paging.createData({
            page: 5,
            pageCount: 20
        })
        expect(output.prevHasMorePage).to.eql(false)
    })
    it('prevHasMorePage page 6', function () {
        var output = paging.createData({
            page: 6,
            pageCount: 20
        })
        expect(output.prevHasMorePage).to.eql(true)
    })
    it('prevHasMorePage page 7', function () {
        var output = paging.createData({
            page: 7,
            pageCount: 20
        })
        expect(output.prevHasMorePage).to.eql(true)
    })
    it('nextBatch page 1', function () {
        var output = paging.createData({
            page: 1,
            pageCount: 20
        })
        expect(output.nextBatch).to.eql([ 2, 3, 4])
    })
    it('nextBatch page 2', function () {
        var output = paging.createData({
            page: 2,
            pageCount: 20
        })
        expect(output.nextBatch).to.eql([ 3, 4, 5 ])
    })
    it('nextBatch page 15', function () {
        var output = paging.createData({
            page: 15,
            pageCount: 20
        })
        expect(output.nextBatch).to.eql([16, 17, 18])
    })
    it('nextBatch page 16', function () {
        var output = paging.createData({
            page: 16,
            pageCount: 20
        })
        expect(output.nextBatch).to.eql([17, 18, 19 ])
    })
    it('nextBatch page 17', function () {
        var output = paging.createData({
            page: 17,
            pageCount: 20
        })
        expect(output.nextBatch).to.eql([ 18, 19 ])
    })
    it('nextBatch page 18', function () {
        var output = paging.createData({
            page: 18,
            pageCount: 20
        })
        expect(output.nextBatch).to.eql([ 19 ])
    })
    it('nextBatch page 19', function () {
        var output = paging.createData({
            page: 19,
            pageCount: 20
        })
        expect(output.nextBatch).to.eql([])
    })
    it('nextBatch page 20', function () {
        var output = paging.createData({
            page: 20,
            pageCount: 20
        })
        expect(output.nextBatch).to.eql([])
    })
    it('nextHasMorePage page 2', function () {
        var output = paging.createData({
            page: 2,
            pageCount: 20
        })
        expect(output.nextHasMorePage).to.eql(true)
    })
    it('nextHasMorePage page 15', function () {
        var output = paging.createData({
            page: 15,
            pageCount: 20
        })
        expect(output.nextHasMorePage).to.eql(true)
    })
    it('nextHasMorePage page 16', function () {
        var output = paging.createData({
            page: 16,
            pageCount: 20
        })
        expect(output.nextHasMorePage).to.eql(false)
    })
    it('nextHasMorePage page 17', function () {
        var output = paging.createData({
            page: 17,
            pageCount: 20
        })
        expect(output.nextHasMorePage).to.eql(false)
    })
    it('nextHasMorePage page 18', function () {
        var output = paging.createData({
            page: 18,
            pageCount: 20
        })
        expect(output.nextHasMorePage).to.eql(false)
    })
    it('nextHasMorePage page 19', function () {
        var output = paging.createData({
            page: 19,
            pageCount: 20
        })
        expect(output.nextHasMorePage).to.eql(false)
    })
    it('nextHasMorePage page 20', function () {
        var output = paging.createData({
            page: 20,
            pageCount: 20
        })
        expect(output.nextHasMorePage).to.eql(false)
    })
    it('prevSomePage page 1', function () {
        var output = paging.createData({
            page: 1,
            pageCount: 20
        })
        expect(output.prevSomePage).to.eql(1)
    })
    it('prevSomePage page 2', function () {
        var output = paging.createData({
            page: 2,
            pageCount: 20
        })
        expect(output.prevSomePage).to.eql(1)
    })
    it('prevSomePage page 5', function () {
        var output = paging.createData({
            page: 5,
            pageCount: 20
        })
        expect(output.prevSomePage).to.eql(1)
    })
    it('prevSomePage page 6', function () {
        var output = paging.createData({
            page: 6,
            pageCount: 20
        })
        expect(output.prevSomePage).to.eql(1)
    })
    it('prevSomePage page 7', function () {
        var output = paging.createData({
            page: 7,
            pageCount: 20
        })
        expect(output.prevSomePage).to.eql(2)
    })
    it('prevSomePage page 8', function () {
        var output = paging.createData({
            page: 8,
            pageCount: 20
        })
        expect(output.prevSomePage).to.eql(3)
    })
    it('nextSomePage page 12', function () {
        var output = paging.createData({
            page: 12,
            pageCount: 20
        })
        expect(output.nextSomePage).to.eql(17)
    })
    it('nextSomePage page 13', function () {
        var output = paging.createData({
            page: 13,
            pageCount: 20
        })
        expect(output.nextSomePage).to.eql(18)
    })
    it('nextSomePage page 14', function () {
        var output = paging.createData({
            page: 14,
            pageCount: 20
        })
        expect(output.nextSomePage).to.eql(19)
    })
    it('nextSomePage page 15', function () {
        var output = paging.createData({
            page: 15,
            pageCount: 20
        })
        expect(output.nextSomePage).to.eql(20)
    })
    it('nextSomePage page 16', function () {
        var output = paging.createData({
            page: 16,
            pageCount: 20
        })
        expect(output.nextSomePage).to.eql(20)
    })
    it('nextSomePage page 19', function () {
        var output = paging.createData({
            page: 19,
            pageCount: 20
        })
        expect(output.nextSomePage).to.eql(20)
    })
    it('nextSomePage page 20', function () {
        var output = paging.createData({
            page: 20,
            pageCount: 20
        })
        expect(output.nextSomePage).to.eql(20)
    })
    it('nextSomePage page 21', function () {
        var output = paging.createData({
            page: 21,
            pageCount: 20
        })
        expect(output.nextSomePage).to.eql(20)
    })
    it('prevBatch 1 page 4', function () {
        var output = paging.createData({
            page: 4,
            prevBatch: 1,
            pageCount: 20
        })
        expect(output.prevBatch).to.eql([3])
    })
    it('prevBatch 0 page 4', function () {
        var output = paging.createData({
            page: 4,
            prevBatch: 0,
            pageCount: 20
        })
        expect(output.prevBatch).to.eql([])
    })
    it('nextBatch 1 page 4', function () {
        var output = paging.createData({
            page: 4,
            nextBatch: 1,
            pageCount: 20
        })
        expect(output.nextBatch).to.eql([5])
    })
    it('nextBatch 0 page 4', function () {
        var output = paging.createData({
            page: 4,
            nextBatch: 0,
            pageCount: 20
        })
        expect(output.nextBatch).to.eql([])
    })
})
