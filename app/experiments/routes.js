//- app/experiments/routes.js
export default function routes($stateProvider) {
    'use strict';

    return $stateProvider
        .state('slow', {
            url: '/slow',
            templateUrl: 'experiments/views/experiment.html',
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
            templateUrl: 'experiments/views/experiment.html',
            controller: 'ExperimentController'
        })
        .state('translations', {
            url: '/translations',
            templateUrl: 'experiments/views/growlTranslate.html',
            controller: 'GrowlTranslateDemoController',
            resolve: {
                experimentsTranslations: function ($translatePartialLoader, $translate) {
                    $translatePartialLoader.addPart('experiments');
                }
            }
        })
        .state('elements', {
            url: '/elements',
            templateUrl: 'experiments/views/elements.html',
            controller: 'ElementsController'
        })
        .state('messaging', {
            url: '/messaging',
            templateUrl: 'experiments/views/messaging.html',
            controller: 'MessagingController as mc'
        })
        .state('terminal', {
            url: '/terminal/:containerId',
            access: {allowAnonymous: false},
            templateUrl: 'experiments/views/terminal.html',
            controller: 'TerminalController as tc',
            onExit: function(){
                console.log('exit terminal');
            }
        })
        .state('todoMVC', {
            url: '/todo',
            templateUrl: 'experiments/views/todo.html',
            controller: 'TodoController as tc'
        });
}
