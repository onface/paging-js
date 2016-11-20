// _Package = require('../index')
describe('#createData.js', function() {
    it('proptypes need page', function (){
        _Package.createData({pageCount: 10})
        expect(window.console._warnMsg).to.eql('Warning: Failed propType: Required prop `page` was not specified in `paging.createData`.')
    })
    it('proptypes page type need is number ', function (){
        _Package.createData({page: '1', pageCount: 10})
        expect(window.console._warnMsg).to.eql('Warning: Failed propType: Invalid prop `page` of type `string` supplied to `paging.createData`, expected `number`.')
    })
    it('Error settings: need pageCount or pageSize&dataCount!', function (){
        var errorMessage = ''
        try {
            _Package.createData({page: 1})
        } catch (e) {
            errorMessage = e.message
        }
        expect(errorMessage).to.eql('settings: need pageCount or pageSize&dataCount!')
    })
})
