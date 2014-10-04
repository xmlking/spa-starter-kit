//- app/config.js
/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version/dependency  mgt of 3rd party libraries
 */
var require = {
    // alias libraries paths
    // bower:js  //TODO: wiredep paths from bower.json. bower-requirejs ???
    paths: {
        'requireLib': '../../bower_components/requirejs/require',
        'text': '../../bower_components/requirejs-text/text',
        'async': '../../bower_components/requirejs-plugins/src/async',
        'es6-shim': '../../bower_components/es6-shim/es6-shim',
        'reflect': '../../bower_components/harmony-reflect/reflect',
        'angular': '../../bower_components/angular/angular',
        'lodash.compat': '../../bower_components/lodash/dist/lodash.compat',
        'restangular': '../../bower_components/restangular/dist/restangular',
        'angular-growl': '../../bower_components/angular-growl-v2/build/angular-growl',
        'angular-ui-router': '../../bower_components/angular-ui-router/release/angular-ui-router',
        'http-auth-interceptor': '../../bower_components/angular-http-auth/src/http-auth-interceptor',
        'angular-animate': '../../bower_components/angular-animate/angular-animate',
        'angular-sanitize': '../../bower_components/angular-sanitize/angular-sanitize',
        'angular-mocks':    '../../bower_components/angular-mocks/angular-mocks',
        'angular-bootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'angular-translate': '../../bower_components/angular-translate/angular-translate',
        'angular-translate-loader-partial': '../../bower_components/angular-translate-loader-partial/angular-translate-loader-partial',
        'AngularGM': '../../bower_components/AngularGM/angular-gm',
        'angular-truncate': '../../bower_components/angular-truncate/src/truncate',
        'xeditable': '../../bower_components/angular-xeditable/dist/js/xeditable',
        'angular-cache': '../../bower_components/angular-cache/dist/angular-cache',
        'ng-table': '../../bower_components/ng-table/ng-table',
        'sockjs': '../../bower_components/bower-sockjs-client/sockjs',
        'stomp': '../../bower_components/stomp-websocket/lib/stomp',
        'term': '../../bower_components/term/src/term',
        'traceur-runtime': '../../node_modules/traceur/bin/traceur-runtime'
    },
    // endbower

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'angular': {exports: 'angular'},
        'angular-animate': {deps: ['angular']},
        'angular-sanitize': {deps: ['angular']},
        'angular-cache': {deps: ['angular']},
        'angular-translate': {deps: ['angular']},
        'angular-translate-loader-partial': {deps: ['angular-translate']},
        'lodash.compat': {exports: '_'},
        'restangular': {deps: ['angular', 'lodash.compat']},
        'angular-ui-router': {deps: ['angular']},
        'http-auth-interceptor': {deps: ['angular']},
        'angular-bootstrap': {deps: ['angular']},
        'angular-growl': {deps: ['angular']},
        'angular-truncate': {deps: ['angular']},
        'xeditable': {deps: ['angular']},
        'ng-table': {deps: ['angular']},
        'AngularGM': {deps: ['angular']},
        'reflect': {deps: ['es6-shim'],exports: 'Reflect'},
        'templates': {deps: ['angular']}
    }
};
