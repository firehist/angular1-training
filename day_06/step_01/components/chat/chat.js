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
					requireAuth: function (AuthService, $location) {
						return AuthService.$requireAuth().catch(function(err) {
							console.error(err);
							$location.url('/home');
						});
					},
					rooms: function (RoomService) {
						return RoomService.getRooms().$loaded();
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
	.controller("ChatListController", function(RoomService, $http, rooms) {
		var chatList = this;
		chatList.rooms = RoomService.getRooms();

		chatList.deleteRoom = function deleteRoom(id) {
			chatList.rooms.$remove(id);
		};
	})
	.controller("ChatRoomController", function($http, RoomService, room, messages) {
		var chatRoom = this;
		chatRoom.room = room;
		chatRoom.messages = messages;

		chatRoom.sendMessage = function sendMessage () {
			RoomService.sendMessage(chatRoom.room.$id, chatRoom.newMessage.text);
			chatRoom.newMessage.text = '';
		};

		chatRoom.changeMessage = function changeMessage (id) {
			chatRoom.messages.$save(id)
		};
	});