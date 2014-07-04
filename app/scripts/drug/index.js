//- app/scripts/drug/index.js
import routes from './routes';
import DrugSearchController from './controllers/DrugSearchController';
import DrugResultsController from './controllers/DrugResultsController';
import DrugDetailController from './controllers/DrugDetailController';
import {DRUG_SEARCH_CONFIG, DrugRestangular, DrugService} from './services/DrugService';

let moduleName = 'spaApp.drug';
let drugModule = angular.module(moduleName,
	[
		// 3rd party modules
        'restangular',
		'ngTable'
	]);

drugModule.factory('DrugRestangular',DrugRestangular);
drugModule.service('DrugService', DrugService);

drugModule.controller('DrugSearchController', DrugSearchController);
drugModule.controller('DrugResultsController', DrugResultsController);
drugModule.controller('DrugDetailController', DrugDetailController);

drugModule.config(routes);
drugModule.config( () => {
    'use strict';
    DRUG_SEARCH_CONFIG.BASE_API_URL= 'http://ve7d00000010:8080/apiApp';
});

export default moduleName;