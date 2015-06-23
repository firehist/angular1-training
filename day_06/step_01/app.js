var myApp = angular.module("app", [
	"ngRoute",
	"app.chat",
	"app.home",
	"app.misc"
]);

myApp.config(function ($routeProvider) {
	$routeProvider.otherwise('/home');
});

myApp.constant('FB', new Firebase("https://ngtraining.firebaseio.com"));