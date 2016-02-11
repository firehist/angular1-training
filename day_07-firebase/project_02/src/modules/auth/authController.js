angular
  .module('chatApplication.auth')
  .controller('authController', function($q, $state, authService){
    var vm = this

    var restrictedOAuthProvider = ['twitter', 'github']

    vm.user = {}

    /**
     * Auth with classic firebase method (login/password)
     * @return {Promise} The auth promise
     */
    vm.login = function (){
      return authService.$authWithPassword(vm.user)
        .then(function (auth){
          $state.go('channels')
        }, function (error){
          vm.error = error
        })
    }

    /**
     * Auth with OAuth firebase method
     * @return {Promise} The auth promise
     */
    vm.loginWithOauth = function (provider){
      if (restrictedOAuthProvider.indexOf(provider) === -1) {
        return $q.reject('This provider isn\'t allowed')
      }
      return authService.$authWithOAuthPopup(provider)
        .then(function(authData) {
          $state.go('channels')
        }).catch(function(error) {
          vm.error = error
        })
    }

    /**
     * Register method
     * @return {[type]} [description]
     */
    vm.register = function (){
      Auth
        .$createUser(vm.user)
        .then(function (user){
          vm.login();
        }, function (error){
          vm.error = error;
        });
    };

  });