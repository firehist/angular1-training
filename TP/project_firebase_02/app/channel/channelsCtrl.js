angular
	.module('chatApplication.channel')
	.controller('ChannelsCtrl', function(Auth, Users, $state, profile, channels) {
		var vm = this;

		vm.profile = profile;
		vm.channels = channels;

		vm.newChannel = {
			name: ''
		};

		vm.getDisplayName = Users.getDisplayName;

		vm.logout = function() {
			Auth.$unauth();
			$state.go('home');
		};

		vm.createChannel = function() {
			vm.channels.$add(vm.newChannel).then(function() {
				vm.newChannel.name = '';
			})
		};

	});