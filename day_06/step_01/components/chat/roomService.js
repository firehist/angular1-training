angular
	.module("app.chat")
	.service('RoomService', function (FB, AuthService, $firebaseObject, $firebaseArray, $q) {
		var RoomService = function() {
			this.FB_rooms = FB.child('room-metadata');
			this.FB_messages = FB.child('room-messages');
			this.rooms = $firebaseArray(this.FB_rooms);
		};
		RoomService.prototype.deleteRoom = function deleteRoom(roomId) {
			this.rooms.$remove(roomId);
		};
		RoomService.prototype.parseRoomName = function parseRoomName (roomName) {
			return roomName.replace(/[.#$\[\]]/, '');
		}
		RoomService.prototype.createRoom = function createRoom (roomId) {
			var authData = AuthService.$getAuth();
			if (authData) {
				var room = $firebaseObject(this.FB_rooms.child(this.parseRoomName(roomId)));
				room.createdAd			= new Date().getTime();
				room.createdByUserId 	= authData.uid;
				room.name 				= roomId;
				return room.$save();
			}
			return $q.reject("Not authenticated user");
		};
		RoomService.prototype.getRoomByName = function getRoomByName (roomId) {
			var room = $firebaseObject(this.FB_rooms.child(this.parseRoomName(roomId)));
			var deferred = $q.defer();
			room.$loaded(function (data) {
				deferred.resolve(data);
			});
			return deferred.promise;
		};
		RoomService.prototype.getRooms = function getRooms () {
			return this.rooms;
		};
		RoomService.prototype.getMessageByRoomName = function getRoomMessageByName (roomId) {
			var message = $firebaseArray(this.FB_messages.child(this.parseRoomName(roomId)));
			var deferred = $q.defer();
			message.$loaded(function (data) {
				deferred.resolve(message);
			});
			return deferred.promise;
		};
		RoomService.prototype.sendMessage = function sendMessage (roomId, text) {
			var authData = AuthService.$getAuth();
			if (authData) {
				var messages = $firebaseArray(this.FB_messages.child(this.parseRoomName(roomId)));
				return messages.$add({
					createdAd: new Date().getTime(),
					message: text,
					user: authData.uid
				});
			}
			return $q.reject("Not authenticated user");
		};

		return new RoomService();
	});