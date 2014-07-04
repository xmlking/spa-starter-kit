//- app/scripts/common/index.js
import routes from './routes';
import {LoginController,LoginModalController} from './controllers/LoginController';
import SettingsController from './controllers/SettingsController';
import {AUTH_CONFIG, AuthenticationService} from './services/AuthenticationService';
import {AuthorizationService} from './services/AuthorizationService';
import UserService from './services/UserService';
import hasPermission from './elements/hasPermission';
import AuthInterceptor from './utils/AuthInterceptor';

let moduleName = 'spaApp.common';
let commonModule = angular.module(moduleName,
	[
		// 3rd party modules
		'http-auth-interceptor-buffer'
	]);

commonModule.service('UserService', UserService);
commonModule.service('AuthenticationService', AuthenticationService);
commonModule.service('AuthorizationService', AuthorizationService);
//commonModule.factory('AuthInterceptor',AuthInterceptor);

commonModule.directive('hasPermission',hasPermission);
commonModule.controller('LoginController', LoginController);
commonModule.controller('LoginModalController', LoginModalController);
commonModule.controller('SettingsController', SettingsController);

commonModule.config(routes);
commonModule.config( ($httpProvider) => {
    'use strict';

    $httpProvider.interceptors.push(AuthInterceptor);
    //$httpProvider.responseInterceptors.push('AuthInterceptor');

    AUTH_CONFIG.BASE_URL = 'http://ve7d00000010:8080/apiApp';
    AUTH_CONFIG.LOGIN_URL = AUTH_CONFIG.BASE_URL + '/j_spring_security_check';
    AUTH_CONFIG.LOGOUT_URL = AUTH_CONFIG.BASE_URL + '/logout';
    AUTH_CONFIG.PROFILE_URL = AUTH_CONFIG.BASE_URL + '/login/currentUser';
});

export default moduleName;