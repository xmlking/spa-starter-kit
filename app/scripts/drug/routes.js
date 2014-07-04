//- app/scripts/drug/routes.js
export default function routes($urlRouterProvider, $stateProvider) {
    'use strict';

    // redirect to default child
    $urlRouterProvider.when('/drugs', '/drugs/list');

    return $stateProvider
        .state('drugs', {
            abstract: true,
            url: '/drugs',
            templateUrl: 'views/drugs/drugs.html'
        })
        .state('drugs.list', {
            url: '/list',
            resolve: {
                drugs: ['DrugService','$stateParams', function (DrugService,$stateParams) {
                    return DrugService.listDrugs();
                }]
            },
            views: {
                '@drugs': {
                    controller: function ($scope, drugs) {
                        console.log('in drugs.list controller');
                        $scope.searchCollapsed = true;
                        $scope.metadata = drugs.metadata;
                    }
                },
                'filters@drugs.list': {
                    templateUrl: 'views/drugs/drugs.search.html',
                    controller: 'DrugSearchController as dsc'
                },
                'results@drugs.list': {
                    templateUrl: 'views/drugs/drugs.results.html',
                    controller: 'DrugResultsController as drc'
                }
            }
        })
        .state('drugs.search', {
            url: '/search',
            resolve: {
                drugs: ['DrugService', function (DrugService) {
                    return DrugService.searchDrugs();
                }]
            },
            views: {
                '@drugs': {
                    controller: function ($scope, drugs) {
                        console.log('in drugs.search controller');
                        $scope.metadata = drugs.metadata;
                    }
                },
                'filters@drugs.search': {
                    templateUrl: 'views/drugs/drugs.search.html',
                    controller: 'DrugSearchController as dsc'
                },
                'results@drugs.search': {
                    templateUrl: 'views/drugs/drugs.results.html',
                    controller: 'DrugResultsController as drc'
                }
            }
        })
        //FIXME : wish UI-Router supports multiple inheritance for child state to avoid duplicate code
        .state('drugs.list.detail', {
            url: '/:drugId',
            resolve: {
                drug:['DrugService', '$stateParams', function(DrugService, $stateParams){
                    return DrugService.getDrug($stateParams.drugId);
                }]
            },
            views: {
                'details@drugs.list': {
                    templateUrl: 'views/drugs/drugs.detail.html',
                    controller: 'DrugDetailController'
                }
            }
        })
        .state('drugs.search.detail', {
            url: '/:drugId',
            resolve: {
                drug:['DrugService', '$stateParams', function(DrugService, $stateParams){
                    return DrugService.getDrug($stateParams.drugId);
                }]
            },
            views: {
                'details@drugs.search': {
                    templateUrl: 'views/drugs/drugs.detail.html',
                    controller: 'DrugDetailController'
                }
            }
        });
}
