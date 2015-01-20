import Directive from './Directive';
/**
 * <form name="myForm">
 *     <div class="label">
 *         <input name="myPassword" type="password" ng-model="data.password" validate-password-characters required />
 *         <div ng-if="myForm.myPassword.$error.required">
 *             You did not enter a password
 *         </div>
 *         <div ng-if="myForm.myPassword.$error.passwordCharacters">
 *             Your password must contain a numeric, uppercase and lowercase as well as special characters
 *         </div>
 *    </div>
 *</form>
 * @type {RegExp[]}
 */
const REQUIRED_PATTERNS = [
    /\d+/,    //numeric values
    /[a-z]+/, //lowercase values
    /[A-Z]+/, //uppercase values
    /\W+/,    //special characters
    /^\S+$/   //no whitespace allowed
];


export default class PasswordValidator extends Directive {
    constructor() {
        super();
        this.require = 'ngModel';
    }

    link(scope, element, attrs, ngModel) {
        super.link.call(this, arguments);
        ngModel.$validators.passwordCharacters = (value) => {
            var status = true;
            angular.forEach(REQUIRED_PATTERNS,(pattern) => {
                status = status && pattern.test(value);
            });
            return status;
        };
    }
}