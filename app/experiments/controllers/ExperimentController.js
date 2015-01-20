import {Diary} from 'diary';
import {take,primes} from '../services/PrimeGenerator';

export default class ExperimentController {

	constructor($http, $q, $scope, EmailService, UserService,DrugRestangular) {
        this.logger = Diary.logger('ExperimentController');
        this.logger.info('in ExperimentController....');

		EmailService.content = 'Greeting !';

        $scope.user = {
            name: 'awesome user',
            dob: new Date(1984, 4, 15)
        };

		$scope.sendEmail = (recipient) => {
			var p = $q.when(EmailService.send(recipient));
			p.then( (body) => { $scope.output = body; })
			 .catch( (err) => { $scope.output = err; });

//            EmailService.send(recipient).then(function (body) {
//                $scope.output = body;
//            }).finally(function () {
//                $scope.$apply();
//            });
		};

		$scope.test403 = () => {
            DrugRestangular.all('drugs/test403').getList().then(function (data) {
				$scope.output = data;
			});
		};

		$scope.genPrime = (max = 10) => {
			$scope.output = ''; //clear output
			for (var prime of take(max, primes())) {
				$scope.output += ', ' +prime;
			}
		};

        // no more var that = this; with fat arrows :)
		$scope.currentUser = () => {
			UserService.currentUser().then( (user) => {
				$scope.output = user;
			}).catch( (err) => {
                this.logger.error(err);
				$scope.output = err;
			});
		};

		$scope.clearUser = function () {
			UserService.clear();
		};
	}
}