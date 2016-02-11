angular.module('awesomeApp.navbar')
  .component('nav', {
    replace: true,
    templateUrl: 'modules/navbar/navbarComponent.html',
    controllerAs: 'navComponentCtrl',
    transclude: true,
    controller: function() {
      this.menuItems = [{
        state: 'home',
        label: 'Home'
      }, {
        state: 'user.index',
        label: 'User'
      }]
    }
  })