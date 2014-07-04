//- app/scripts/common/routes.js
export default function routes($urlRouterProvider, $stateProvider) {
    'use strict';

    return $stateProvider
        .state('settings', {
            url: '/settings',
            access: {allowAnonymous: false},
            templateUrl: 'views/common/settings.html',
            controller: 'SettingsController'
        })
        .state('testAuth', {
            url: '/testAuth',
            access: {allowAnonymous: false},
            templateUrl: '../views/experiments/testAuth.html',
            controller: 'LoginController as lc'
        });
}
