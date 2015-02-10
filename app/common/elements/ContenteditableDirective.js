import Directive from './Directive';

export default class ContenteditableDirective extends Directive {
  constructor($sce) {
    super();
    this.sce = $sce;
    this.restrict = 'A';
    this.require = '?ngModel';
  }

  link(scope, element, attrs, ngModel) {
    super.link.call(this, arguments);

    // don't do anything unless this is actually bound to a model
    if (!ngModel) {
      return;
    }

    // Specify how UI should be updated
    ngModel.$render = () => {
      element.html(ngModel.$viewValue || '');

    };

    // Listen for change events to enable binding
    element.on('blur keyup change', () => {
      scope.$evalAsync(read); //TODO only bind if modified
    });

    // Write data to the model
    function read() {
      var html = element.html();
      // When we clear the content editable the browser leaves a <br> behind
      // If strip-br attribute is provided then we strip this out
      if ( attrs.stripBr && html == '<br>' ) {
        html = '';
      }
      if ( attrs.noLineBreaks ){
        html = html.replace(/<div>/g, '').replace(/<br>/g, '').replace(/<\/div>/g, '');
      }
      html = html.replace( /<br>/g ,'<br/>')
        .replace(/<col ([^>]*)>/g ,'<col $1 />')
        .replace(/<img ([^>]*)>/g ,'<img $1 />')
        .replace(/&nbsp/g ,' ');

      ngModel.$setViewValue(html);
    }
  }
}
