//import Polymer from 'polymer';
//import 'template!./template.html';

var CustomButtonPrototype = Object.create(HTMLButtonElement.prototype);
CustomButtonPrototype.createdCallback = function() {
	'use strict';
	this.textContent = 'I am a custom button!';
};
export default { prototype: CustomButtonPrototype, extends: 'button'};

