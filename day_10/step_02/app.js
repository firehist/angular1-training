angular
	.module('app', [])
	.controller('AppController', function AppController (Notify) {
		var vm = this;
	})
	.directive('datepicker', function($q, $timeout) {
		return {
			// A besoin de ng-model sur le même noeud DOM
			template: '<input type="text" />',
			link: function (scope, element, attrs) {
				
			}
		}
	});