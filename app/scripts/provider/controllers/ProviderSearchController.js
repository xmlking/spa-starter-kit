import {PROVIDER_SEARCH_PARAMS, PROVIDER_SEARCH_GEOLOCATION} from '../services/ProviderService';

// private and unexported so no one else has access to it
let scope = Symbol('scope', true);
let state = Symbol('state', true);
let http = Symbol('http', true);
let providerRestangular = Symbol('providerRestangular', true);
let geocoderService = Symbol('geocoderService', true);
let providerService = Symbol('providerService', true);

export default class ProviderSearchController {

    constructor($scope, $http, $state, ProviderRestangular, GeocoderService,  ProviderService) {
        console.log('in ProviderSearchController...');
        this[scope] = $scope;
        this[state] = $state;
        this[http] = $http;
        this[providerRestangular] = ProviderRestangular;
        this[geocoderService] = GeocoderService;
        this[providerService] = ProviderService;

        //initialize search options
        this.providerSearchParams = PROVIDER_SEARCH_PARAMS;
        this.providerSearchGeolocation = PROVIDER_SEARCH_GEOLOCATION;

        this.specialities  = ['PEDIATRICS', 'CARDIOLOGY', 'NEPHROLOGY', 'CHIROPRACTIC MEDICINE'];
        this.searchCollapsed =  true;
        this.status = {
            isopen: false
        };

        // Auto-Search: TODO Reduce the speed
//        $scope.$watch('PROVIDER_SEARCH_GEOLOCATION.latLng', () => {
//            this.centerSearch();
//        });

        $scope.$parent.centerSearch = this.centerSearch;
    }

    setDistance(dist) {
        this.providerSearchParams.distance = dist;
        this.status.isopen = false;
    }

    onSelect ($item, $model, $label) {
        this.providerSearchGeolocation.latLng = $model.geometry.location;
        this.providerSearchGeolocation.address =  $model.formatted_address;
        // this.providerSearchGeolocation.zip = _getZip($model);
    }

    _getZip(address) {
        let addressComponents = address.address_components;
        let zippy = addressComponents.filter((i) => { return i.types[0] === 'postal_code'; });
        if (undefined !== zippy && zippy.length > 0) {
            return zippy[0].long_name;
        }
    }

    dbCursorMove(n){
        PROVIDER_SEARCH_PARAMS.offset = PROVIDER_SEARCH_PARAMS.offset + n;
        //$this[state].reload();
        this[state].transitionTo(this[state].current, null , {reload: true, inherit: true, notify: true});
    }

    //TODO with bacon.js
    getLocations(address) {
        return this[geocoderService].getLocations(address);
    }

    getSpecialities(prefix) {
        return this[providerRestangular].all('providers').all('specialties').getList(
            {
                'prefix': angular.uppercase(prefix)
            }
        );
    }

}
