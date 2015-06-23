"use strict";

// Create module for user component
angular
	.module('project.chat', [
		'ngRoute'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/chat', {
				templateUrl: 'app/components/chat/chat.html',
				controller: 'ChatsController',
				controllerAs: 'chats',
				resolve: {
					rooms: function (chatService) {
						return chatService.getRooms();
					}
				}
			})
			.when('/chat/:userId', {
				templateUrl: 'app/components/chat/chatDetail.html',
				controller: 'ChatController',
				controllerAs: 'chat',
				resolve: {
					room: function ($route, chatService) {
						return chatService.getRoomById($route.current.params.userId);
					}
				}
			});
	})
	.controller('ChatsController', function (rooms, chatService) {
		this.rooms = rooms;
	})
	.controller('ChatController', function (room) {
		this.room = room;
	});