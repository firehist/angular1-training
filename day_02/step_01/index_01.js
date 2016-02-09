// Create a module AngularJS called "myApp"
// Chain controller creation
angular.module('myApp', [])
  .controller('WeatherCtrl', WeatherCtrl);

function WeatherCtrl($scope) {
  // Create ViewModel reference (vm)
  var vm = this;

  vm.location = '';
  // Expose locations variable to ViewModel
  vm.locations = ["Montpellier, France", "Genève, Suisse"];
  // Expose addLocation method to ViewModel
  vm.addLocation = function addLocation () {
    vm.locations.push(vm.location);
  };
  // Expose removeLocation method to ViewModel
  vm.removeLocation = function removeLocation (locationIndex) {
    vm.locations.splice(locationIndex, 1);
  };
}