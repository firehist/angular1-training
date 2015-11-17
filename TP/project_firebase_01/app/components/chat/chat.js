"use strict";

// Create module for user component
angular
	.module('project.chat', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/chats', {
				templateUrl: 'app/components/chat/chat.html',
				controller: 'ChatsController',
				controllerAs: 'chats',
				resolve: {
					rooms: function (chatService) {
						return chatService.getRooms();
					}
				}
			})
			.when('/chats/:userId', {
				templateUrl: 'app/components/chat/chatDetail.html',
				controller: 'ChatController',
				controllerAs: 'chat',
				resolve: {
					room: function ($route, chatService) {
						return chatService.getById($route.current.params.userId);
					}
				}
			});
	})
	.controller('ChatsController', function (rooms, chatService) {
		var self = this;

		this.rooms = rooms;
		this.create = function create() {
			chatService.createRoom(self.newChat.name, self.newChat.description);
			self.newChat.name = self.newChat.description = '';
		};
	})
	.controller('ChatController', function (room) {
		this.room = room;
	});