angular.module('awesomeApp.user')
  .component('userCard', {
    bindings: {
      user: '=data',
      delUser: '&'
    },
    templateUrl: 'modules/user/userCardComponent.html'
  })