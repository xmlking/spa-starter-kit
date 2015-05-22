import {IPROVIDER_SEARCH_CONFIG, IProviderRestangular, IProviderService} from '../services/IProviderService';

export default class ProviderShowController {

  constructor(IProviderRestangular, IProviderService, provider) {
    "use strict";
    this.provider = provider;
  }


}

