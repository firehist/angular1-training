angular
	.module('chatApplication.channel')
	.factory('Channels', function (FirebaseURL, $firebaseObject, $firebaseArray, Firebase) {
		var ref = new Firebase(FirebaseURL + '/channels');
		var channels = $firebaseArray(ref);

		var Channels = {
			getChannel: function(name){
				return $firebaseObject(ref.child(name));
			},
			all: channels
		};

		return Channels;
	});