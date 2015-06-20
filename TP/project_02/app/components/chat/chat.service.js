"use strict";

// Create module for chat component
angular
	.module('project.chat')
	.factory('chatService', function ($q, $http, FB, $firebaseArray, $timeout) {
		// Load rooms
		var _rooms = $firebaseArray(FB);

		return {
			createRoom: function createRoom(name, description) {
				_rooms.$add({
					"name": name,
					"description": description,
					"messages": []
				});
			},
			getRooms: function getRooms() {
				return _rooms;
			},
			getById: function getRoomById(roomId) {
				return _rooms.$loaded().then(function (res) {
					return res.$getRecord(roomId);
				});
			},
			addMessage: function addMessage(roomId, message) {
				var FB_message = FB.child(roomId + '/messages');
				return $firebaseArray(FB_message).$add(message);
			}
		};
	});