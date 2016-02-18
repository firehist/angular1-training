angular
	.module('chatApplication.channel')
	.controller('channelCreateController', function($state, channels) {
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

	});