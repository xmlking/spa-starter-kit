import GeoLocation from '../models/GeoLocation';

export const PROVIDER_SEARCH_CONFIG =
{
    //Overwrite them in app.config() in app.js
    BASE_API_URL: 'http://localhost:8080/<YourBaaS>/ProviderSearchAPI'
};

export function ProviderRestangular(Restangular) {
    'use strict';
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(PROVIDER_SEARCH_CONFIG.BASE_API_URL);
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

export const PROVIDER_SEARCH_PARAMS =
{
    pageSize: 33,
    offset: 0,
    sort:'radius',
    order:'asc',
    facets:'PROV_GDR_CD,ADR_CTY_NM,SPCL_TYP_FULL_DESC',

    specialty: '',
    gender: '',
    address: '',
    radius: 50
};

export const PROVIDER_SEARCH_GEOLOCATION = new GeoLocation();

// private and unexported so no one else has access to it
const _providerCache = Symbol('providers', true);
let q = Symbol('q', true);
let sanitize = Symbol('sanitize', true);
let providerRestangular = Symbol('providerRestangular', true);

export class ProviderService {

    constructor($q, $sanitize, ProviderRestangular, CacheFactory) {
        console.info('in ProviderService....');

        this[q] = $q;
        this[sanitize] = $sanitize;
        this[providerRestangular] = ProviderRestangular;

        this[_providerCache] = new CacheFactory('providerCache', {
            maxAge: 600000, // items expire after ten min
            deleteOnExpire: 'passive', //  Items will be deleted if they are requested after they have expired, resulting in a miss.
            onExpire: function (key, value) {
                console.log(`cache expired for drug key: ${key}, value: ${value}`);
            }
        });
    }

    _sanitizeParams(geoLoc, params) {
        //let sanitizedParams = Object.assign({}, PROVIDER_SEARCH_PARAMS, params);
        let sanitizedParams = {
            pageSize: params.pageSize,
            offset: params.offset,
            sort: params.sort,
            order: params.order,
            facets: params.facets,

            lat: geoLoc.latLng.lat(),
            lng: geoLoc.latLng.lng(),
//            zip: geoLoc.zip,
            radius: params.radius
        };

        let query = '';
        if(params.specialty && params.specialty.length > 0) {
            query= `${query} AND specialty:"${params.specialty}"`;
        }
        if(params.gender && params.gender.length > 0) {
            query= `${query} AND PROV_GDR_CD:"${params.gender}"`;
        }

        if( query.startsWith(" AND")) {
            query = query.substring(4)
        }
        sanitizedParams.q = `( ${query} )`;
        console.debug(sanitizedParams.q);
        console.log('sanitizedParams',sanitizedParams);
        return sanitizedParams;
    }

    searchProviders(geoLoc = PROVIDER_SEARCH_GEOLOCATION, searchParams = PROVIDER_SEARCH_PARAMS) {
        console.log('geoLoc',geoLoc);
        console.log('searchParams',searchParams);
        return this[providerRestangular].all('providers').getList(this._sanitizeParams(geoLoc, searchParams));
    }

    getProvider(providerId) {
        var promise = new Promise((resolve, reject) => {
            let cachedProvider = this[_providerCache].get(providerId);
            if (cachedProvider) {
                resolve(cachedProvider);
            } else {
                this[providerRestangular].one('providers',providerId).get().then(provider => {
                    this[_providerCache].put(providerId, provider);
                    resolve(provider);
                }).catch(err => {
                    console.error(err);
                    reject(err);
                });
            }
        });
        return this[q].when(promise);
    }

}


