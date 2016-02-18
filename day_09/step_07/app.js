angular
	.module('app', [])
	.controller('AppController', function AppController ($http) {
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
	.directive('asyncEmail', function($q, $timeout) {
		return {
			// A besoin de ng-model sur le même noeud DOM
			require: 'ngModel',
			link: function (scope, element, attrs, ctrl) {
				ctrl.$asyncValidators.email = function (modelValue, viewValue) {
					if (ctrl.$isEmpty(modelValue)) {
						return $q.when()
					}

					var deferred = $q.defer()

					// Simule une réponse serveur
					$timeout(function() {
						if (Math.random() < .5) {
							deferred.resolve()
						} else {
							deferred.reject()
						}
					}, 2000)

					return deferred.promise
				}

			}
		}
	})