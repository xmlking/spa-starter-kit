//- app/scripts/experiments/index.js
import routes from './routes';
import EmailService from './services/EmailService';
import AsyncService from './services/AsyncService';

import TodoController from './controllers/TodoController';
import AsyncController from './controllers/AsyncController';
import ExperimentController from './controllers/ExperimentController';
import ElementsController from './controllers/ElementsController';
import GrowlTranslateDemoController from './controllers/GrowlTranslateDemoController';

import MyElement from './elements/myElement/MyElement';
import CustomButton from './elements/customButton/CustomButton';
import MyNews from './elements/myNews/MyNews';

let moduleName = 'spaApp.experiments';
let experimentsModule = angular.module(moduleName, []);

experimentsModule.service('EmailService', EmailService);
experimentsModule.factory('AsyncService', AsyncService);

experimentsModule.controller('TodoController', TodoController);
experimentsModule.controller('AsyncController', AsyncController);
experimentsModule.controller('ExperimentController', ExperimentController);
experimentsModule.controller('ElementsController', ElementsController);
experimentsModule.controller('GrowlTranslateDemoController', GrowlTranslateDemoController);

experimentsModule.config(routes);

//export var MyElement = document.registerElement('my-element', MyElement);
//export var CustomButton = document.registerElement('custom-button',CustomButton);
//export var MyNews = document.registerElement('my-news',MyNews);
if('registerElement' in document) {
	document.registerElement('my-element', MyElement);
	document.registerElement('custom-button',CustomButton);
	document.registerElement('my-news',MyNews);
}

export default moduleName;

