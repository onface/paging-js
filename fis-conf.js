var fs = require('fs')
var path = require('path')
var iPackage = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')).toString())
fis.hook(require('fis3-hook-relative'));

fis.match('**', {
  relative: true
})
var LessPluginAutoPrefix = require('less-plugin-autoprefix')
var autoprefixPlugin = new LessPluginAutoPrefix({
    "browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
    "cascade": true
})
fis.match('*.css', {
    parser: fis.plugin('less-2.x', {
        plugins: [autoprefixPlugin]
    })
})


// js
var babel = require('babel-core');
var babelConfig  = {
    presets: [
         "es2015"
    ]
}
fis.match('*.js', {
    parser: [
        function (content, file) {
            return babel.transform(content, babelConfig).code
        },
        fis.plugin("translate-es3ify")
    ]
})
// doc/vendor/ 下的文件不做 es6 编译
fis.match('doc/vendor/**.js', {
    parser: []
})

var webpackResolveAlias = {

}
webpackResolveAlias[iPackage.name] = path.join(__dirname)
fis.match('*.md:js', {
    parser: fis.plugin('webpack', {
        externals: {
            'jquery': 'jQuery'
            // 'moment': 'moment',
            // 'moment/min/moment.min': 'moment',
        },
        module: {
            postLoaders: [
                // 如果不需要兼容IE8请去掉 es3ify
                {
                   test: /\.js$/,
                   loaders: ['es3ify']
                }
            ],
            loaders: [
                {
                    // 将 md 增加到 babel 编译是为了支持 ````js console.log() ```` 语法
                    test: /\.(js|md)$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: babelConfig
                },
                {
                   test: /\.css$/,
                   loader: "style!css!less"
                }
            ]
        },
        lessLoader: {
            lessPlugins: [
                autoprefixPlugin
            ]
        },
        resolve: {
            alias: webpackResolveAlias
        }
    })
})


// markrun
var markrun = require('markrun')
fis.match('*.md', {
    rExt: '.html',
    isHtmlLike: true,
    parser: function (content, file) {
        var html = markrun(content, {
            templateTransformData: function (data) {
                data.package = iPackage
                return data
            },
            compile: {
                js: function (source) {
                    result = fis.compile.partial(source, file, {
                       ext: 'js'
                    });
                    return {
                        lang: 'js',
                        code: result
                    }
                }
            },
            template: require('fs').readFileSync(path.join(__dirname, 'doc/static/markrun-template.html')).toString()
        })

        return html
    },
    postprocessor: function (content, file) {
        var re = /(<a.*?)href=(['"]?)([^'"\s?]+)((\?[^'"\s]*)?)\2([^>]*>)/ig

        return content.replace(re, function(all, prefix, quote, value, query, queryInner, postfix) {
            var f = fis.uri(value)
            if(f.file) {
                var message = {
                    target: f.file.subpath,
                    file: file
                }
                fis.emit('plugin:relative:fetch', message)
                var ret = message.ret
                ret = ret.replace(/README\.md$/i, 'index.html')
                ret = ret.replace(/\.md$/i, '.html')
               all = prefix + 'href=' + quote + ret + query + quote + postfix
            }
            return all
        })
    }
})
fis.match('(**)README.md', {
    release: '$1index'
})
fis.match('{_fastboot/**,markrun-template.html}', {
    release: false
}, 999)

// 过滤文件
var ignoreFile = [
    'fis-conf.js',
    'npm-debug.log',
    'node_modules/**',
    '_fastboot',
    '_gh-pages/**',
    'gh-pages/**'
]
fis.match('{' + ignoreFile.join(',') + '}', {
    release: false
})

fis.media('npm').match('*.md', {
    rExt: 'md',
    parser:[]
})
fis.media('npm').match('doc/vendor/**', {
    release: false
})
fis.media('npm').match('(**)README.md', {
    release: '$1README'
})
