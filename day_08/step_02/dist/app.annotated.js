/*! project_firebase_01 - v1.0.0 - 2016-02-17 */
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
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }])
  .constant('FirebaseURL', 'https://ngtraining.firebaseio.com/')
angular.module('chatApplication.auth', [
        'firebase',
        'angular-md5',
        'ui.router'
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'modules/auth/login.html',
                controller: 'authController as authCtrl',
                resolve: {
                    requireNoAuth: ['$state', 'authService', function($state, authService){
                        return authService.$requireAuth()
                            .then(function(auth){
                                $state.go('home')
                            }, function(error){
                                return
                            })
                    }]
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'modules/auth/register.html',
                controller: 'authController as authCtrl',
                resolve: {
                    requireNoAuth: ['$state', 'authService', function($state, authService){
                        return authService.$requireAuth()
                            .then(function(auth){
                                $state.go('home')
                            }, function(error){
                                return;
                            })
                    }]
                }
            })
    }])
angular
  .module('chatApplication.auth')
  .controller('authController', ['$q', '$state', 'authService', function($q, $state, authService){
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

  }]);
angular
	.module('chatApplication.auth')
	.factory('authService', ['$firebaseAuth', 'FirebaseURL', function($firebaseAuth, FirebaseURL) {
		var ref = new Firebase(FirebaseURL);
		var auth = $firebaseAuth(ref);

		return auth;
	}]);
angular.module('chatApplication.channel', [
    'firebase',
    'ui.router'
  ])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('channels', {
        url: '/channels',
        templateUrl: 'modules/channel/channelIndex.html',
        controller: 'channelIndexController as channelIndexCtrl',
        resolve: {
          channels: ['channelService', function (channelService){
            return channelService.$loaded();
          }],
          profile: ['$state', 'authService', 'userService', function ($state, authService, userService){
            return authService.$requireAuth()
              .then(function(auth){
                return userService.getProfile(auth.uid).$loaded()
                  .then(function (profile){
                    if(profile.displayName){
                      return profile
                    } else {
                      $state.go('user')
                    }
                  })
              }, function(error){
                $state.go('home')
              })
          }]
        }
      })
      .state('channels.create', {
        url: '/create',
        templateUrl: 'modules/channel/channelCreate.html',
        controller: 'channelCreateController as channelCreateCtrl'
      })
      .state('channels.messages', {
        url: '/{channelId}/messages',
        templateUrl: 'modules/channel/channelMessage.html',
        controller: 'channelMessageController as channelMessageCtrl',
        resolve: {
          messages: ['Messages', '$stateParams', function(Messages, $stateParams){
            return Messages.forChannel($stateParams.channelId).$loaded()
          }],
          channelName: ['$stateParams', 'channelService', function($stateParams, channelService){
            return channelService.$loaded()
              .then(function (channels) {
                return '#' + channelService.$getRecord($stateParams.channelId).name
              })
          }]
        }
      })
	}])
angular
	.module('chatApplication.channel')
	.controller('channelCreateController', ['$state', 'channels', function($state, channels) {
		var vm = this;

		vm.channels = channels;

		vm.newChannel = {
			name: ''
		};

		vm.createChannel = function() {
			vm.channels.$add(vm.newChannel)
				.then(function(channel) {
					vm.newChannel.name = '';
				})
		};

	}]);
angular
	.module('chatApplication.channel')
	.controller('channelIndexController', ['$state', 'authService', 'userService', 'profile', 'channels', function($state, authService, userService, profile, channels) {
		var vm = this;

		vm.profile = profile;
		vm.channels = channels;

		vm.getDisplayName = userService.getDisplayName;
		vm.getGravatar = userService.getGravatar;

		vm.logout = function() {
			authService.$unauth();
			$state.go('home');
		};

	}]);
angular
	.module('chatApplication.channel')
	.controller('channelMessageController', ['profile', 'messages', 'channelName', function(profile, messages, channelName) {
		var vm = this;

		vm.channelName = channelName;
		vm.messages = messages;

		vm.message = '';

		vm.sendMessage = function sendMessage() {
			if(vm.message.length > 0){
				vm.messages.$add({
					uid: profile.$id,
					body: vm.message,
					timestamp: Firebase.ServerValue.TIMESTAMP
				}).then(function (){
					vm.message = '';
				});
			}
		};

	}]);
angular
  .module('chatApplication.channel')
  .factory('Messages', ['$firebaseArray', 'FirebaseURL', function ($firebaseArray, FirebaseURL) {
    var ref = new Firebase(FirebaseURL + '/channelMessages');

    var Messages = {
      forChannel: function(channelId){
        return $firebaseArray(ref.child(channelId));
      }
    };

    return Messages;
  }]);

angular
  .module('chatApplication.channel')
  .factory('channelService', ['FirebaseURL', '$firebaseArray', 'Firebase', function (FirebaseURL, $firebaseArray, Firebase) {
    var ref = new Firebase(FirebaseURL+'/channels');
    var channels = $firebaseArray(ref);

    return channels;
  }]);
angular.module('chatApplication.home', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/home/home.html',
        resolve: {
          profile: ['$state', 'userService', 'authService', function($state, userService, authService){
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
          }]
        }
      })
  }])
angular.module('chatApplication.user', [
    'ui.router'
  ])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user',
        templateUrl: 'modules/user/user.html',
        controller: 'userController as userCtrl',
        resolve: {
          auth: ['$state', 'userService', 'authService', function($state, userService, authService){
            return authService.$requireAuth()
              .catch(function(){
                $state.go('home')
              })
          }],
          profile: ['userService', 'authService', function(userService, authService){
            return authService.$requireAuth()
              .then(function(auth){
                return userService.getProfile(auth.uid).$loaded()
              })
          }]
        }
      })
  }])

angular
  .module('chatApplication.user')
  .controller('UserCtrl', ['$state', 'userService', 'profile', 'auth', 'md5', function($state, userService, profile, auth, md5) {
    var vm = this;

    vm.profile = profile;
    vm.gravatar = userService.getGravatar(auth.uid);

    vm.updateProfile = function(){
      try {
        vm.profile.emailHash = md5.createHash(auth.password.email);
      } catch (e) {}
      vm.profile.$save().then(function() {
        $state.go('channels')
      });

    };

  }]);
angular
  .module('chatApplication.user')
  .factory('userService', ['$firebaseObject', '$firebaseArray', 'FirebaseURL', function($firebaseObject, $firebaseArray, FirebaseURL) {
    var ref = new Firebase(FirebaseURL + '/users');
    var users = $firebaseArray(ref);
    
    var User = {
      getProfile: function(uid){
        return $firebaseObject(ref.child(uid));
      },
      getDisplayName: function(uid){
        return users.$getRecord(uid).displayName;
      },
      getGravatar: function(uid){
        var user = users.$getRecord(uid);
        if (user && user.emailHash) {
          return '//www.gravatar.com/avatar/' + user.emailHash;
        }
        return '';
      },
      all: users
    };

    return User;
  }]);