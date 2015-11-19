angular
  .module('chatApplication.channel')
  .factory('Channels', function (FirebaseURL, $firebaseArray, Firebase) {
    var ref = new Firebase(FirebaseURL+'/channels');
    var channels = $firebaseArray(ref);

    return channels;
  });