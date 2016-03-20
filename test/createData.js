var expect = require('expect.js')
var Paging = require('../paging')

describe('createData', function() {
  it('hasPaging', function () {
      var data = Paging.createData({
          page: 1,
          pageCount: 0
      })
      expect(data).to.eql({
              _hasPaging: false,
              _pageCount: 0,
              _page: 1,
              _isFirstPage: true,
              _isLastPage: false,
              _beforePages: [],
              _hasBeforePages: false,
              _afterPages: [],
              _hasAfterPages: false,
              _prevPage: false,
              _nextPage: false,
              _settings:
               { beforePageCount: 3,
                 afterPageCount: 3,
                 link: '',
                 page: 1,
                 pageCount: 0 }
            }
        )
  })
  it('page -2', function () {
        var data = Paging.createData({
          page: -2,
          pageCount: 10
        })
        var expectData = {
            _hasPaging: true,
            _pageCount: 10,
            _page: 1,
            _isFirstPage: true,
            _isLastPage: false,
            _beforePages: [],
            _hasBeforePages: false,
            _afterPages: [ 2, 3, 4 ],
            _hasAfterPages: true,
            _prevPage: false,
            _nextPage: 2,
            _settings: {
             beforePageCount: 3,
             afterPageCount: 3,
             link: '',
             page: 1,
             pageCount: 10
            }
        }
        expect(data).to.eql(expectData)
  })
  it('_isFirstPage', function () {
      var data = Paging.createData({
          page: 1,
          pageCount: 10
      })

      expect(data).to.eql({ _hasPaging: true,
          _pageCount: 10,
          _page: 1,
          _isFirstPage: true,
          _isLastPage: false,
          _beforePages: [],
          _hasBeforePages: false,
          _afterPages: [ 2, 3, 4 ],
          _hasAfterPages: true,
          _prevPage: false,
          _nextPage: 2,
          _settings:
           { beforePageCount: 3,
             afterPageCount: 3,
             link: '',
             page: 1,
             pageCount: 10 } }
        )
  })
  it('_isLastPage', function () {
      var data = Paging.createData({
          page: 10,
          pageCount: 10
      })

      expect(data).to.eql({
              _hasPaging: true,
              _pageCount: 10,
              _page: 10,
              _isFirstPage: false,
              _isLastPage: true,
              _beforePages: [ 7, 8, 9 ],
              _hasBeforePages: true,
              _afterPages: [],
              _hasAfterPages: false,
              _prevPage: 9,
              _nextPage: false,
              _settings: {
                 beforePageCount: 3,
                 afterPageCount: 3,
                 link: '',
                 page: 10,
                 pageCount: 10
             }
         }
        )
  })
  it('_beforePages _prevPage _nextPage', function () {
      var data = Paging.createData({
          page: 5,
          beforePageCount:10,
          pageCount: 10
      })
      var expectData = {
              _hasPaging: true,
              _pageCount: 10,
              _page: 5,
              _isFirstPage: false,
              _isLastPage: false,
              _beforePages: [ 2, 3, 4 ],
              _hasBeforePages: false,
              _afterPages: [ 6, 7, 8 ],
              _hasAfterPages: true,
              _prevPage: 4,
              _nextPage: 6,
              _settings: {
                 beforePageCount: 10,
                 afterPageCount: 3,
                 link: '',
                 page: 5,
                 pageCount: 10
             }
    }
     expect(data).to.eql(expectData)
  })
  it('_hasBeforePages', function () {
      var data = Paging.createData({
          page: 1,
          pageCount: 10
      })
      var expectData = {
              _hasPaging: true,
              _pageCount: 10,
              _page: 1,
              _isFirstPage: true,
              _isLastPage: false,
              _beforePages: [],
              _hasBeforePages: false,
              _afterPages: [ 2, 3, 4 ],
              _hasAfterPages: true,
              _prevPage: false,
              _nextPage: 2,
              _settings: {
                 beforePageCount: 3,
                 afterPageCount: 3,
                 link: '',
                 page: 1,
                 pageCount: 10
             }
        }
      expect(data).to.eql(expectData)
  })
  it('_beforePages full', function () {
      var data = Paging.createData({
          page: 8,
          beforePageCount:10,
          pageCount: 10
      })
      var expectData = {
          _hasPaging: true,
          _pageCount: 10,
          _page: 8,
          _isFirstPage: false,
          _isLastPage: false,
          _beforePages: [ 2, 3, 4, 5, 6, 7 ],
          _hasBeforePages: false,
          _afterPages: [ 9 ],
          _hasAfterPages: false,
          _prevPage: 7,
          _nextPage: 9,
          _settings: {
             beforePageCount: 10,
             afterPageCount: 3,
             link: '',
             page: 8,
             pageCount: 10 }
        }
      expect(data).to.eql(expectData)
  })
  it('_afterPages full', function () {
      var data = Paging.createData({
          page: 3,
          afterPageCount:10,
          pageCount: 10
      })
      var expectData = {
              _hasPaging: true,
              _pageCount: 10,
              _page: 3,
              _isFirstPage: false,
              _isLastPage: false,
              _beforePages: [ 2 ],
              _hasBeforePages: false,
              _afterPages: [ 4, 5, 6, 7, 8, 9 ],
              _hasAfterPages: false,
              _prevPage: 2,
              _nextPage: 4,
              _settings: {
                 beforePageCount: 3,
                 afterPageCount: 10,
                 link: '',
                 page: 3,
                 pageCount: 10
             }
        }

      expect(data).to.eql(expectData)
  })
  it('_hasAfterPages', function () {
      var data = Paging.createData({
          page: 10,
          pageCount: 10
      })
      var expectData = {
          _hasPaging: true,
          _pageCount: 10,
          _page: 10,
          _isFirstPage: false,
          _isLastPage: true,
          _beforePages: [ 7, 8, 9 ],
          _hasBeforePages: true,
          _afterPages: [],
          _hasAfterPages: false,
          _prevPage: 9,
          _nextPage: false,
          _settings: {
             beforePageCount: 3,
             afterPageCount: 3,
             link: '',
             page: 10,
             pageCount: 10
         }
    }
    expect(data).to.eql(expectData)
  })

  it('page max pageCount ', function () {
      var data = Paging.createData({
          page: 20,
          pageCount:10
      })
      var expectData = {
              _hasPaging: true,
              _pageCount: 10,
              _page: 10,
              _isFirstPage: false,
              _isLastPage: true,
              _beforePages: [ 7, 8, 9 ],
              _hasBeforePages: true,
              _afterPages: [],
              _hasAfterPages: false,
              _prevPage: 9,
              _nextPage: false,
              _settings: {
                 beforePageCount: 3,
                 afterPageCount: 3,
                 link: '',
                 page: 10,
                 pageCount: 10
             }
        }
        expect(data).to.eql(expectData)
  })
  it('page 1 pageCount 10', function() {
      var data = Paging.createData({
          page: 1,
          pageCount: 10
      })
      var expectData = {
            _hasPaging: true,
            _pageCount: 10,
            _page: 1,
            _isFirstPage: true,
            _isLastPage: false,
            _beforePages: [],
            _hasBeforePages: false,
            _afterPages: [ 2, 3, 4 ],
            _hasAfterPages: true,
            _prevPage: false,
            _nextPage: 2,
            _settings: {
                 beforePageCount: 3,
                 afterPageCount: 3,
                 link: '',
                 page: 1,
                 pageCount: 10
             }
        }
      expect(data).to.eql(expectData)
  })
  it('page 2 pageCount 10', function() {
      var data = Paging.createData({
          page: 2,
          pageCount: 10
      })
      var expectData = {
              _hasPaging: true,
              _pageCount: 10,
              _page: 2,
              _isFirstPage: false,
              _isLastPage: false,
              _beforePages: [],
              _hasBeforePages: false,
              _afterPages: [ 3, 4, 5 ],
              _hasAfterPages: true,
              _prevPage: 1,
              _nextPage: 3,
              _settings:
              {
                 beforePageCount: 3,
                 afterPageCount: 3,
                 link: '',
                 page: 2,
                 pageCount: 10
             }
         }
      expect(data).to.eql(expectData)
  })
  it('beforePageCount 1', function() {
      var data = Paging.createData({
          beforePageCount: 1,
          page: 5,
          pageCount: 10
      })
      var expectData = {
              _hasPaging: true,
              _pageCount: 10,
              _page: 5,
              _isFirstPage: false,
              _isLastPage: false,
              _beforePages: [ 4 ],
              _hasBeforePages: true,
              _afterPages: [ 6, 7, 8 ],
              _hasAfterPages: true,
              _prevPage: 4,
              _nextPage: 6,
              _settings: {
                 beforePageCount: 1,
                 afterPageCount: 3,
                 link: '',
                 page: 5,
                 pageCount: 10
                }
             }
      expect(data).to.eql(expectData)
  })
  it('afterPageCount 1', function() {
      var data = Paging.createData({
          afterPageCount: 1,
          page: 5,
          pageCount: 10
      })
      var expectData = {
              _hasPaging: true,
              _pageCount: 10,
              _page: 5,
              _isFirstPage: false,
              _isLastPage: false,
              _beforePages: [ 2, 3, 4 ],
              _hasBeforePages: false,
              _afterPages: [ 6 ],
              _hasAfterPages: true,
              _prevPage: 4,
              _nextPage: 6,
              _settings:{
                 beforePageCount: 3,
                 afterPageCount: 1,
                 link: '',
                 page: 5,
                 pageCount: 10
             }
        }
      expect(data).to.eql(expectData)
  })
  it('settings', function () {
      var data = Paging.createData({
          page: 1,
          pageCount: 10,
          link: '?p='
      })
      var expectData = {
          afterPageCount: 3,
          beforePageCount: 3,
          link: '?p=',
          page: 1,
          pageCount: 10
      }
      expect(data._settings).to.eql(expectData)
  })
})
