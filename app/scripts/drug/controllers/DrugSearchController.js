import {DRUG_LIST_PARAMS, DRUG_SEARCH_PARAMS} from '../services/DrugService';
let state = Symbol('state', true);

export default class DrugSearchController {
    constructor($scope, growl, drugs, DrugService, $state) {
        console.log('in DrugSearchController');
        this[state] = $state;
        this.drugListParams = DRUG_LIST_PARAMS;
        this.drugSearchParams = DRUG_SEARCH_PARAMS;

        $scope.$parent.dbCursorMove = (n) => {
            console.log('xxxxx',n);
            if (this[state].current.name === 'drugs.search' || this[state].current.name === 'drugs.search.detail') {
                this.drugSearchParams.offset = this.drugSearchParams.offset + n;
            }
            else if (this[state].current.name === 'drugs.list' || this[state].current.name === 'drugs.list.detail') {
                this.drugListParams.offset = this.drugListParams.offset + n;
            }
            //$state.reload();
            this[state].transitionTo(this[state].current, null, {reload: true, inherit: true, notify: true});
        };

    }

    onSearch() {
        //this[state].reload();
        this[state].transitionTo('drugs.search', null, {reload: true, inherit: true, notify: true});
    }



}