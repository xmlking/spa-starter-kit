function crudBreadcrumbs(defaultCrudResource) {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            crudBreadcrumbs: '@'
        },
		link: function($scope) {
			$scope.resourceName = defaultCrudResource.getResourceName();
		},
        templateUrl: 'grails/templates/directives/crud-breadcrumbs.html'
    }
}

angular.module('grails.directives.crudBreadcrumbs', ['grails.services'])
    .directive('crudBreadcrumbs', crudBreadcrumbs);
