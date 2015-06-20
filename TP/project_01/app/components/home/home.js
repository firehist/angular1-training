"use strict";

// Create module for home component
angular
	.module('project.home', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'app/components/home/home.html',
				controller: 'HomeController',
				controllerAs: 'home'
			});
	})
	.controller('HomeController', function () {
		// Any home content
	});