angular
	.module('project.misc')
	.directive('autofocus', function () {
		return {
			restrict: 'A',
			link: function (scope, element) {
				element.focus();
			}
		};
	});