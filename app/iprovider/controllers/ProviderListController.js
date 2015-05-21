import {IPROVIDER_SEARCH_CONFIG, IPROVIDER_SEARCH_PARAMS, ProviderRestangular, ProviderService} from '../services/ProviderService';

export default class ProviderListController {

  constructor($scope, providerList, providerTypes, genderTypes, ProviderRestangular, ProviderService) {
    this.providerList = providerList;
    this.providerTypes = providerTypes;
    this.genderTypes = genderTypes;
    this.seatchParams = IPROVIDER_SEARCH_PARAMS;
    console.log('this.seatchParams', this.seatchParams);
    this.specialities = ['PEDIATRICS', 'CARDIOLOGY', 'NEPHROLOGY', 'CHIROPRACTIC MEDICINE'];

    this.providerRestangular = ProviderRestangular;
    this.providerService = ProviderService;

    $scope.$watchCollection(() => {  return this.seatchParams.filter }, () => { this.reload(); });
  }

  getSpecialities(prefix) {
    return this.providerRestangular.all('providers').all('specialties').getList({prefix});
  }

  load() {
    this.providerService.list().then((items) => {
      this.providerList = items;
    });
  };

  reload() {
    this.seatchParams.page = 1;
    this.load();
  }

}




