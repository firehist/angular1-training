// Create a module AngularJS called "myApp"
// Chain controller creation
angular.module('myApp', []).controller('MyController', MyController);
function MyController($filter) {
  // Create ViewModel reference (vm)
  var vm = this;
  // Expose numberValue, stringValue, arrayValue and objValue on ViewModel
  vm.numberValue = 12345,67
  vm.stringValue = 'AngularJS is awesome!'
  vm.arrayValue = ['first', 'second', 'third', 'last', 'omg that\'s awesome', 'another', 'r value :D']
  vm.objValue = {
    "users": [
      {firstname: 'Benjamin', lastname: 'Longearet'},
      {firstname: 'Alexandre', lastname: 'Lacoche'},
      {firstname: 'Yannick', lastname: 'Galatol'},
      {firstname: 'Julien', lastname: 'Vidal'}
    ]
  }

  vm.getBool = function(v) { return v === "1"}
}