//- app/provider/routes.js
import {PROVIDER_SEARCH_GEOLOCATION, PROVIDER_SEARCH_PARAMS} from './services/ProviderService';
export default function routes($stateProvider) {
    'use strict';
    return $stateProvider
        .state('providers', {
            abstract: true,
            url: '/providers',
            templateUrl: 'provider/views/providers.html',
            resolve: {
                geolocation: ['GeolocationService', function (GeolocationService) {
                    return GeolocationService.getGeolocation();
                }]
            }
        })
        .state('providers.search', {
            url: '', // Set up `providers.search` as default child state for `providers`
            access: {allowAnonymous: false, roles: ['ROLE_USER']},
            resolve: {
                providers: ['ProviderService', 'angulargmUtils', 'geolocation', function (ProviderService, angulargmUtils , geolocation) {
                    if(angulargmUtils.hasNaN(PROVIDER_SEARCH_GEOLOCATION.latLng)) {
                        PROVIDER_SEARCH_GEOLOCATION.latLng = geolocation.latLng;
                        PROVIDER_SEARCH_GEOLOCATION.address = geolocation.address;
                    }
                    return ProviderService.searchProviders();
                }]
            },
            views: {
                '@providers': {
                    controller: function ($scope, providers, ProviderService) {
                        $scope.searchCollapsed = true;
                        $scope.providers = providers.sort( (a, b)=> a.addresses[0].distance - b.addresses[0].distance );
                        $scope.doSearch = () => {
                            PROVIDER_SEARCH_PARAMS.offset = 0;
                            ProviderService.searchProviders().then(providers => {
                                $scope.providers = providers.sort( (a, b)=> a.addresses[0].distance - b.addresses[0].distance );
                            });
                        };
                    }
                },
                'filters@providers.search': {
                    templateUrl: 'provider/views/providers.search.html',
                    controller: 'ProviderSearchController as psc'
                },
                'map@providers.search': {
                    templateUrl: 'provider/views/providers.map.html',
                    controller: 'ProviderMapController as pmc'
                },
                'results@providers.search': {
                    templateUrl: 'provider/views/providers.results.html',
                    controller: 'ProviderResultsController as prc'
                }
            }
        })
        .state('providers.search.detail', {
            url: '/:providerId',
            resolve: {
                provider:['ProviderService', '$stateParams', function(ProviderService, $stateParams){
                    return ProviderService.getProvider($stateParams.providerId);
                }]
            },
            views: {
                'details@providers.search': {
                    templateUrl: 'provider/views/providers.detail.html',
                    controller: 'ProviderDetailController as pdc'
                }
            }
        })
        .state('providers.detail', {
            url: '/detail/:providerId',
            resolve: {
                provider:['ProviderService', '$stateParams', function(ProviderService, $stateParams){
                    return ProviderService.getProvider($stateParams.providerId);
                }]
            },
            views: {
                'details@providers': {
                    templateUrl: 'provider/views/providers.detail.html',
                    controller: 'ProviderDetailController as pdc'
                }
            }
        });
}
