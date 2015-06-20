"use strict";

// Create module for chat component
angular
	.module('project.chat')
	.directive('room', function () {
		return {
			restrict: 'A',
			templateUrl: 'app/components/chat/room.directive.html',
			scope: {
				room: '='
			},
			bindToController: true,
			controller: function($scope, chatService) {
				var self = this;

				this.sendMessage = function sendMessage() {
					debugger;	
					self.room.messages.push({
						"user": self.message.user,
						"text": self.message.text,
						"date": "2014/09/03"
					});
				};
			},
			controllerAs: 'ctrl'
		}
	});