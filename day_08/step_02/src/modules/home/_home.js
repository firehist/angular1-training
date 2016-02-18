angular.module('chatApplication.home', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/home/home.html',
        resolve: {
          profile: function($state, userService, authService){
            return authService.$requireAuth()
              .then(function(auth){
                return userService.getProfile(auth.uid).$loaded()
                  .then(function (profile) {
                    $state.go('channels')
                    return profile;
                  })
              }, function(error){
                $state.go('login')
              })
          }
        }
      })
  })