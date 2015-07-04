// Declare myApp application with ngRoute dependency
var myApp = angular.module('myApp', ['ngRoute']);
// Configure myApp module
myApp.config(function($routeProvider) {
	// Configure $routeProvider
	// https://docs.angularjs.org/api/ngRoute/provider/$routeProvider
	$routeProvider
		// Route "/" will launch home template with HomeController
		.when('/', {
			templateUrl : 'tpl/home.html',
			controller  : 'HomeController',
			controllerAs: 'home'
		})
		// Route "/user/id" will launch user template with UserController
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
		// Default route is "/"
		.otherwise('/');
});
// Controllers HomeController and UserController
myApp.controller('HomeController', HomeController);
function HomeController() {
	// Empty controller
}
myApp.controller('UserController', UserController);
function UserController(user) {
	var vm = this;
	vm.data = user
}