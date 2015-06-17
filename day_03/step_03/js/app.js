var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'tpl/home.html',
			controller  : 'HomeController',
			controllerAs: 'home'
		})
		.when('/users', {
			templateUrl : 'tpl/users.html',
			controller  : 'UsersController',
			controllerAs: 'users',
			resolve: {
				users: function ($http) {
					return $http.get('json/MOCK_DATA.json').then(function (res) {
						return res.data || [];
					});
				}
			}
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

myApp.controller('UsersController', UsersController);
function UsersController(users) {
	this.data = users
}

myApp.controller('UserController', UserController);
function UserController(user) {
	this.data = user
}

myApp.directive('userDetail', UserDetailDirective);
function UserDetailDirective () {
	return {
        templateUrl: 'tpl/userDetail.directive.html',
        scope: true,
        controller: function () {

        },
        controllerAs: 'userDetail',
        bindToController: {
        	'user': '='
        }
    };
}