// Declare myApp application with ngRoute dependency
var myApp = angular.module('myApp', ['ngRoute']);
// Configure myApp module
myApp.config(function($routeProvider) {
	// Configure $routeProvider
	// https://docs.angularjs.org/api/ngRoute/provider/$routeProvider
	$routeProvider
		// Route "/" will launch home template with HomeCtrl
		.when('/', {
			templateUrl : 'tpl/home.html',
			controller  : 'HomeCtrl',
			controllerAs: 'home'
		})
		// Route "/users" will launch users template with UsersCtrl
		.when('/users', {
			templateUrl : 'tpl/users.html',
			controller  : 'UsersCtrl',
			controllerAs: 'users',
			resolve: {
				users: function ($http) {
					return $http.get('json/MOCK_DATA.json').then(function (res) {
						return res.data || [];
					});
				}
			}
		})
		// Route "/user/id" will launch user template with UserCtrl
		.when('/user/:id?', {
			templateUrl : 'tpl/user.html',
			controller  : 'UserCtrl',
			controllerAs: 'user',
			// Resolve is a must have before go to the view
			resolve: {
				user: function ($route) {
					return {
						id: $route.current.params.id||'$new',
						firstname: 'Benjamin'
					}
				}
			}
		})
		// Default route
		.otherwise('/');
});
// Controllers HomeCtrl, UsersCtrl and UserCtrl
myApp.controller('HomeCtrl', HomeCtrl);
function HomeCtrl() {
}

myApp.controller('UsersCtrl', UsersCtrl);
function UsersCtrl(users) {
	this.data = users
}

myApp.controller('UserCtrl', UserCtrl);
function UserCtrl(user) {
	this.data = user
}
// Directive userDetail with an isolated scope
myApp.component('userDetail', {
    templateUrl: 'tpl/userDetail.directive.html',
    controller: function () {
   		var vm = this;
   		vm.tempUser = {
   			first_name: this.user.first_name,
   			last_name: this.user.last_name
   		};
   		vm.updateUserInformation = function () {
   			vm.user.first_name = vm.tempUser.first_name;
   			vm.user.last_name = vm.tempUser.last_name;
   		};
    },
    controllerAs: 'userDetail',
    // Bind from external scope to controller
    bindings: {
    	'user': '='
    }
})