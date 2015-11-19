angular
	.module('app', ['ngAnimate', 'ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/home', {
				controller: function($scope) {
					this.records = [];
					for(var i=0;i<10;i++) {
						this.records.push({
							id: i,
							title: 'My title ' + i
						});
					}
				},
				controllerAs: 'home',
				templateUrl: 'home.html'
			})
			.when('/profile/:profileId', {
				controller: function($routeParams) {
					this.id = parseInt($routeParams.profileId, 10);
					this.title = 'My title ' + $routeParams.profileId;
				},
				controllerAs: 'profile',
				templateUrl: 'profile.html'
			})
			.otherwise('/home');
	})
	.controller('AppController', function AppController ($http, $timeout) {
		var appController = this;

		appController.isAppReady = false;
		$timeout(function() {
			appController.isAppReady = true;
		},500);

		appController.users = [];

		appController.removeAll = function removeAll() {
			appController.users.splice(0, appController.users.length);
		};
		appController.removeByIndex = function removeByIndex(index) {
			appController.users.splice(index, 1);
		};
		appController.addMore = function addMore() {
			$http.get('http://api.randomuser.me/?results=10').success(function (data) {
				data.results.forEach(function (item) {
					appController.users.push(item);
				});
			});
		};
		appController.getBackgroundImage = function getBackgroundImage(user) {
			return 'background:transparent url(' + user.picture.medium + ') top left no-repeat';
		};

		appController.addMore();
	})
	.animation('.card-animation-js', function () {
		return {
			enter: function (element, done) {
				$(element).fadeIn(1000, done);
			},
			move: function (element, done) {
				$(element).fadeIn(1000, done);
			},
			leave: function (element, done) {
				$(element).fadeOut(1000, done);
			}
		}
	});