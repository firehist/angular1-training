angular
	.module('project.chat')
	.controller('chatComponentController', function(chatService) {
			var vm = this;

			vm.sendMessage = function sendMessage() {
				chatService.addMessage(vm.room.$id, {
					"user": vm.message.user,
					"text": vm.message.text,
					"date": "2014/09/03"
				})
			}
		})