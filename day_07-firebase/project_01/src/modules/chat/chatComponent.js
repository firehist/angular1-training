// Create module for chat component
angular
	.module('project.chat')
	.component('chat', {
		templateUrl: 'modules/chat/chatComponent.html',
		bindings: {
			room: '='
		},
		controller: 'chatComponentController as chatCtrl'
	});