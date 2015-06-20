"use strict";

// Start application by creating project module w/ ngRoute dependency
angular.module('project', [
  'ngRoute',
  'project.home',
  'project.chat',
  'firebase'
])
.constant('FB', new Firebase('https://ngtraining.firebaseio.com/chats'))
.config(function ($routeProvider) {
    $routeProvider.otherwise('/home');
  });