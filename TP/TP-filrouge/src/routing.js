angular.module('awesomeApp')
  .config(function($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/home/home.html'
      })
      .state('user', {
        abstract: true,
        url: '/user',
        template: '<ui-view></ui-view>',
        resolve: {
          users: function(userService) {
            return userService.getUsersFromServer()
          }
        }
      })
      .state('user.index', {
        url: '',
        controller: 'userIndexController as userIndexCtrl',
        templateUrl: 'modules/user/userIndex.html'
      })
      .state('user.detail', {
        url: '/:id',
        controller: 'userDetailController as userDetailCtrl',
        templateUrl: 'modules/user/userDetail.html',
        resolve: {
          user: function($q, $timeout, $state, $stateParams, userService) {
            var user = userService.getUser($stateParams.id)
            if (!user) {
              $timeout(function() {
                $state.go('user.index')
              })
              return $q.reject('User not found!')
            } else {
              return user
            }
          }
        }
      })
    $urlRouterProvider.otherwise('/')
  })