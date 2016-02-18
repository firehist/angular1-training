angular
	.module('chatApplication.channel')
	.controller('channelMessageController', function(profile, messages, channelName) {
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

	});