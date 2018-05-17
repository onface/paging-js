module.exports = function () {
    // 模板字符串
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings
    return `
    {{#hasPaging}}
        <div class="{{$prefixClassName}} {{$themes}}">
            {{#dataTotal}}
            <span class="{{$prefixClassName}}-dataTotal">
                {{{$text.dataTotal.before}}}
                <span class="{{$prefixClassName}}-dataTotal-value">
                    {{dataTotal}}
                </span>
                {{{$text.dataTotal.after}}}
            </span>
            {{/dataTotal}}
            <{{#prevPage}}a{{/prevPage}}{{^prevPage}}span{{/prevPage}}
                class="{{$prefixClassName}}-prev {{^prevPage}}{{$prefixClassName}}-prev--disabled{{/prevPage}}"
                href="{{$link}}{{prevPage}}"
            >
                {{{$text.prev}}}
            </{{#prevPage}}a{{/prevPage}}{{^prevPage}}span{{/prevPage}}>
            {{#$mini}}
                <span class="{{$prefixClassName}}-mini">
                    <input type="text" data-paging-js-value="true" class="{{$prefixClassName}}-mini-value" value="{{page}}">
                    <span class="{{$prefixClassName}}-mini-separate">/</span>
                    <span class="{{$prefixClassName}}-mini-pagecount">{{pageCount}}</span>
                </span>
            {{/$mini}}

            {{^$mini}}
                {{^isFirstPage}}
                <a href="{{$link}}1" class="{{$prefixClassName}}-item {{$prefixClassName}}-item--first-page">1</a>
                {{/isFirstPage}}
                {{#prevHasMorePage}}
                <a href="{{$link}}{{prevSomePage}}" class="{{$prefixClassName}}-more {{$prefixClassName}}-more--prev">
                    <span class="{{$prefixClassName}}-more-text">
                        ...
                    </span>
                    <span class="{{$prefixClassName}}-more-icon">
                        <span class="fi fi-angle-double-left"></span>
                    </span>
                </a>
                {{/prevHasMorePage}}
                {{#prevBatch}}
                <a class="{{$prefixClassName}}-item" href="{{$link}}{{.}}">{{.}}</a>
                {{/prevBatch}}
                <a href="{{$link}}{{page}}" class="{{$prefixClassName}}-item {{$prefixClassName}}-item--current">{{page}}</a>
                {{#nextBatch}}
                <a class="{{$prefixClassName}}-item" href="{{$link}}{{.}}">{{.}}</a>
                {{/nextBatch}}
                {{#nextHasMorePage}}
                <a href="{{$link}}{{nextSomePage}}" class="{{$prefixClassName}}-more {{$prefixClassName}}-more--prev">
                    <span class="{{$prefixClassName}}-more-text">
                        ...
                    </span>
                    <span class="{{$prefixClassName}}-more-icon">
                        <span class="fi fi-angle-double-right"></span>
                    </span>
                </a>
                {{/nextHasMorePage}}
                {{^isLastPage}}
                <a href="{{$link}}{{pageCount}}" class="{{$prefixClassName}}-item {{$prefixClassName}}-item--last-page">{{pageCount}}</a>
                {{/isLastPage}}
            {{/$mini}}

            <{{#nextPage}}a{{/nextPage}}{{^nextPage}}span{{/nextPage}}
                class="{{$prefixClassName}}-next {{^nextPage}}{{$prefixClassName}}-next--disabled{{/nextPage}}"
                href="{{$link}}{{nextPage}}"
            >
                {{{$text.next}}}
            </{{#nextPage}}a{{/nextPage}}{{^nextPage}}span{{/nextPage}}>
            {{#$goto}}
                <span class="{{$prefixClassName}}-goto">
                    {{{$text.goto.before}}}
                    <input type="text" data-paging-js-value="true" value="{{page}}" class="{{$prefixClassName}}-goto-value" >
                    {{{$text.goto.after}}}
                </span>
            {{/$goto}}
        </div>
    {{/hasPaging}}
    `
}
