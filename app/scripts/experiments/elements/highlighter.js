'use strict';
export default function highlighter($animate) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.highlighter, function (nv, ov) {
                if (nv !== ov) {
                    let add = nv > ov ? attrs.upClass : attrs.downClass;
                    let remove = nv > ov ? attrs.downClass : attrs.upClass;
                    $animate.removeClass(element, remove, function() {
                        $animate.addClass(element, add);
                    });
                }
            });
        }
    };
}
