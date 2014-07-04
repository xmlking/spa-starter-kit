export default class AsyncController {

	constructor($scope, AsyncService) {
		AsyncService.emit('register');
		AsyncService.on('register', function (data) {
			$scope.data = data;
		});
	}
}