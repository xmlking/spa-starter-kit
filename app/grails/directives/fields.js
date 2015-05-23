//= require_self
//= require_tree /templates/grails/directives/fields

'use strict';

function fieldContainer() {
    return {
        replace: true,
        transclude: true,
        scope: {
            type: '@',
            label: '@',
            invalid : '='
        },
        link: function($scope, $element) {
            var field = ($element.find('input').length > 0) ? $element.find('input') : $element.find('select');
            field.addClass('form-control');
        },
        templateUrl: 'grails/templates/directives/fields/field-container.tpl.html'
    }
}

function displayField() {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            label: '@',
            value: '='
        },
        templateUrl: 'grails/templates/directives/fields/display-field.tpl.html'
    }
}

function dateField() {
    return {
        replace: true,
        link: function($scope) {

            $scope.open = function() {
                $scope.opened = true;
            };

        },
        templateUrl: 'grails/templates/directives/fields/date-field.tpl.html'
    }
}

angular.module('grails.directives.fields', ['ui.bootstrap'])
    .directive("fieldContainer", fieldContainer)
    .directive("displayField", displayField)
    .directive("dateField", dateField);
