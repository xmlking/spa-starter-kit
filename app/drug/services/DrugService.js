export const DRUG_SEARCH_CONFIG =
{
    //Overwrite them in app.config() in app.js
    BASE_API_URL: 'http://localhost:8080/<YourBaaS>/DrugSearchAPI'
};

export function DrugRestangular(Restangular) {
    'use strict';
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(DRUG_SEARCH_CONFIG.BASE_API_URL);
        RestangularConfigurer.setDefaultHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'});
        //we need to set these params to make grails treat the requests as json and spring security plugin treat them as xhr requests and send 401 instead of html page
        RestangularConfigurer.setDefaultRequestParams({ format: 'json'}); //  'ajax':true

        RestangularConfigurer.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            var extractedData;
            if (operation === 'getList' && data.hasOwnProperty('metadata')) {
                extractedData = data.records;
                extractedData.metadata = data.metadata;
            } else {
                extractedData = data;
            }
            return extractedData;
        });
    });
}



export const DRUG_LIST_PARAMS =
{
    pageSize: 100,
	offset: 0,
	sort:'ndc',
	order:'asc',
	fields:'ndc,id,recordTypeA,recordTypeE,recordTypeG,recordTypeJ,recordTypeL'
};

export const DRUG_SEARCH_PARAMS =
{
    pageSize: 100,
	offset: 0,
	sort:'ndc',
	order:'asc',
	fields:'ndc,id,recordTypeA,recordTypeE,recordTypeG,recordTypeJ,recordTypeL',
	ndc: '',
	labelerName: '',
	productName: ''
};

// private and unexported so no one else has access to it
const _drugCache = Symbol('drugs', true);

export class DrugService {

	constructor($q, DrugRestangular, CacheFactory) {
		console.info('in DrugService....');

		this.$q = $q;
		this.DrugRestangular = DrugRestangular;

		this[_drugCache] = new CacheFactory('drugCache', {
			maxAge: 600000, // items expire after ten min
			deleteOnExpire: 'passive', //  Items will be deleted if they are requested after they have expired, resulting in a miss.
			onExpire: function (key, value) {
				console.log(`cache expired for drug key: ${key}, value: ${value}`);
			}
		});
	}

	listDrugs(listParams = DRUG_LIST_PARAMS) {
		return this.DrugRestangular.all('drugs').getList(listParams);
	}

	searchDrugs(searchParams = DRUG_SEARCH_PARAMS) {
		return this.DrugRestangular.all('drugs').all('search').getList(searchParams);
	}

	getDrug(drugId) {
		var promise = new Promise((resolve, reject) => {
			let cachedDrug = this[_drugCache].get(drugId);
			if (cachedDrug) {
				resolve(cachedDrug);
			} else {
				this.DrugRestangular.one('drugs',drugId).get().then(drug => {
					this[_drugCache].put(drugId, drug);
					resolve(drug);
				}).catch(err => {
					console.error(err);
					reject(err);
				});
			}
		});
		return this.$q.when(promise);
	}

}



