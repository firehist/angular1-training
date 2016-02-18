angular
  .module('app', [])
  .controller('AppController', function AppController ($http) {
    var vm = this

    vm.data = {
      "username": "firehist"
    }
  })
  .factory('userService', function($q, $timeout) {
    return {
      // Check if given value exist in our database
      checkUsername: function(value) {
        var deferred = $q.defer()
        // Here we simulated a async response with a 2s timeout
        $timeout(function() {
          // List of existing user
          var usernames = ['firehist', 'toto', 'tartoprune']
          // If request match w/ an existing user
          if (usernames.indexOf(value) > -1) {
            // Reject the resolve
            deferred.reject()
          } else {
            // Else, resolve
            deferred.resolve()
          }
        }, 2000)
        return deferred.promise
      }
    }
  })
  .directive('asyncUsername', function(userService) {
    return {
      // Need to work with an ngModel on the same DOM Node
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        // ngModelCtrl = ngModelController
        ngModelCtrl.$asyncValidators.username = function(modelValue, viewValue) {
          var value = modelValue || viewValue
          return userService.checkUsername(value)
        }

      }
    }
  })  