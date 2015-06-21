angular
	.module('project.misc')
	.filter('ucfirst', function () {
		return function (input) {
			if (input && typeof input === 'string') {
				return input[0].toUpperCase() + input.slice(1);
			}
			return input;
		};
	});