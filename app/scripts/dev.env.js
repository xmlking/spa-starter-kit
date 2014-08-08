import {AUTH_CONFIG} from './common/services/AuthenticationService';
import {DRUG_SEARCH_CONFIG} from './drug/services/DrugService';
import {PROVIDER_SEARCH_CONFIG} from './provider/services/ProviderService';
import {EBUS_CONFIG} from './common/services/EventBus';

let moduleName = 'spaApp.dev.env';
let devEnvModule = angular.module(moduleName, []);

devEnvModule.config( () => {
    'use strict';
    console.log('in devEnvModule... ');
    AUTH_CONFIG.BASE_URL = 'http://localhost:8080/apiApp';
    AUTH_CONFIG.LOGIN_URL = AUTH_CONFIG.BASE_URL + '/j_spring_security_check';
    AUTH_CONFIG.LOGOUT_URL = AUTH_CONFIG.BASE_URL + '/logout';
    AUTH_CONFIG.PROFILE_URL = AUTH_CONFIG.BASE_URL + '/login/currentUser';
    DRUG_SEARCH_CONFIG.BASE_API_URL ='http://localhost:8080/apiApp';
    PROVIDER_SEARCH_CONFIG.BASE_API_URL ='http://ve7d00000179:8080/REST_HBS_Canonical_Resiliency/service';
    EBUS_CONFIG.BASE_URL = 'http://localhost:8080/apiApp/stomp';
});

export default moduleName;
