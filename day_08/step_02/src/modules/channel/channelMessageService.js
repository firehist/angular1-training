angular
  .module('chatApplication.channel')
  .factory('Messages', function ($firebaseArray, FirebaseURL) {
    var ref = new Firebase(FirebaseURL + '/channelMessages');

    var Messages = {
      forChannel: function(channelId){
        return $firebaseArray(ref.child(channelId));
      }
    };

    return Messages;
  });
