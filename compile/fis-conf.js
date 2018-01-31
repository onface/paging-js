var babel = require('babel-core')
var iPackage = require('../package.json')
var markrun = require('markrun')
var path = require('path')
var fs = require('fs')
var json5 = require('json5')
var config = require('./getConfig')()
var compileConfig = require('../compile')
var isAbsoluteUrl = require('is-absolute-url')
var userConfig = require('../compile')
var ejs = require('ejs')
fis.hook(require('fis3-hook-relative'))
fis.match('**', {
    relative: true
})
fis.match('{**.css,**.vue:less,**.less}', {
    parser: fis.plugin('less-2.x', compileConfig.less),
    rExt: '.css'
})


function htmlLinkProcessor (content, file) {
    var html = content
    html = html.replace(/href="([^"]+)"/g, function (all, url) {
        if (!require('is-absolute-url')(url) && !/^\/\//.test(url)) {
            url = url.replace(/README\.md/,'index.html')
                   .replace(/\.md/,'.html')
        }
        return 'href="' + url + '"'
    })
    return html
}
function htmlEJSProcessor (content, file) {
    var html = content
    var template = ejs.compile(html)
    html = template({
        PACKAGE: require('../package.json')
    })
    return html
}
function htmlEntryScriptParser (content, file) {
    if (fis.project.currentMedia() !== 'dev') {
        return content
    }
    var matchScript = /\<script(.*)?src="(.*demo\.js)"\s*\>/g
    return content.replace(matchScript, function (source, attr, src) {
        var url = path.join(file.dirname, src).replace(fis.project.getProjectPath(), '')
        var html = `
        <script>
          document.write('<scr'+ 'ipt ${attr} src="${url}"></scr' + 'ipt>')
        `
        return html
    })
}
/**
 * livereload
 */
fis.media('dev').match('*.{md,html}', {
    postprocessor: [
        function (content, file) {
           if (content.indexOf('onface-project-livereload') === -1) {
               var livereloadScriptTag = `<script>
                           document.write('<scr'+ 'ipt data-onface-project-livereload="true" src="${'http://127.0.0.1:' + config.livereloadServerPort + '/livereload.js?snipver=1'}"></scr' + 'ipt>')
                       </script>`
               content = content.replace(/<\/\s*body>/, livereloadScriptTag + '</body>')
           }
           return content
       },
       htmlEJSProcessor,
       htmlLinkProcessor
    ]
})

if (fis.project.currentMedia() !== 'npm') {
    fis.match('**.md', {
        useDomain: true,
        isHtmlLike: true,
        rExt: '.html',
        postprocessor: [
            htmlEJSProcessor,
            htmlLinkProcessor
        ],
        parser: [
            function (content, file) {
                var tpl = 'default'
                var markrunInfo = {
                    file: file,
                    deps:[]
                }
                var html = markrun(content, {
                    compile: {
                        code: function (source, data, info) {
                            var settings = json5.parse(source)
                            var filePath= path.join(info.file.dirname, settings.source)
                            info.deps = info.deps || []
                            info.deps.push(filePath)
                            var code = fs.readFileSync(filePath).toString()
                            settings.desc = settings.desc || ''
                            settings.title = settings.title || path.parse(filePath).name
                            settings.html = settings.html || ''
                            code = code.replace(/\/\*ONFACE-DEL\*\/.*/g, '')
                            code = markrun.markdownParserHighlight(code, 'js')
                            return {
                                lang: 'replace',
                                code: `
    <div class="face-one-code ${settings.open?' face-one-code--open':''}">
                        <div class="face-one-code-example">
                            ${settings.html}
                        </div>
                        <div class="face-one-code-info">
                            <div class="face-one-code-info-title">${settings.title}</div>
                            <div class="face-one-code-info-desc">
                                ${markrun(settings.desc, {template: '<%- content %>'})}
                            </div>
                            <span class="face-one-code-info-switchCode fi fi-code"></span>
                        </div>
                        <div class="face-one-code-source">
                            <div class="face-one-code-source-tool">
                                <span class="face-one-code-source-tool-copy fi fi-files-o"></span>
                            </div>
                            ${code}
                        </div>
                        <script data-markrun-lastrun="true">
                        document.write('<scri' + 'pt src="${settings.js}?v=${iPackage.version}"' + '" ></sc' + 'ript>')
                        </script>
                    </div>
                                `
                            }
                        }
                    },
                    templateDefaultData: {
                        keywords: '',
                        description: '',
                        navPath: 'sidebar.html',
                        PACKAGE: iPackage
                    },
                    template: function (data) {
                        var tplPath = data.tpl || tpl
                        var templatePath = path.join(__dirname, '../doc/theme/template/' + tplPath + '.ejs')
                        var templateContent = fs.readFileSync(templatePath).toString()
                        return templateContent
                    }
                }, markrunInfo)
                // 与热更新冲突，取消缓存
                // markrunInfo.deps.forEach(function (filename) {
                //      file.cache.addDeps(filename)
                // })
                return html
            },
            htmlEntryScriptParser
        ]
    })
    fis.match('(**)README.md', {
        release: '$1index'
    })
}
fis.media('dev').match('**.js', {
    release: false
})
fis.match('doc/theme/**', {
    release: true
})
fis.match('**.log', {
    release: false
})

