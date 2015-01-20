//- app/home/index.js
import routes from './routes';
import HomeController from './controllers/HomeController';

let moduleName = 'spaApp.home';
let homeModule = angular.module(moduleName, []);

homeModule.controller('HomeController', HomeController);

homeModule.config(routes);

export default moduleName;