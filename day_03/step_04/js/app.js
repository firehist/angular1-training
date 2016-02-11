// Declare myApp application with ngRoute dependency
var myApp = angular.module('myApp', ['ui.router'])
// Configure myApp module
myApp.config(function($urlRouterProvider, $stateProvider) {
	// Configure $urlRouterProvider (redirect)
	$urlRouterProvider
		.when('/u?id', '/user/:id')
		.otherwise('/')
	// Configure $stateProvider
	$stateProvider
		// Route "/" will launch home template with HomeController
		.state('home', {
			url: '/',
			templateUrl : 'tpl/home.html',
			controller  : 'HomeController as homeCtrl',
		})
		.state('user', {
			abstract: true,
			url: '/user',
			template: '<ui-view/>'
		})
		.state('user.index', {
			url: '',
			templateUrl: 'tpl/users.html',
			controller: 'UsersController as usersCtrl',
			resolve: {
				users: function($http) {
					return $http
					.get('http://api.randomuser.me/?results=200')
					.then(function(res) {
				      return res.data.results;
				    })
				}
			}
		})
		.state('user.detail', {
			url: '/:id?',
			templateUrl : 'tpl/user.html',
			controller  : 'UserController as userCtrl',
			resolve: {
				user: function ($stateParams, $http) {
					return $http
					.get('http://api.randomuser.me/?seeduser=' + $stateParams.id)
					.then(function(res) {
				      return res.data.results[0].user;
				    })
				}
			}
		})
});

// Run - $rootScope
myApp.run(function($rootScope, $state, $stateParams) {
	$rootScope.$state = $state.current
	$rootScope.$stateParams = $stateParams
})

// Controllers
myApp.controller('HomeController', HomeController)
function HomeController() {
	// Empty controller
}
myApp.controller('UsersController', UsersController)
function UsersController(users) {
	var vm = this
	vm.users = users
}
myApp.controller('UserController', UserController)
function UserController($rootScope, user) {
	var vm = this
	vm.user = user
}