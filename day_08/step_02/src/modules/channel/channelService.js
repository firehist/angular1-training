angular
  .module('chatApplication.channel')
  .factory('channelService', function (FirebaseURL, $firebaseArray, Firebase) {
    var ref = new Firebase(FirebaseURL+'/channels');
    var channels = $firebaseArray(ref);

    return channels;
  });