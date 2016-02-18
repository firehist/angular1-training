angular
	.module('app', [])
	.controller('AppController', function AppController ($http) {
		var vm = this

		var myFirstname = "benjamin"

		vm.data = {
			"username": "firehist",
			"firstname": function (newVal) {
				if (newVal) {
					myFirstname = newVal
				}
				return myFirstname
			}
		}
		vm.ngModelOption = {
			updateOn: 'default blur',
			debounce: {  // Peut être un nombre en ms
				default: 1000,
				blur: 500
			}
		}
		vm.ngModelOptionFirstname = {
			getterSetter: true
		}
	})	