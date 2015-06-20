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
						return chatService.getRoomById(parseInt($route.current.params.userId, 10));
					}
				}
			});
	})
	.controller('ChatsController', function (rooms) {
		this.rooms = rooms;
	})
	.controller('ChatController', function (room) {
		this.room = room;
	});