angular
	.module('app.misc')
	.factory('AuthService', function (FB, $firebaseAuth) {
		return $firebaseAuth(FB);
	});