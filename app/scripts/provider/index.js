//- app/scripts/provider/index.js
import routes from './routes';
import ProviderSearchController from './controllers/ProviderSearchController';
import ProviderResultsController from './controllers/ProviderResultsController';
import ProviderMapController from './controllers/ProviderMapController';
import ProviderDetailController from './controllers/ProviderDetailController';
import {TelizeRestangular, GeolocationService}  from'./services/GeolocationService';
import GeocoderService from './services/GeocoderService';
import {PROVIDER_SEARCH_CONFIG, ProviderRestangular, ProviderService} from './services/ProviderService';
import StartFromFilter from './utils/StartFromFilter';

let moduleName = 'spaApp.provider';
let providerModule = angular.module(moduleName,
	[
		// 3rd party modules //TODO is there any benefit declaring them again per sub-module?
        'restangular',
		'ngTable',
        'ui.bootstrap',
        'AngularGM',
        'truncate'
	]);

providerModule.factory('ProviderRestangular',ProviderRestangular);
providerModule.factory('TelizeRestangular',TelizeRestangular);
providerModule.service('GeolocationService', GeolocationService);
providerModule.service('GeocoderService', GeocoderService);
providerModule.service('ProviderService', ProviderService);

providerModule.controller('ProviderSearchController', ProviderSearchController);
providerModule.controller('ProviderResultsController', ProviderResultsController);
providerModule.controller('ProviderMapController', ProviderMapController);
providerModule.controller('ProviderDetailController', ProviderDetailController);

providerModule.filter('startFrom', StartFromFilter);

providerModule.config(routes);
providerModule.config( () => {
    'use strict';
    PROVIDER_SEARCH_CONFIG.BASE_API_URL ='http://ve7d00000179:8080/REST_HBS_Canonical_Resiliency/service';
});

export default moduleName;