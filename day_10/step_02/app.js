angular
	.module('app', [])
	.controller('AppController', function AppController () {
		var vm = this;
		vm.date = '';
	})
	.directive('datepicker', function($q, $timeout) {
		return {
			// A besoin de ng-model sur le même noeud DOM
			require: 'ngModel',
			link: function (scope, element, attrs, ngModelCtrl) {
				ngModelCtrl.$parsers.push(function(value) {
					var splittedValue = value.split('/')
					return new Date(splittedValue[2], splittedValue[0], splittedValue[1]).getTime()
				})
				element.datepicker()
			}
		}
	})