export const IPROVIDER_SEARCH_CONFIG =
{
  //Overwrite this in app.config() in app.js
  BASE_API_URL: 'http://localhost:8080/<YourBaaS>/Provider_CRUD_API',
  pageSize: 3//33
};

export function ProviderRestangular(Restangular) {
  'use strict';
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl(IPROVIDER_SEARCH_CONFIG.BASE_API_URL);
    RestangularConfigurer.addResponseInterceptor((data, operation, what, url, response, deferred) => {
      var extractedData = data;
      if (response.headers('Content-Range')) {
        let totalCount = response.headers('Content-Range').split('/')[1];
        extractedData.totalCount = parseInt(totalCount);
      }
      return extractedData;
    });
  });
}

export const IPROVIDER_SEARCH_PARAMS =
{
  pageSize: IPROVIDER_SEARCH_CONFIG.pageSize,
  page: 1,
  filter: {},
  sort:{},
  includes:'id,type,firstName,lastName,gender,dateOfBirth',
  facets:'PROV_GDR_CD,ADR_CTY_NM,SPCL_TYP_FULL_DESC'
};

export class ProviderService {

  constructor(ProviderRestangular) {
    this.providerRestangular = ProviderRestangular;
  }

  list(params = IPROVIDER_SEARCH_PARAMS) {

    var copy = Object.assign({}, params);
    delete copy.filter;
    delete copy.sort;

    if (params.filter) {
      angular.forEach(params.filter, (value, key) => {
        if(value) {
          copy['filter.' + key ] = value;
        }
      });
    }

    if (params.sort && params.sort.sort) {
      copy.sort = params.sort.sort;
      copy.order = (params.sort.order == 'asc') ? 'desc' : 'asc';
    }

    return this.providerRestangular.all('providers').getList(copy);
  }

  get(id) {
    return this.providerRestangular.one('providers', id).get().then( (provider) => {
      provider.dateOfBirth = new Date(provider.dateOfBirth);
      provider.effectiveDate = new Date(provider.effectiveDate);
      provider.cancellationDate = new Date(provider.cancellationDate);
      return provider;
    });
  }

  create() {
    return this.providerRestangular.one('providers','create').get().then( (provider) => {
      provider.fromServer = false;
      return provider;
    });
  }

  delete(id) {
    return this.providerRestangular.one('providers', id).delete();
  }

  save(data) {
    return data.save();
  }

  update(data) {
    return data.update();
  }


  getResourceName() {
    return 'Provider';
  };
}


