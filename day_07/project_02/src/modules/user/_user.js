angular.module('chatApplication.user', [
    'ui.router'
  ])
  .config(function($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user',
        templateUrl: 'modules/user/user.html',
        controller: 'userController as userCtrl',
        resolve: {
          auth: function($state, userService, authService){
            return authService.$requireAuth()
              .catch(function(){
                $state.go('home')
              })
          },
          profile: function(userService, authService){
            return authService.$requireAuth()
              .then(function(auth){
                return userService.getProfile(auth.uid).$loaded()
              })
          }
        }
      })
  })
