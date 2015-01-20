

export default class ElementsController {

	constructor($scope) {
		console.info('in ElementsController....');

		$scope.news =  [
			{news:'news1',breaking:false},
			{news:'news2',breaking:true},
			{news:'news3',breaking:false},
			{news:'news4',breaking:false},
			{news:'news5',breaking:true},
			{news:'news6',breaking:false},
			{news:'news7',breaking:false}
		];

		$scope.supportsWebComponents = () => {
			console.log('test:',this.supportsTemplate() , this.supportsImports() , this.supportsCustomElements());
			if(this.supportsTemplate() && this.supportsImports() && this.supportsCustomElements()) {
                return 3;
            } else if(this.supportsTemplate() && this.supportsImports()) {
                return 2;
            } else if (this.supportsTemplate()) {
                return 1;
            } else {
                return 0;
            }
		};

	}

	supportsTemplate() {
		return 'content' in document.createElement('template');
	}

	supportsImports() {
		return 'import' in document.createElement('link');
	}

	supportsCustomElements() {
		return 'registerElement' in document;
	}
}
