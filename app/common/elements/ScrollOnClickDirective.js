import Directive from './Directive';

export default class ScrollOnClickDirective extends Directive {
    constructor($rootScope, $timeout, $location) {
        super();
        this.rootScope = $rootScope;
        this.timeout = $timeout;
        this.location = $location;
        this.restrict = "A";
    }

    link(scope, element, attrs) {
        super.link.call(this, arguments);
        var settings = angular.extend({
            href: angular.element(),
            offset: -100,
            duration: 800,
            easing: 'easeOutCirc'
        }, attrs);

        settings.href = settings.href.replace('#','');

        element.on('click', (e) => {
            //e.preventDefault();

            var scroll;

            if (settings.href) {
                //scroll = $('#'+settings.href).offset().top + Number(settings.offset);
                scroll = element[0].getBoundingClientRect().top + Number(settings.offset);


                this.location.hash(settings.href);
            } else {
                scroll = element[0].getBoundingClientRect().top + Number(settings.offset);
            }

            this.rootScope.scrolling = true;

//            angular.element('html, body').animate(
//                {scrollTop: scroll},
//                settings.duration,
//                settings.easing,
//                () => {
//                    this.timeout(() => {
//                        this.rootScope.scrolling = false;
//                    }, 200);
//
//                }
//            );
            e.preventDefault();
        });
    }
}
