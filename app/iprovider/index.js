//- app/provider/index.js
import routes from './routes';
import ProviderListController from './controllers/ProviderListController';
import ProviderShowController from './controllers/ProviderShowController';
import ProviderCreateEditController from './controllers/ProviderCreateEditController';
import {IPROVIDER_SEARCH_CONFIG, ProviderRestangular, ProviderService} from './services/ProviderService';
import TypeService from './services/TypeService';

let moduleName = 'spaApp.iprovider';
let iproviderModule = angular.module(moduleName,
	[
		// 3rd party modules unique to this module
    'restangular'
	]);

iproviderModule.factory('ProviderRestangular',ProviderRestangular);
iproviderModule.service('ProviderService', ProviderService);
iproviderModule.service('TypeService', TypeService);


iproviderModule.controller('ProviderListController', ProviderListController);
iproviderModule.controller('ProviderShowController', ProviderShowController);
iproviderModule.controller('ProviderCreateEditController', ProviderCreateEditController);

iproviderModule.config(routes);
iproviderModule.config( () => {
  IPROVIDER_SEARCH_CONFIG.BASE_API_URL= 'http://localhost:8080/apiApp/api';
});

//------
function ProviderResource(CrudResourceFactory) {
  return CrudResourceFactory('/providers', 'Provider');
}
iproviderModule.factory('ProviderResource', ProviderResource);
//iproviderModule.value('defaultCrudResource', 'ProviderResource');
iproviderModule.service('defaultCrudResource', ProviderService);
//------

export default moduleName;
