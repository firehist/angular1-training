"use strict";

// Create module for home component
angular
	.module('project.home', [
		'ngRoute',
		'project.misc'
	])
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
		this.welcomeMessage = 'bienvenue sur la page d\'accueil !!!';
	});