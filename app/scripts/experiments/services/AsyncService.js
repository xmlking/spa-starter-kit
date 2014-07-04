

export default class AsyncService {
	//var socket = io.connect();
	constructor($rootScope, $timeout) {
		console.info('in AsyncService constructor....');

		this.$rootScope = $rootScope;
		this.$timeout = $timeout;

		this.content_ = '';
	}

	on(eventName, callback) {
		socket.on(eventName, function () {
			var args = arguments;
			this.$timeout(function () {
				callback.apply(socket, args);
			}, 0);
		});
	}

	emit(eventName, data, callback) {
		socket.emit(eventName, data, function () {
			var args = arguments;
			this.$rootScope.$apply(function () {
				if (callback) {
					callback.apply(socket, args);
				}
			});
		});
	}

}

//	.factory('socket', function ($rootScope, $timeout) {
//		/*global io:false */
//		var socket = io.connect();
//		return {
//			on: function (eventName, callback) {
//				socket.on(eventName, function () {
//					var args = arguments;
//					$timeout(function () {
//						callback.apply(socket, args);
//					}, 0);
//				});
//			},
//			emit: function (eventName, data, callback) {
//				socket.emit(eventName, data, function () {
//					var args = arguments;
//					$rootScope.$apply(function () {
//						if (callback) {
//							callback.apply(socket, args);
//						}
//					});
//				});
//			}
//		};
//	});