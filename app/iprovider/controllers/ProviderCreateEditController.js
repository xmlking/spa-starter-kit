import {IPROVIDER_SEARCH_CONFIG, IProviderService} from '../services/IProviderService';
import TypeService from '../services/TypeService';

export default class ProviderCreateEditController {

  constructor(provider, TypeService) {
    "use strict";
    this.genderTypes = [];
    this.providerTypes = [];
    //this.contactInfoList = contactInfoList;
    this.provider = provider;
    this.TypeService = TypeService;

  }

  removeContact(index) {
    this.provider.contacts.splice(index, 1);
  };

  addContact() {
    if(!this.provider.contacts) {
      this.provider.contacts = []
    }
    this.insertedC = {
      address :{
        street: null,
        city: null,
        state: null,
        zip: null
      }
    };
    this.provider.contacts.push(this.insertedC);
  };

  removeSpeciality(index) {
    this.provider.specialties.splice(index, 1);
  };

  addSpeciality() {
    if(!this.provider.specialties) {
      this.provider.specialties = []
    }
    this.insertedS = {
      speciality :{
        code: null,
        image: null,
        name: null,
        description: null
      }
    };
    this.provider.specialties.push(this.insertedS);
  };

  loadProviderTypes() {
    return this.providerTypes.length ? null : this.TypeService.getProviderTypes().then( (data) => {
      this.providerTypes = data;
    })
  };

  loadGenderTypes() {
    return this.genderTypes.length ? null : this.TypeService.getGenderTypes().then( (data) => {
      this.genderTypes = data;
    })
  };


}
