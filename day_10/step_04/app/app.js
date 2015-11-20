'use strict';
 
var app = angular.module('myApp', []);
 
app.factory('userService', function($http){
	return {
		get: function() {
			return $http.get('http://api.randomuser.me/?results=10')
		}
	};
});
 
app.controller('appController', function($scope, userService) {
    $scope.text = 'Hello World!';
    $scope.users = userService.get();
});