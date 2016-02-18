angular
	.module('app', [])
	.controller('AppController', function AppController ($http) {
		var vm = this

		vm.data = {
			"fullname": "Benjamin Longearet <firehist>"
		}
	})
	.directive('fullnameValidator', function() {
		return {
			// A besoin de ng-model sur le même noeud DOM
			require: 'ngModel',
			link: function (scope, element, attrs, ngModelCtrl) {
				// Travailler avec ctrl
				// ngModelCtrl = ngModelController
				ngModelCtrl.$validators.fullname = function(modelValue, viewValue) {
					var value = modelValue || viewValue
					return /^[a-zA-Z]+ [a-zA-Z]+ <[^>]+>$/.test(value)
				}

			}
		}
	})