angular
	.module('chatApplication.auth')
	.factory('Auth', function($firebaseAuth, FirebaseURL) {
		var ref = new Firebase(FirebaseURL);
		var auth = $firebaseAuth(ref);

		return auth;
	});