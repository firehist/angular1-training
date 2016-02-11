angular.module('awesomeApp.user')
  .controller('userIndexController', function(userService) {
    var vm = this

    vm.isUserLoading = true
    vm.users = userService.getUsers()

    vm.delUser = userService.removeUser
    vm.addUser = function() {
      userService.addUser(vm.user)
      vm.user = {}
    }

  })