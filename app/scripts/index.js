//- app/scripts/app.js
/**
 * loads sub modules and wraps them up into the main module
 * this file should be used for top-level module definitions only
 */

import './vendor';
import {Diary} from 'diary/diary';
import {ConsoleReporter} from 'diary/reporters/console';

import commonModule from './common/index';
import homeModule from './home/index';
import drugModule from './drug/index';
import providerModule from './provider/index';
import experimentsModule from './experiments/index';
// @if env='TEST'
import testEnvModule from './test.env';
// @endif
// @if env='DEV'
import devEnvModule from './dev.env';
// @endif
// @if env='PROD'
import templateModule from './templates';
// @endif


let mainModule = angular.module('spaApp',
    [
        // 3rd party modules
        'ui.router',
        'ui.bootstrap',
        'ngAnimate',
        'ngSanitize',
        'restangular',
        'pascalprecht.translate',
        'angular-growl',
        'xeditable',
        'angular-data.DSCacheFactory',

        // App sub-modules
		commonModule,
		homeModule
    ]);

mainModule.config(($stateProvider, $urlRouterProvider, growlProvider, $httpProvider, $translateProvider, $translatePartialLoaderProvider, DSCacheFactoryProvider) => {
    'use strict';

    // enable html5Mode for pushstate ('#'-less URLs)
    // $locationProvider.html5Mode(true);

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // This sets a global timeout for growl messages.
    growlProvider.globalTimeToLive({success: 2000, error: 5000, warning: 2000, info: 2000});
    //growlProvider.globalEnableHtml(true);

    // load 'en_EN' table on startup
    $translateProvider.preferredLanguage('en_EN');
    $translateProvider.fallbackLanguage(['en_EN']);
//      $translateProvider.useLocalStorage();

    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: 'scripts/{part}/i18n/{lang}.json'
    });
    $translatePartialLoaderProvider.addPart('home');

    //load static translations to prevent FOUC
    var staticTranslationsEn = { // jshint unused: false
        'BUTTON_LANG_DE': 'german',
        'BUTTON_LANG_EN': 'english'
    };
    var staticTranslationsDe = {
        'BUTTON_LANG_DE': 'deutsch',
        'BUTTON_LANG_EN': 'englisch'
    };
//        $translatePartialLoaderProvider.setPart('en_EN', 'home', staticTranslationsEn);
//        $translatePartialLoaderProvider.setPart('de_DE', 'home', staticTranslationsDe);

    // optionally set cache defaults
    DSCacheFactoryProvider.setCacheDefaults({
        maxAge: 3600000,
        deleteOnExpire: 'aggressive'
    });

    // Logger
    Diary.reporter( new ConsoleReporter({
        console: window.console
    }));

});

mainModule.run(($rootScope, editableOptions, $http, $log, growl, $state, $stateParams, $translate, DSCacheFactory, AuthenticationService, AuthorizationService) => {
    'use strict';

    $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
        $translate.refresh(); //TODO do we still $translate.refresh() in resolvers ?
    });

    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'

    console.table(DSCacheFactory.info());

    // Create default cache
    new DSCacheFactory('defaultCache', {
        maxAge: 900000, // Items added to this cache expire after 15 minutes.
        cacheFlushInterval: 6000000, // This cache will clear itself every hour.
        deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
    });
    //$http.defaults.cache = DSCacheFactory.get('defaultCache');

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // To access Underscore (Lodash) globally including templates
    $rootScope._ = window._;

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        // angular.element('#spinner').removeClass('heartbeat').addClass('spinner');

        //For redirecting to view that is requested before 401/403 error fired.
        $rootScope.destinationState = {state: toState, stateParams: toParams};
        //To be used for UI back button //won't work when page is reloaded.
        $rootScope.previousState = {state: fromState, stateParams: fromParams};

        let allowAnonymous = (
            typeof toState.access === 'undefined' ||
            typeof toState.access.allowAnonymous === 'undefined') ? true : toState.access.allowAnonymous;

        if (!allowAnonymous) {
            let authorizedRoles = toState.access.roles;
            if (!AuthorizationService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthorizationService.isAuthenticated()) {
                    // user is not allowed
                    AuthenticationService.notAuthorized();
                } else {
                    // user is not logged in
                    AuthenticationService.notAuthenticated();
                }
                return;
            }
        }
        //has to be last statement in this event handler.
        $rootScope.spinner = true;
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) { // jshint unused: false
        $rootScope.spinner = false;
        $rootScope.destinationState = false;

    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        growl.error('State changed error :( =', {ttl: 10000});
        $log.error('Some service has failed: ', error.config ? error.config.url : error);
        // angular.element('#spinner').removeClass('spinner').addClass('heartbeat');
    });

    // back button function called from back button's ng-click='back()'
    $rootScope.back = function () {
        $state.go($rootScope.previousState.state.name, $rootScope.previousState.stateParams);
        $rootScope.previousState = false;
    };
});

//remaining App sub-modules
mainModule.requires.push(drugModule);
mainModule.requires.push(providerModule);
mainModule.requires.push(experimentsModule);

// @if env='TEST'
mainModule.requires.push(testEnvModule);
// @endif
// @if env='DEV'
mainModule.requires.push(devEnvModule);
// @endif
// @if env='PROD'
mainModule.requires.push('templates');
// @endif


export default mainModule;
