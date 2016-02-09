// Create a module AngularJS called "myApp"
// Chain controller creation
angular.module('myApp', []).controller('MyController', MyController);
function MyController() {
  // Create ViewModel reference (vm)
  var vm = this; 
  // Expose ifCondition, showCondition, color, imgUrl, message & selection variables to ViewModel
  // Expose getMyStringClass variables to ViewModel
  vm.ifCondition = true
  vm.showCondition = true
  vm.imgUrl = "http://ranger.gamebanana.com/img/ico/sprays/amazing_horse_spray_2.png";
  vm.message = ""
  vm.selection = ""
  vm.color = 'red';

  vm.getMyStringClass = function() {
    return vm.color;
  }
}