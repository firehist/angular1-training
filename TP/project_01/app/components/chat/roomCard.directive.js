"use strict";

// Create module for chat component
angular
	.module('project.chat')
	.directive('roomCard', function () {
		return {
			restrict: 'A',
			templateUrl: 'app/components/chat/roomCard.directive.html',
			scope: {
				room: '=roomCard'
			},
			bindToController: true,
			controller: function($scope) {
				var self = this;
				
				this.getLink = function () {
					return '#/chats/' + self.room.id;
				};
			},
			controllerAs: 'ctrl'
		}
	});