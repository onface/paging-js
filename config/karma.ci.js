var path = require('path');
var babelConfig = require('./babel.js')
var iPackage = require('../package.json')
var hashToPort = require('hash-to-port')
var testServerPort = hashToPort(iPackage.name + 'fast-flow/test:server')
var webpackConfig = require('./webpack.karma')
var devConfig = require('../dev-config.js')
var extend = require('extend')
var karmaConf = require('./karma.conf').conf
module.exports = function (config) {
if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    var sauceUserErrorMsg = 'Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.'
    console.error('---------------')
    console.error(sauceUserErrorMsg)
    console.error('---------------')
    throw new Error(sauceUserErrorMsg)
 }
  var sauceLabsConfig = {
      frameworks: ['jasmine'],
      reporters: ['progress', 'saucelabs'],
      sauceLabs: {
        testName: iPackage.name + ' unit tests',
        tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
        recordVideo: false,
        testName: iPackage.name,
        recordScreenshots: false,
        connectOptions: {
          'no-ssl-bump-domains': 'all', // Ignore SSL error on Android emulator
          port: 5757,
          logfile: 'sauce_connect.log'
        },
        public: 'public',
        build: process.env.CIRCLE_BUILD_NUM || process.env.SAUCE_BUILD_ID || Date.now()
      },
      captureTimeout: (1000*60)*5,
      browserNoActivityTimeout: (1000*60)*5,
      customLaunchers: devConfig.customLaunchers,
      browsers: Object.keys(devConfig.customLaunchers),
      singleRun: true
  }
  var ciConfig = extend(true, karmaConf(config), sauceLabsConfig)
  config.set(ciConfig)
}
