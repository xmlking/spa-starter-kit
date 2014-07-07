//- app/scripts/provider/routes.js
import {PROVIDER_SEARCH_GEOLOCATION, PROVIDER_SEARCH_PARAMS} from './services/ProviderService';
export default function routes($stateProvider) {
    'use strict';
    return $stateProvider
        .state('providers', {
            abstract: true,
            url: '/providers',
            templateUrl: 'views/providers/providers.html',
            resolve: {
                geolocation: ['GeolocationService', function (GeolocationService) {
                    return GeolocationService.getGeolocation();
                }]
            }
        })
        .state('providers.search', {
            url: '', // Set up `providers.search` as default child state for `providers`
            access: {allowAnonymous: false, roles: ['ROLE_DATA_ADMIN']},
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
                        $scope.providers = providers;
                        $scope.doSearch = () => {
                            PROVIDER_SEARCH_PARAMS.offset = 0;
                            ProviderService.searchProviders().then(providers => {
                                $scope.providers = providers;
                            });
                        };
                    }
                },
                'filters@providers.search': {
                    templateUrl: 'views/providers/providers.search.html',
                    controller: 'ProviderSearchController as psc'
                },
                'map@providers.search': {
                    templateUrl: 'views/providers/providers.map.html',
                    controller: 'ProviderMapController as pmc'
                },
                'results@providers.search': {
                    templateUrl: 'views/providers/providers.results.html',
                    controller: 'ProviderResultsController as prc'
                }
            }
        });
}
