// Create module for home component
angular
	.module('project.home', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'modules/home/home.html'
			})
	})