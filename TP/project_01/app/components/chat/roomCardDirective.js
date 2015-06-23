"use strict";

// Create module for chat component
angular
	.module('project.chat')
	.directive('roomCard', function () {
		return {
			restrict: 'A',
			templateUrl: 'app/components/chat/roomCardDirective.html',
			scope: {
				room: '=roomCard'
			},
			bindToController: true,
			controller: function($scope, chatService) {
				var roomCardCtrl = this;
				this.deleteRoom = function deleteRoom() {
					chatService.deleteRoomById(roomCardCtrl.room.$id);
				};
			},
			controllerAs: 'ctrl',
			link: function (scope, element) {
			}
		}
	});