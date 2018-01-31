var karmaConf = require('./karma.conf.js')
var iPackage = require('../package.json')
var userConfig = require('../compile.js')
var extend = require('extend')
module.exports = function(config) {
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
      customLaunchers: userConfig.test.launchers,
      browsers: Object.keys(userConfig.test.launchers),
      singleRun: true
    }
    config.plugins.push('karma-sauce-launcher')
    config.set(extend(true, {}, karmaConf, sauceLabsConfig))
}
