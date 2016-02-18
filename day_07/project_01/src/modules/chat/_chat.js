angular
	.module('project.chat', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/chats', {
				templateUrl: 'modules/chat/chatList.html',
				controller: 'chatListController as chatListCtrl',
				resolve: {
					rooms: function (chatService) {
						return chatService.getRooms()
					}
				}
			})
			.when('/chats/:chatId', {
				templateUrl: 'modules/chat/chatIndex.html',
				controller: 'chatIndexController as chatIndexCtrl',
				resolve: {
					room: function ($route, chatService) {
						return chatService.getById($route.current.params.chatId)
					}
				}
			})
	})