"use strict";

// Start application by creating project module w/ ngRoute dependency
angular.module('project', [
  'ngRoute',
  'project.home',
  'project.chat'
])
.config(function ($routeProvider) {
    $routeProvider.otherwise('/home');
  });