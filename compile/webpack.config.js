var glob = require("glob")
var webpack = require('webpack')
var path = require('path')
var compileConfig = require('../compile')
var entryMap = {}
var entryFiles = glob.sync('**/**demo.js')
var iPackage = require('../package.json')
entryFiles.forEach(function (filePath) {
    if (/^(output|node_modules)/.test(filePath)) { return }
    var name = filePath
    entryMap[name]  = [
        './' + filePath,
        'webpack-hot-middleware/client'
    ]
})
module.exports = {
    entry: entryMap,
    output: {
        publicPath: '/',
        path: path.join(__dirname, '../output'),
		filename: '[name]',
	    chunkFilename: '__chunk/[id]-[hash]-chunk.js'
    },
    resolve: {
		alias: {
			'vue': 'vue/dist/vue.js'
		}
	},
    devServer: {
        hot: true
    },
    plugins: [
	    new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
    module: {
        rules: [
            {
                test: /.(less|css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
				test: /\.vue$/,
				exclude: /node_modules/,
				use: [
					'vue-loader'
				]
			},
            {
                test: /\.js$/,
	            exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: compileConfig.babel
                    }
                ]
            },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=1&minetype=application/font-woff&name=__media/[path][name]-[hash:6].[ext]' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=1&minetype=application/font-woff&name=__media/[path][name]-[hash:6].[ext]' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=1&minetype=application/octet-stream&name=__media/[path][name]-[hash:6].[ext]' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=1&minetype=image/svg+xml&name=__media/[path][name]-[hash:6].[ext]' },
            { test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'url-loader?limit=1&name=__media/[path][name]-[hash:6].[ext]'},
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    resolve: {
        alias: (function () {
            var alias = compileConfig.alias
            alias[iPackage.name] = path.resolve(__dirname, '../')
            return alias
        })()
    }
}
