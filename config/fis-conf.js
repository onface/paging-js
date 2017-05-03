var path = require('path')
var markrun = require('markrun')
var markrunThemes = require('markrun-themes')
var iPackage = require('../package.json')
var webpack = require('webpack')
var fs = require('fs')
var del = require('del')
var babel = require('babel-core')
var delPath = ['./output']
var json5 = require('json5')
var hljs = require('highlight.js')
var clearMedia = ['gh', 'npm']
if (clearMedia.indexOf(fis.project.currentMedia()) !== -1) {
    del.sync(delPath)
    console.log('\n Deleted files and folders:\n', delPath.join('\n'));
}
if (fis.project.currentMedia() === 'gh') {
    fis.match('**', {
        domain:'/' + iPackage.gitRepository
    })
}

if (fis.project.currentMedia() === 'ghversion') {
    var outputPath = './output/' + iPackage.version
    fis.config.data.options.d = outputPath
    console.log('Build: ' + outputPath)
    fis.match('**', {
        domain:'/' + iPackage.gitRepository + '/' + iPackage.version
    })
}
fis.match('{config/**,npm-debug.log,yarn.lock,__test__/**}', {
    release: false
})

if (fis.project.currentMedia() === 'npm') {
    fis.match('**.js', {
        parser: [
            function (content, file) {
                return babel.transform(content, require('./babel.js')).code
            },
            fis.plugin("translate-es3ify")
        ]
    })
    fis.match('{**.demo.js,example/dev.js}', {
        parser: []
    })
    // less 配置，使用 css 后缀是为了文档中直接使用 require('name/lib/index.css')
    fis.match('*.css', {
        parser: fis.plugin('less-2.x')
    })
}
else {
    fis.match('*.md', {
        rExt: '.html',
        isHtmlLike: true,
        useDomain: true,
        parser: [
            function (content, file) {
                var info = {
                    filepath: file.fullname
                }
                content = content.replace(/(\[.*?\]\((.*\.demo\.js)\))/gi, function (source, $1, $2) {
                    return '<!--MR-R\n{type: "pre",file:"' + $2 + '"}\n-->\n\n' + $1
                })
                var html = markrun(
                    content,
                    {
                        template: require('fs').readFileSync(__dirname + '/template.html').toString(),
                        templateDefaultData: {
                            theme: '',
                            keywords: '',
                            description: '',
                            PACKAGE: iPackage
                        },
                        compile: {
                            'demo': require('markrun-themes/box-compile-replace.js')
                       },
                        replace: {
                            pre: function (data, options, info, highlight) {
                                var path = require('path')
                                var fs = require('fs')
                                var fullpath = path.join(path.dirname(info.filepath), data.file)
                                var code = fs.readFileSync(fullpath, 'utf-8').toString()
                                info.deps = info.deps || []
                                info.deps.push(fullpath)
                                code = highlight(code).trim()
                                if (data.run) {
                                    code = code +'<script data-markrun-lastrun="true" src="'+ data.file + '"></scr' + 'ipt>'
                                }
                                return code
                            }
                        }
                    },
                    info
                )
                info.deps = info.deps || []
                info.deps.forEach(function (filename) {
                     file.cache.addDeps(filename)
                })
                html = html.replace(/href="([^"]+)"/g, function (all, url) {
                    if (!require('is-absolute-url')(url) && !/^\/\//.test(url)) {
                        url = url.replace(/README\.md$/,'index.html')
                                .replace(/\.md$/,'.html')
                    }
                    return 'href="' + url + '"'
                })
                return html
            }
        ]
    })
    // @2 关联 @1
    fis.match('(**)README.md', {
        release: '$1index'
    })
}
