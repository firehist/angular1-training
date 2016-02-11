angular.module('chatApplication.channel', [
    'firebase',
    'ui.router'
  ])
	.config(function($stateProvider) {
		$stateProvider
			.state('channels', {
        url: '/channels',
        templateUrl: 'modules/channel/channelIndex.html',
        controller: 'channelIndexController as channelIndexCtrl',
        resolve: {
          channels: function (channelService){
            return channelService.$loaded();
          },
          profile: function ($state, authService, userService){
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
          }
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
          messages: function(Messages, $stateParams){
            return Messages.forChannel($stateParams.channelId).$loaded()
          },
          channelName: function($stateParams, channelService){
            return channelService.$loaded()
              .then(function (channels) {
                return '#' + channelService.$getRecord($stateParams.channelId).name
              })
          }
        }
      })
	})