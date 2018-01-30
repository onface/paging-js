module.exports = function () {
    return `
    {{#hasPaging}}
        <div class="{{$prefix}} {{$themes}}">
            {{#dataTotal}}
            <span class="{{$prefix}}-dataTotal">
                {{$dataTotalStartText}}
                <span class="{{$prefix}}-dataTotal-value">
                    {{dataTotal}}
                </span>
                {{$dataTotalEndText}}
            </span>
            {{/dataTotal}}
            <{{#prevPage}}a{{/prevPage}}{{^prevPage}}span{{/prevPage}}
                class="{{$prefix}}-prev {{^prevPage}}{{$prefix}}-prev--disabled{{/prevPage}}"
                href="{{$link}}{{prevPage}}"
            >
                {{$prevText}}
            </{{#prevPage}}a{{/prevPage}}{{^prevPage}}span{{/prevPage}}>
            {{#$mini}}
                <span class="{{$prefix}}-mini">
                    <input type="text" data-paging-js-value="true" class="{{$prefix}}-mini-value" value="{{page}}">
                    <span class="{{$prefix}}-mini-separate">/</span>
                    <span class="{{$prefix}}-mini-pagecount">{{pageCount}}</span>
                </span>
            {{/$mini}}

            {{^$mini}}
                {{^isFirstPage}}
                <a href="{{$link}}1" class="{{$prefix}}-item">1</a>
                {{/isFirstPage}}
                {{#prevHasMorePage}}
                <a href="{{$link}}{{prevSomePage}}" class="{{$prefix}}-more {{$prefix}}-more--prev">
                    <span class="{{$prefix}}-more-text">
                        ...
                    </span>
                    <span class="{{$prefix}}-more-icon">
                        <span class="fi fi-angle-double-left"></span>
                    </span>
                </a>
                {{/prevHasMorePage}}
                {{#prevBatch}}
                <a class="{{$prefix}}-item" href="{{$link}}{{.}}">{{.}}</a>
                {{/prevBatch}}
                <a href="{{$link}}{{page}}" class="{{$prefix}}-item {{$prefix}}-item--current">{{page}}</a>
                {{#nextBatch}}
                <a class="{{$prefix}}-item" href="{{$link}}{{.}}">{{.}}</a>
                {{/nextBatch}}
                {{#nextHasMorePage}}
                <a href="{{$link}}{{nextSomePage}}" class="{{$prefix}}-more {{$prefix}}-more--prev">
                    <span class="{{$prefix}}-more-text">
                        ...
                    </span>
                    <span class="{{$prefix}}-more-icon">
                        <span class="fi fi-angle-double-right"></span>
                    </span>
                </a>
                {{/nextHasMorePage}}
                {{^isLastPage}}
                <a href="{{$link}}{{pageCount}}" class="{{$prefix}}-item">{{pageCount}}</a>
                {{/isLastPage}}
            {{/$mini}}

            <{{#nextPage}}a{{/nextPage}}{{^nextPage}}span{{/nextPage}}
                class="{{$prefix}}-next {{^nextPage}}{{$prefix}}-next--disabled{{/nextPage}}"
                href="{{$link}}{{nextPage}}"
            >
                {{$nextText}}
            </{{#nextPage}}a{{/nextPage}}{{^nextPage}}span{{/nextPage}}>
            {{#$goto}}
                <span class="{{$prefix}}-goto">
                    {{$gotoStartText}}
                    <input type="text" data-paging-js-value="true" value="4" class="{{$prefix}}-goto-value" >
                    {{$gotoEndText}}
                </span>
            {{/$goto}}
        </div>
    {{/hasPaging}}
    `
}
