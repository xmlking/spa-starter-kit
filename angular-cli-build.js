// Angular-CLI build configuration
// This file lists all the node_modules files that will be used in a build
// Also see https://github.com/angular/angular-cli/wiki/3rd-party-libs

/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');
var path = require('path');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'core-js/client/shim.min.+(js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      'ng2-bootstrap/**/*.js'
    ],
    sassCompiler: {
      cacheExclude: [/\/_[^\/]+$/],
      includePaths: [
        'src/app'
      ],
      importer: function (url) {
        if (url.search('/node_modules') !== -1) {
          return {file: path.join(__dirname,  url)};
        }
      },
      sourceMap: true
    }
  });
};
