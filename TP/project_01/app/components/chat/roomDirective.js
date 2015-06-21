"use strict";

// Create module for chat component
angular
	.module('project.chat')
	.directive('room', function () {
		return {
			restrict: 'A',
			templateUrl: 'app/components/chat/roomDirective.html',
			scope: {
				room: '='
			},
			bindToController: true,
			controller: function($scope, chatService) {
				var roomCtrl = this;

				roomCtrl.message = {
					user: 'Georgia',
					text: ''
				};

				this.sendMessage = function sendMessage() {	
					var now = new Date();
					roomCtrl.room.messages.push({
						"user": roomCtrl.message.user,
						"text": roomCtrl.message.text,
						"date": now.getFullYear() + '/' + now.getMonth() + '/' + now.getDate()
					});
					roomCtrl.message.text = '';
				};
			},
			controllerAs: 'ctrl',
			link: function (scope, element) {
				element.find()
			}
		}
	});