angular
	.module("app.chat", [
		"ngRoute",
		"firebase",
		"app.misc"
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/chat', {
				templateUrl: 'components/chat/chatList.html',
				controller: 'ChatListController',
				controllerAs: 'chatList',
				resolve: {
					rooms: function (RoomService) {
						return RoomService.getRooms();
					}
				}
			})
			.when('/chat/:chatRoom', {
				templateUrl: 'components/chat/chatRoom.html',
				controller: 'ChatRoomController',
				controllerAs: 'chatRoom',
				resolve: {
					room: function (RoomService, $route) {
						return RoomService.getRoomByName($route.current.params.chatRoom);
					},
					messages: function (RoomService, $route) {
						return RoomService.getMessageByRoomName($route.current.params.chatRoom);
					}
				}
			});
	})
	.controller("ChatListController", function($http, rooms) {
		var chatList = this;
		chatList.rooms = rooms;
	})
	.controller("ChatRoomController", function($http, RoomService, room, messages) {
		var chatRoom = this;
		chatRoom.room = room;
		chatRoom.messages = messages;

		chatRoom.sendMessage = function sendMessage () {
			RoomService.sendMessage(chatRoom.room.$id, chatRoom.newMessage.text);
			chatRoom.newMessage.text = '';
		};
	});