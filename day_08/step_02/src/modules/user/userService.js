angular
  .module('chatApplication.user')
  .factory('userService', function($firebaseObject, $firebaseArray, FirebaseURL) {
    var ref = new Firebase(FirebaseURL + '/users');
    var users = $firebaseArray(ref);
    
    var User = {
      getProfile: function(uid){
        return $firebaseObject(ref.child(uid));
      },
      getDisplayName: function(uid){
        return users.$getRecord(uid).displayName;
      },
      getGravatar: function(uid){
        var user = users.$getRecord(uid);
        if (user && user.emailHash) {
          return '//www.gravatar.com/avatar/' + user.emailHash;
        }
        return '';
      },
      all: users
    };

    return User;
  });