// _Package = require('../index')
describe('#basic.js', function() {
    it('render success', function (){
        _Package(document.body, 'ewfhiuewhfiuhwefiuhweiufhiuhIUGHFEUGFUYWEGFIUWEHFOUWG3FUYHEF')
        expect(/ewfhiuewhfiuhwefiuhweiufhiuhIUGHFEUGFUYWEGFIUWEHFOUWG3FUYHEF/.test(document.body.innerHTML)).to.be.ok()
    })
})
