angular
  .module('chatApplication', [
    'firebase',
    'angular-md5',
    'ui.router',
    'chatApplication.auth',
    'chatApplication.home',
    'chatApplication.channel',
    'chatApplication.user'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseURL', 'https://ngtraining.firebaseio.com/')