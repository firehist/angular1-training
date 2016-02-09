// Create a module AngularJS called "myApp"
// Chain controller creation
angular.module('myApp', [])
  .controller('WeatherCtrl', WeatherCtrl);

function WeatherCtrl($scope) {
  // Create ViewModel reference (vm)
  var vm = this;
  // Expose locations variable to ViewModel
  vm.locations = [{
    name: "Montpellier, France"
  }, {
    name: "Avignon, France"
  }, {
    name: "Genève, Suisse"
  }];

  // $scope.$watch listen an AngularJS Expression (weather.locations here) to get changes

  // It doesn't works
  $scope.$watch('weather.locations', function (oldValue, newValue) {
    console.log('watch 01', oldValue, 'newValue 01', newValue);
  });

  // It works
  $scope.$watch('weather.locations.length', function (oldValue, newValue) {
    console.log('watch 02', oldValue, 'newValue 02', newValue);
  });

  // It also works
  $scope.$watch(function () {
    return vm.locations.length;
  }, function (oldValue, newValue) {
    console.log('watch 03', oldValue, 'newValue 03', newValue);
  });
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