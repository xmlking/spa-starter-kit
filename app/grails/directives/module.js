import './breadcrumbs';
import './buttons';
import './fields';
import './flash';
import './sort';

'use strict';

angular.module('grails.directives', [
    'grails.directives.buttons',
    'grails.directives.sort',
    'grails.directives.flash',
    'grails.directives.fields',
	'grails.directives.crudBreadcrumbs'
]);


