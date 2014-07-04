//- app/scripts/home/routes.js
export default function routes($urlRouterProvider, $stateProvider) {
    'use strict';

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise('/home');

    return $stateProvider
        .state('home', {
            url: '/home',
            access: {allowAnonymous: true},
            templateUrl: 'views/home/home.html',
            controller: 'HomeController'
        });
}
