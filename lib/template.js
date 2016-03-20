module.exports = {
    default: `
    {{#_hasPaging}}
        <div class="ui-paging">
            <{{#_prevPage}}a{{/_prevPage}}{{^_prevPage}}span{{/_prevPage}} class="ui-paging-prev" href="{{_link}}{{_prevPage}}">
                上一页
            </{{#_prevPage}}a{{/_prevPage}}{{^_prevPage}}span{{/_prevPage}}>
            {{^_isFirstPage}}
            <a href="{{_link}}1" class="ui-paging-item">1</a>
            {{/_isFirstPage}}
            {{#_hasBeforePages}}
            <span class="ui-paging-ellipsis">...</span>
            {{/_hasBeforePages}}
            {{#_beforePages}}
            <a class="ui-paging-item" href="{{_link}}{{.}}">{{.}}</a>
            {{/_beforePages}}
            <a href="{{_link}}{{_page}}" class="ui-paging-item ui-paging-current">{{_page}}</a>
            {{#_afterPages}}
            <a class="ui-paging-item" href="{{_link}}{{.}}">{{.}}</a>
            {{/_afterPages}}
            {{#_hasAfterPages}}
            <span class="ui-paging-ellipsis">...</span>
            {{/_hasAfterPages}}
            {{^_isLastPage}}
            <a href="{{_link}}{{_pageCount}}" class="ui-paging-item">{{_pageCount}}</a>
            {{/_isLastPage}}
            <{{#_nextPage}}a{{/_nextPage}}{{^_nextPage}}span{{/_nextPage}} class="ui-paging-next" href="{{_link}}{{_nextPage}}">
                下一页
            </{{#_nextPage}}a{{/_nextPage}}{{^_nextPage}}span{{/_nextPage}}>
            <span class="ui-paging-info"><span class="ui-paging-bold">{{_page}}/{{_pageCount}}</span>页</span>
            <span class="ui-paging-which"><input value="{{_page}}" type="text"></span>
            <a class="ui-paging-info ui-paging-goto" href="{{_link}}{{_page}}" >跳转</a>
        </div>
    {{/_hasPaging}}
    `
}
