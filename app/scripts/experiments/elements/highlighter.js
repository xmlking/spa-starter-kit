'use strict';
export default function highlighter($animate, $timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(attrs.highlighter, function (nv, ov) {
        if (nv !== ov) {
          let add = nv > ov ? attrs.upClass : attrs.downClass;
          let remove = nv > ov ? attrs.downClass : attrs.upClass;
          //$animate.removeClass(element, remove, function() {
          //    $animate.addClass(element, add);
          //    $rootScope.$digest();//FIXME not working since Angular 1.3.0 https://github.com/angular/angular.js/blob/master/CHANGELOG.md
          //});
          element.removeClass(remove);
          $timeout(function () {
            element.addClass(add);
          }, 1000);
        }
      });
    }
  };
}
