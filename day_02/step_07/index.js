// Create a module AngularJS called "myApp"
var myApp = angular.module('myApp', []);
// Create MyController in "myApp" angular module
myApp.controller('MyController', MyController);
function MyController($filter) {
  // Create ViewModel reference (vm)
  var vm = this;
  // Expose arrValue to ViewModel
  vm.arrValue = [
    'benjamin',
    'alexandre',
    'yannick',
    'julien'
  ]
  
}

// Create filter "custom" in "myApp" angular module
myApp.filter('custom', CustomFilter);
function CustomFilter() {
  // input is the filter input value
  return function(input) {
    // Transform this value and return a new value
    try {
      // "bonjour" => "Bonjour" (uppercase the first character)
      return input[0].toUpperCase() + input.slice(1);
    } catch (e) {
      return input;
    }
  };
}
// Create filter "separator" in "myApp" angular module
myApp.filter('separator', CustomSepFilter);
function CustomSepFilter() {
  return function(input, separator) {
    // Transform input by split it with given separator (, by default)
    separator = separator || ', ';
    try {
      // ["bonjour", "Benjamin"] => "bonjour, Benjamin"
      return input.join(separator);
    } catch (e) {
      return input;
    }
  };
}
// Create filter "reverse" in "myApp" angular module
myApp.filter('reverse', reverseFilter);
function reverseFilter() {
  return function (input) {
    // Transform input to get reversed string
    try {
      // "bonjour" => "ruojnob"
      return input.split('').reverse().join('');
    } catch (e) {
      return input;
    }
  }
}