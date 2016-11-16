// _Package = require('../index')
describe('#createData.js', function() {
    it('proptypes need page', function (){
        var errorMessage = ''
        _Package.createData({})
        expect(window.console._warnMsg).to.eql('Warning: Failed propType: Required prop `page` was not specified in `paging.createData`.')
    })
    it('proptypes page type need is number ', function (){
        var errorMessage = ''
        _Package.createData({page: '1'})
        expect(window.console._warnMsg).to.eql('Warning: Failed propType: Invalid prop `page` of type `string` supplied to `paging.createData`, expected `number`.')
    })
})
