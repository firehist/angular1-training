angular.module('awesomeApp', [
	'ui.router',

	'awesomeApp.user',
	'awesomeApp.navbar'
])

/*
myApp.controller('awesomeAppCtrl', awesomeAppCtrl)
function awesomeAppCtrl($q) {
	debugger
	var vm = this
	vm.title = "blablabla"
	vm.todayIs = new Date().getTime()
}

myApp.controller('awesomeUserCtrl', awesomeUserCtrl)
function awesomeUserCtrl($scope, $timeout) {
	var vm = this

	vm.users = []
	// Create some users :D
	for(var i=0;i<=10;i++) {
		vm.users.push({
			"firstname": "Benjamin" + i,
			"lastname": "Longearet" + i,
			"email": "firehist" + i + "@gmail.com",
			"birthday_day": Math.floor((Math.random() * 30) + 1),
			"birthday_month": Math.floor((Math.random() * 12) + 1),
			"birthday_year": Math.floor((Math.random() * 99) + 1),
			"avatar_url": "https://fr.gravatar.com/userimage/27793374/301260c7ae699ec9306cffacaaf566eb.jpg?size=200"
		})
	}

	vm.addUser = function(user) {
		user = vm.user || user
		vm.users.push(user)
		vm.user = {}
	}

	vm.delUser = function(index) {
		// Simulate async request to a server to validate the deletion
		$timeout(function() {
			vm.users.splice(index, 1)	
		}, 500)
		
	}

	$scope.$watch(function() { return vm.users.length }, function(newVal, oldVal) {
		console.log('Users size changed from ' + oldVal + ' to ' + newVal)
	})

}

myApp.filter('fullname', fullnameFilter)
function fullnameFilter() {
	return function(input) {
		if (input && input.firstname && input.lastname) {
			return input.firstname + " " + input.lastname
		}
		return input
	}
}
*/
