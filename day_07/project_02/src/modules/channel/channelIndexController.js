angular
	.module('chatApplication.channel')
	.controller('channelIndexController', function($state, authService, userService, profile, channels) {
		var vm = this;

		vm.profile = profile;
		vm.channels = channels;

		vm.getDisplayName = userService.getDisplayName;
		vm.getGravatar = userService.getGravatar;

		vm.logout = function() {
			authService.$unauth();
			$state.go('home');
		};

	});