//- app/common/routes.js
export default function routes($urlRouterProvider, $stateProvider) {
    'use strict';

    return $stateProvider
        .state('settings', {
            url: '/settings',
            access: {allowAnonymous: false},
            templateUrl: 'common/views/settings.html',
            controller: 'SettingsController'
        })
        .state('testAuth', {
            url: '/testAuth',
            access: {allowAnonymous: false},
            templateUrl: 'experiments/views/testAuth.html',
            controller: 'LoginController as lc'
        });
}