if (fis.project.currentMedia() === 'buildversion') {
    var outputPath = './output/' + iPackage.version
    fis.config.data.options.d = outputPath
    console.log('Build: ' + outputPath)

}

fis.match('{compile/**,compile.js,yarn.lock,test/**}', {
    release: false
}, true)

var buildMedia = ['build', 'buildversion']
buildMedia.forEach(function (media) {
    fis.media(media).match('**.md', {
        postprocessor: [
            function(content, file, settings) {
                var re = /<a\s+[\s\S]*?["'\s\w\/\-](?:>|$)/gi;
                return content = content.replace(re, function(m, p1) {
                    return m.replace(/\s+href\s*=\s*(?:'([^']+)'|"([^"]+)"|([^\s\/>]+))/i, function(m, p1, p2, p3) {
                        var matched = p1 || p2 || p3;
                        return (matched && m.replace(matched, function(to) {
                            if (fis.util.exists(to)) {
                                return to;
                            }
                            var f = fis.uri(to, path.dirname(file.realpath)).file;
                            if (!isAbsoluteUrl(to)) {
                                var message = {
                                  target: to,
                                  file: file
                                }
                                fis.emit('plugin:relative:fetch', message)
                                return message.ret.replace(/\.md/, '.html').replace(/README\./, 'index.')
                            }
                            var output = (f && f.url) || to;
                            return output
                        })) || m;
                    });
                });
            },
            htmlEJSProcessor,
            htmlLinkProcessor
        ]
    })
})


if (fis.project.currentMedia() === 'npm') {
    fis.match('**.vue', {
        parser: [
            function (content, file) {
                return babel.transform(content, userConfig.babel).code
            }
        ]
    })
    fis.match('{**.js,**.vue:js}', {
        parser: [
            function (content, file) {
                return babel.transform(content, userConfig.babel).code
            }
        ]
    })
    fis.match('**.demo.js', {
        parser: []
    })
    fis.match('**.vue', {
        rExt: 'js',
        useSameNameRequire: true,
        parser: [
            fis.plugin('vue-component', {
              // vue@2.x runtimeOnly
              runtimeOnly: true,          // vue@2.x 有runtimeOnly模式，为true时，template会在构建时转为render方法
              // styleNameJoin
              styleNameJoin: '',          // 样式文件命名连接符 `component-xx-a.css`
              extractCSS: false,           // 是否将css生成新的文件, 如果为false, 则会内联到js中
              // css scoped
              cssScopedIdPrefix: '_v-',   // hash前缀：_v-23j232jj
              cssScopedHashType: 'sum',   // hash生成模式，num：使用`hash-sum`, md5: 使用`fis.util.md5`
              cssScopedHashLength: 8,     // hash 长度，cssScopedHashType为md5时有效
              cssScopedFlag: '__vuec__',  // 兼容旧的ccs scoped模式而存在，此例子会将组件中所有的`__vuec__`替换为 `scoped id`，不需要设为空
            })
        ]
    })
    fis.match('doc/theme/**', {
        release: false
    })
}

userConfig.fis(fis)
