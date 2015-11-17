angular
  .module('chatApplication.user')
  .controller('UserCtrl', function(Users, profile, auth, md5) {
    var vm = this;

    vm.profile = profile;
    debugger
    vm.gravatar = Users.getGravatar(auth.uid);
    vm.updateProfile = function(){
      vm.profile.emailHash = md5.createHash(auth.password.email);
      vm.profile.$save();
    };

  });