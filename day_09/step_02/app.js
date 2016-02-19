angular
	.module('app', [])
	.controller('AppController', function AppController ($http) {
		var vm = this

		vm.data = {
			"date": (new Date()).getTime()
		}
	})
	.directive('myDate', function() {
		return {
			// A besoin de ng-model sur le même noeud DOM
			require: 'ngModel',
			link: function (scope, element, attrs, ngModelCtrl) {
				// Travailler avec ngModelCtrl
				// ngModelCtrl = ngModelController
				ngModelCtrl.$formatters.push(function(value) {
					return new Date(value)
				})

				ngModelCtrl.$parsers.push(function(value) {
					return new Date(value).getTime()
				})
			}
		}
	})