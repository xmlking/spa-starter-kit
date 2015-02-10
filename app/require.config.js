//- app/config.js
/**
 * RequireJS configuration file
 * This file's `paths` will be overwritten based on bower.json with `gulp wiredep` or `bower install xyz` commands.
 * Create aliases with `map` i.e., `underscore: lodash`
 * Use `packages` to load sub-modules/files relative to main-module directory.
 * In bower.json if you specify overrides(`main`) for `requirejs-plugins` as directory,(i.e., "main": "src/") you can load sub-modules with 'requirejs-plugins/async'
 */
var require = {
    shim: {
        angular: {
            exports: 'angular'
        },
        'angular-animate': {
            deps: [
                'angular'
            ]
        },
        'angular-sanitize': {
            deps: [
                'angular'
            ]
        },
        'angular-cache': {
            deps: [
                'angular'
            ]
        },
        'angular-translate': {
            deps: [
                'angular'
            ]
        },
        'angular-translate-loader-partial': {
            deps: [
                'angular-translate'
            ]
        },
        lodash: {
            exports: '_'
        },
        restangular: {
            deps: [
                'angular',
                'lodash'
            ]
        },
        'angular-ui-router': {
            deps: [
                'angular'
            ]
        },
        'angular-ui-router-tabs': {
            deps: [
                'angular'
            ]
        },
        'angular-http-auth': {
            deps: [
                'angular'
            ]
        },
        'angular-bootstrap': {
            deps: [
                'angular'
            ]
        },
        'angular-growl-v2': {
            deps: [
                'angular'
            ]
        },
        'angular-truncate': {
            deps: [
                'angular'
            ]
        },
        'angular-xeditable': {
            deps: [
                'angular'
            ]
        },
        'ng-table': {
            deps: [
                'angular'
            ]
        },
        AngularGM: {
            deps: [
                'angular'
            ]
        },
        'harmony-reflect': {
            exports: 'Reflect'
        },
        nvd3: {
            deps: [
                'd3'
            ]
        },
        'angularjs-nvd3-directives': {
            deps: [
                'angular',
                'nvd3'
            ]
        },
        'angular-strap.tpl': {
            deps: [
                'angular',
                'angular-strap'
            ]
        },
        'angular-strap-modules/tooltip.tpl': {
            deps: [
                'angular',
                'angular-strap-modules/dimensions',
                'angular-strap-modules/tooltip'
            ]
        },
        'angular-strap-modules/datepicker.tpl': {
            deps: [
                'angular',
                'angular-strap-modules/date-parser',
                'angular-strap-modules/date-formatter',
                'angular-strap-modules/datepicker',
                'angular-strap-modules/tooltip.tpl'
            ]
        },
        'angular-strap-modules/affix': {
            deps: [
                'angular',
                'angular-strap-modules/dimensions',
                'angular-strap-modules/debounce'
            ]
        },
        'angular-strap-modules/scrollspy': {
            deps: [
                'angular',
                'angular-strap-modules/dimensions',
                'angular-strap-modules/debounce'
            ]
        },
        templates: {
            deps: [
                'angular'
            ]
        }
    },
    map: {
        '*': {
            underscore: 'lodash'
        }
    },
    packages: [
        {
            name: 'angular-strap-modules',
            location: '../bower_components/angular-strap/dist/modules',
            main: 'datepicker.tpl'
        },
        {
            name: 'diary',
            main: 'diary'
        },
        {
            name: 'di',
            main: 'index'
        }
    ],
    paths: {
        AngularGM: '../bower_components/AngularGM/angular-gm',
        angular: '../bower_components/angular/angular',
        'angular-animate': '../bower_components/angular-animate/angular-animate',
        'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'angular-cache': '../bower_components/angular-cache/dist/angular-cache',
        'angular-growl-v2': '../bower_components/angular-growl-v2/build/angular-growl',
        'angular-http-auth': '../bower_components/angular-http-auth/src/http-auth-interceptor',
        'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
        'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize',
        'angular-strap': '../bower_components/angular-strap/dist/angular-strap',
        'angular-strap.tpl': '../bower_components/angular-strap/dist/angular-strap.tpl',
        'angular-translate': '../bower_components/angular-translate/angular-translate',
        'angular-translate-loader-partial': '../bower_components/angular-translate-loader-partial/angular-translate-loader-partial',
        'angular-truncate': '../bower_components/angular-truncate/src/truncate',
        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
        'angular-ui-router-tabs': '../bower_components/angular-ui-router-tabs/src/ui-router-tabs',
        'angular-xeditable': '../bower_components/angular-xeditable/dist/js/xeditable',
        'angularjs-nvd3-directives': '../bower_components/angularjs-nvd3-directives/dist/angularjs-nvd3-directives',
        d3: '../bower_components/d3/d3',
        nvd3: '../bower_components/nvd3/nv.d3',
        assert: '../bower_components/assert/dist/amd/assert',
        'bower-sockjs-client': '../bower_components/bower-sockjs-client/sockjs',
        di: '../bower_components/di/dist/amd',
        diary: '../bower_components/diary/dist/amd',
        'harmony-reflect': '../bower_components/harmony-reflect/reflect',
        lodash: '../bower_components/lodash/dist/lodash.compat',
        moment: '../bower_components/moment/moment',
        'ng-table': '../bower_components/ng-table/dist/ng-table',
        'observe-polyfill': '../bower_components/observe-polyfill/Object.observe.poly',
        requirejs: '../bower_components/requirejs/require',
        'requirejs-plugins': '../bower_components/requirejs-plugins/src',
        restangular: '../bower_components/restangular/dist/restangular',
        'stomp-websocket': '../bower_components/stomp-websocket/lib/stomp',
        term: '../bower_components/term/src/term',
        text: '../bower_components/text/text',
        'traceur-runtime': '../bower_components/traceur-runtime/traceur-runtime'
    }
};
