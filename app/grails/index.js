import angular from 'angular';
import   './services/module';
import   './directives/module';

angular.module('grails', [
    'ui.router',
	  'ngAnimate',
    'ui.bootstrap',
    'grails.directives',
    'grails.services'
]);
