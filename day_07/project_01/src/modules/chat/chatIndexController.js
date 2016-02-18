angular
	.module('project.chat')
	.controller('chatIndexController', function (room) {
		var vm = this
		vm.room = room
	})