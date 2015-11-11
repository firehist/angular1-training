// Create a module AngularJS called "myApp"
// Chain controller creation
angular.module('myApp', []).controller('MyController', MyController);
function MyController($scope) {
  // Private
  var vm = this;

  var user1 = {
    firstname: 'Benjamin',
    lastname: 'Longearet',
    birth: {
      day: 6,
      month: 7,
      year: 1987
    },
    email: 'blongearet@gmail.com'
  };
  var user2 = {
    firstname: 'Alexandre',
    lastname: 'Lacoche',
    birth: {
      day: 21,
      month: 2,
      year: 1987
    },
    email: 'alacoche@gmail.com'
  };

  // user collection
  vm.users = [user1, user2];
  // Temp user model
  vm.user = {};

  vm.addUser = function() {
    // Check the form validity
    if ($scope.myForm.$valid && $scope.myForm.$dirty) {
      // Add temp user to the collection
      vm.users.push(vm.user);
      $scope.myForm.$dirty = false;
      $scope.myForm.$pristine = true;
      vm.user = {};
    }
    
  };

}