angular
  .module('chatApplication', [
    'firebase',
    'angular-md5',
    'ui.router',
    'chatApplication.auth',
    'chatApplication.home',
    'chatApplication.channel',
    'chatApplication.user'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl as home',
        resolve: {
          profile: function(Users, Auth, $state){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded().then(function (profile) {
                $state.go('channels');
                return profile;
              })
            });
          }
        }
      })
      .state('channels', {
        url: '/channels',
        templateUrl: 'channel/channel.html',
        controller: 'ChannelsCtrl as channelsCtrl',
        resolve: {
          channels: function (Channels){
            return Channels.all.$loaded();
          },
          profile: function ($state, Auth, Users){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded().then(function (profile){
                if(profile.displayName){
                  return profile;
                } else {
                  $state.go('user');
                }
              });
            }, function(error){
              $state.go('home');
            });
          }
        }
      })
      .state('channels.create', {
        url: '/create',
        templateUrl: 'channel/create.html',
        controller: 'ChannelsCtrl as channelsCtrl',
        resolve: {
          channels: function (Channels){
            return Channels.all.$loaded();
          },
          profile: function ($state, Auth, Users){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded().then(function (profile){
                if(profile.displayName){
                  return profile;
                } else {
                  $state.go('user');
                }
              });
            }, function(error){
              $state.go('home');
            });
          }
        }
      })
      .state('user', {
        url: '/user',
        templateUrl: 'user/user.html',
        controller: 'UserCtrl as user',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('home');
            });
          },
          profile: function(Users, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      .state('login', {
        url: '/login',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        },
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html'
      })
      .state('register', {
        url: '/register',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        },
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html'
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseURL', 'https://ngtraining.firebaseio.com/');