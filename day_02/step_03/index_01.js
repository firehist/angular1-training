// Create a module AngularJS called "myApp"
// Chain controller creation
angular.module('myApp', [])
  .controller('WeatherCtrl', WeatherCtrl);

function WeatherCtrl() {
  // Create ViewModel reference (vm)
  var vm = this;
  // Expose locations variable to ViewModel
  vm.locations = [];
  // Expose getLocations method to ViewModel
  vm.getLocations = function () {
    // Simulate server latency of 2000ms
    // /!\ setTimeout is out of AngularJS Life cycle !
    setTimeout(function() {
      vm.locations = [{
        name: "Montpellier, France"
      }, {
        name: "Avignon, France"
      }, {
        name: "Genève, Suisse"
      }];
      console.log('Locations are coming back from server !');
    }, 2000);
  };
  // Expose addLocation method to ViewModel
  vm.addLocation = function addLocation () {
    vm.locations.push({
      name: vm.location
    });
  };
  // Expose removeLocation method to ViewModel
  vm.removeLocation = function removeLocation (locationIndex) {
    vm.locations.splice(locationIndex, 1);
  };
}