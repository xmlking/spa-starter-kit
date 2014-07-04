export default class DrugResultsController {
	constructor($scope, growl, drugs, $filter, ngTableParams) {
        console.log('in DrugResultsController');

		/* jshint newcap: false */
		$scope.tableParams = new ngTableParams({
			page: 1,            // show first page
			count: 3,          // count per page
			sorting: {
				ndc: 'asc'     // initial sorting
			}
		}, {
			total: drugs.length, // length of data
			getData: function ($defer, params) {
				// use build-in angular filter
				let filteredData = params.filter() ? $filter('filter')(drugs, params.filter()) : drugs;
				let orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;

				$scope.drugs = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
				params.total(orderedData.length); // set total for recalc pagination

				$defer.resolve($scope.drugs);
			}
		});

	}
}
