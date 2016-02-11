angular.module('awesomeApp.user')
  .controller('userDetailController', function(user) {
    var vm = this

    vm.isUserLoading = true
    vm.user = user

  })