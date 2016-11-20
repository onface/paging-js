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
})
