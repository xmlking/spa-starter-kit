//- app/bootstrap.js
/**
 * bootstraps angular onto the window.document node
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */

import ng from 'angular';
import 'es6-shim';
import 'traceur-runtime';
import './index';

ng.element(document).ready(function() {
	'use strict';
	// everything is loaded...go!
	ng.bootstrap(document, ['spaApp']);
});