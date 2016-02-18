angular
	.module('app', [])
	.controller('AppController', function AppController($http) {
		var vm = this

		vm.data = {
			"first_name": "",
			"last_name": "",
			"email": "",
			"password": "",
			"happy": false,
			"price": 8
		}

	})
	.directive('asyncEmailDirective', function() {
		return {
			// A besoin de ng-model sur le même noeud DOM
			require: 'ngModel',
			link: function (scope, element, attrs, ctrl) {
				// Travailler avec ctrl
				// ctrl = ngModelController
				console.log('Directive asyncEmail loaded')
			}
		}
	})
	// Following component will doesn't work on <input />
	// Element ONLY!
	.component('asyncEmailComponent', {
		require: 'ngModel',
		link: function (scope, element, attrs, ctrl) {
			// Travailler avec ctrl
			// ctrl = ngModelController
			console.log('Component asyncEmail loaded')
		}
	})