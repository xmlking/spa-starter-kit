import {PROVIDER_SEARCH_PARAMS, PROVIDER_SEARCH_GEOLOCATION} from '../services/ProviderService';

//let scope = Symbol('scope', true);
//let state = Symbol('state', true);

export default class ProviderFacetsController {
    constructor($scope, $state, $timeout, GeocoderService) {
//        this[scope] = $scope;
//        this[state] = $state;
        this.open = undefined;
        this.providerSearchParams = PROVIDER_SEARCH_PARAMS;

        $scope.genders = $scope.providers.metadata.facets.PROV_GDR_CD;
        $scope.cities = $scope.providers.metadata.facets.ADR_CTY_NM;
        $scope.specialties = $scope.providers.metadata.facets.SPCL_TYP_FULL_DESC;

        $scope.$watch('providers', (newProviders) => {
            console.log('providers   changed... will update facets',newProviders.metadata.facets.PROV_GDR_CD);
            //this.genders = newProviders.metadata.facets.PROV_GDR_CD; //TODO NOT working
            $scope.genders = newProviders.metadata.facets.PROV_GDR_CD;
            $scope.cities = newProviders.metadata.facets.ADR_CTY_NM;
            $scope.specialties = newProviders.metadata.facets.SPCL_TYP_FULL_DESC;
        });

        $scope.$watch(
            () => this.open1,
            (newVal, oldVal) => nv.graphs[0].update()
        );
        $scope.$watch(
            () => this.open2,
            (newVal, oldVal) => nv.graphs[1].update()
        );
        $scope.$watch(
            () => this.open3,
            (newVal, oldVal) => nv.graphs[2].update()
        );

        $scope.$on('elementClick.directive', (angularEvent, event) => {
            switch (angularEvent.targetScope.id) {
                case 'genders':
                    PROVIDER_SEARCH_PARAMS.gender = event.label;
                    $scope.doSearch();
                    break;
                case 'specialties':
                    PROVIDER_SEARCH_PARAMS.specialty = event.label;
                    $scope.doSearch();
                    break;

                case 'cities':
                    GeocoderService.getLocations(event.label)
                        .then( add => {
                            console.log(add[0].geometry.location);
                            PROVIDER_SEARCH_GEOLOCATION.latLng = add[0].geometry.location;
                            PROVIDER_SEARCH_GEOLOCATION.address =  add[0].formatted_address;
                            PROVIDER_SEARCH_PARAMS.address = add[0].formatted_address;
                            $scope.doSearch();
                        })
                        .catch(console.error);
                    break;
            }

        });

        $scope.$on('legendClick.directive', (angularEvent, event) => {
            console.log('legendClick event', event);
        });
    }

    xFunction() {
        return (d) => {
            return d.value;
        };
    }
    yFunction() {
        return (d) => {
            return d.count;
        };
    }
    descriptionFunction() {
        return (d) => {
            return d.value;
        }
    }

}