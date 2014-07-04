//- test/karma.conf.js

var traceurOptions = require('../gulp/config').traceur;
traceurOptions.typeAssertions = false;
traceurOptions.sourceMap = false;

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'requirejs', 'traceur'],

    files: [
      'test-main.js',
      {pattern: '../app/scripts/**/*.js', included: false},
      {pattern: 'unit/**/*.js', included: false}
    ],

    exclude: [
      '../app/scripts/bootstrap.js'
    ],

    preprocessors: {
      '../app/scripts/**/*.js' : ['traceur'],
      'unit/**/*.js': ['traceur']
    },

    browsers: ['Chrome'], // browsers: ['Chrome', 'PhantomJS']

    traceurPreprocessor: {
      options: traceurOptions
    }
  });
};
