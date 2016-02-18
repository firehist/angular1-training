angular
  .module('chatApplication.user')
  .controller('UserCtrl', function($state, userService, profile, auth, md5) {
    var vm = this;

    vm.profile = profile;
    vm.gravatar = userService.getGravatar(auth.uid);

    vm.updateProfile = function(){
      try {
        vm.profile.emailHash = md5.createHash(auth.password.email);
      } catch (e) {}
      vm.profile.$save().then(function() {
        $state.go('channels')
      });

    };

  });