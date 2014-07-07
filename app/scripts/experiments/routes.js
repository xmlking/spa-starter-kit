//- app/scripts/experiments/routes.js
export default function routes($stateProvider) {
    'use strict';

    return $stateProvider
        .state('slow', {
            url: '/slow',
            templateUrl: '../views/experiments/experiment.html',
            controller: 'ExperimentController',
            resolve: {
                dummy: ['$stateParams', '$timeout', function ($stateParams, $timeout) {
                    //TODO when Proposal:'register new modules after it has been bootstrapped' has been implemented.
//                    require(['test.env'], test => {
//                          angular.module('provider').requires.push('test.env');
//                    });
                    return $timeout( () => {
                        return [];
                    }, 3000);
                }]
            },
            onEnter: function (dummy) {
                if (dummy) {
                    console.log('inside slow: onEnter');
                }
            },
            onExit: function (dummy) {
                if (dummy) {
                    console.log('inside slow: onExit');
                }
            }
        })
        .state('experiments', {
            url: '/experiments',
            templateUrl: '../views/experiments/experiment.html',
            controller: 'ExperimentController'
        })
        .state('translations', {
            url: '/translations',
            templateUrl: '../views/experiments/growlTranslate.html',
            controller: 'GrowlTranslateDemoController',
            resolve: {
                myTranslations: function ($translatePartialLoader, $translate) {
                    $translatePartialLoader.addPart('common');
                    console.log('loading common module translations...');
                    return $translate.refresh();
                }
            }
        })
        .state('elements', {
            url: '/elements',
            templateUrl: '../views/experiments/elements.html',
            controller: 'ElementsController'
        })
        .state('todoMVC', {
            url: '/todo',
            templateUrl: '../views/experiments/todo.html',
            controller: 'TodoController as tc'
        });
}
