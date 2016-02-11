angular
	.module('project.chat')
	.controller('chatListController', function (rooms, chatService) {
		var vm = this
		
		vm.newChat = {}
		vm.rooms = rooms
		vm.create = function create() {
			chatService.createRoom(vm.newChat.name, vm.newChat.description)
			vm.newChat = {}
		}
	})