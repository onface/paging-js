var path = require('path');
var iPackage = require('../package.json')
var hashToPort = require('hash-to-port')
var compileConfig = require('../compile.js')
var testServerPort = hashToPort(iPackage.name + 'onface/test:server')
var webpackConfig = require('./webpack.karma.config')
var karmaConf = function () {
    return {
        basePath: '../',
        frameworks: ['jasmine'],
        files: [
            require.resolve('../doc/theme/polyfill/lt-ie10.js'),
            require.resolve('../doc/theme/polyfill/lte-ie11.js'),
            require.resolve('../doc/theme/polyfill/es6-promise.auto.js'),
        ].concat(compileConfig.test.files),
        preprocessors: {
            // add webpack as preprocessor
            'lib/**/*.js': ['webpack', 'sourcemap'],
            'lib/**/*.vue': ['webpack', 'sourcemap'],
            'lib/**/*.css': ['webpack', 'sourcemap'],
            'test/**/*.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        },
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-chrome-launcher'
        ],
        babelPreprocessor: {
            options: compileConfig.babel
        },
        reporters: ['progress'],
        port: testServerPort,
        colors: true,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        processKillTimeout: 1200000
    }
}
module.exports = function(config) {
    config.set(karmaConf(config));
  };
