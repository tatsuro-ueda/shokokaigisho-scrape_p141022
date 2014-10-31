/**
 * Created by weed on 2014/10/22.
 */

/*
exports.config = {
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      'excludeSwitches': ['ignore-certificate-errors']
    }
  },

  specs: ['*.js'],

  jasmineNodeOpts: {
    isVerbose: true,
    showColors: true,
    defaultTimeoutInterval: 30000,
    includeStackTrace: false
  },

  onPrepare: function () {
    jasmine.getEnv().afterEach(function () {
      var spec = jasmine.getEnv().currentSpec;
      if (spec.results().failedCount > 0) {
        browser.pause();
      }
    });
  }
}
*/

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],

  jasmineNodeOpts: {
    isVerbose: true,
    showColors: true,
    defaultTimeoutInterval: 30000,
    includeStackTrace: false
  },

  onPrepare: function () {
    jasmine.getEnv().afterEach(function () {
      var spec = jasmine.getEnv().currentSpec;
      if (spec.results().failedCount > 0) {
        browser.pause();
      }
    });
  }
};
