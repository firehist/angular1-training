"use strict";

// Create module for chat component
angular
	.module('project.chat')
	.factory('chatService', function ($q, $http, $timeout) {
		var _roomsPromise = null;
		var _rooms = [];

		var _findById = function findById (id) {
			return _rooms.filter(function (res) {
				return res.id === id;
			})[0];
		};

		return {
			getRooms: function getRooms() {
				// Si premier appel, alors on création d'une promise et requêtage
				if (!_roomsPromise) {
					console.log('chatService: retrieve rooms from json file');
					_roomsPromise = $q.defer();
					$http.get('chats.json').success(function(data) {
						// Provoque une latence server
						$timeout(function() {
							_rooms = data;
							_roomsPromise.resolve(_rooms);
						}, 1000);
					});
				} else {
					console.log('chatService: retrieve rooms from cached array');
				}
				return _roomsPromise.promise;
			},
			getRoomById: function getRoomById(id) {
				var deferred = $q.defer();
				this
					.getRooms()
					.then(function (res) {
						deferred.resolve(_findById(id));
					});

				return deferred.promise;
			}
		};
	});