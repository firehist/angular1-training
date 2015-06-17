var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'tpl/home.html',
			controller  : 'HomeController',
			controllerAs: 'home'
		})
		.when('/user/:id?', {
			templateUrl : 'tpl/user.html',
			controller  : 'UserController',
			controllerAs: 'user',
			resolve: {
				user: function ($route) {
					return {
						id: $route.current.params.id||'$new',
						firstname: 'Benjamin'
					}
				}
			}
		})
		.otherwise('/');
});

myApp.controller('HomeController', HomeController);
function HomeController() {


}

myApp.controller('UserController', UserController);
function UserController(user) {
	this.data = user

}