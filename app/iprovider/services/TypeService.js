let _typeCache = Symbol('types', true);

export default class TypeService {

  constructor($http, CacheFactory, ProviderRestangular) {
    this.$http = $http;
    this.ProviderRestangular = ProviderRestangular;

    this[_typeCache] = new CacheFactory('typeCache', {
      maxAge: 3600000,
      cacheFlushInterval: 60 * 60 * 1000,
      deleteOnExpire: 'aggressive',
      storageMode: 'localStorage'
    });
  }

  getProviderTypes() {
    return this.ProviderRestangular.all('type').all('providers')
      .withHttpConfig({cache: this[_typeCache]}).getList()
      .then( (data) => {
        return data.plain();
      })
  }

  getGenderTypes() {
    return this.ProviderRestangular.all('type').all('genders')
      .withHttpConfig({cache: this[_typeCache]}).getList()
      .then( (data) => {
        return data.plain();
      })
  }

}
