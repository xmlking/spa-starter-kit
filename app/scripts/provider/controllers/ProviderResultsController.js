export default class ProviderResultsController {
    constructor($scope, filterFilter) {
        console.log('in ProviderResultsController...');
        //pagination
        this.currentPage = 1;
        this.itemsPerPage = 3;
        this.maxSize = 7;

        this.filterField = '';


        // initialize filteredProviders with providers and watch/update
        $scope.$watch('providers', function(newProviders){
            console.log('providers in scope changed...');
            $scope.filteredProviders = newProviders;
        });

        $scope.filterProviders = () => {
            $scope.filteredProviders = filterFilter($scope.providers, {facilityName: this.filterField});
        };

    }
}

