import {Diary} from 'diary';

export default class GrowlTranslateDemoController {

	constructor($scope, growl, $translate, AuthorizationService) {
        this.logger = Diary.logger('GrowlTranslateDemoController');
		$scope.setLang = function (langKey) {
			$translate.use(langKey);
		};

		$scope.addTranslatedMessage =  () => {
			growl.success('LOGIN_SUCCESS');
			growl.error('LOGOUT_SUCCESS');
			growl.warning('Override global <strong>ttl</strong> setting', {ttl: 10000});

		};
		$scope.addErrorMessage = () => {
			growl.error('This adds a error message');
		};
		$scope.addWarnMessage = () => {
            growl.warning("This adds a warn message", {title: 'Warning!'});
		};
		$scope.addInfoMessage = () => {
            growl.info("This adds a info message with title", {title: 'Info!'});
			AuthorizationService.isAuthorized1(['ROLE_USER']).then ( isAuthz => {
                this.logger.info(`User has ROLE_USER role? ${isAuthz}`);
			});
		};
		$scope.addSuccessMessage = () => {
			growl.success('This adds a success message');
		};
	}
}