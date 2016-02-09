describe('myApp', () => {
    var $controller

    beforeEach(() => module('myApp'))
    beforeEach(() => inject((_$controller_) => $controller = _$controller_))

    describe('WeatherCtrl', () => {
    	var $scope, controller

    	beforeEach(() => {
			$scope = {};
      		controller = $controller('WeatherCtrl', { $scope: $scope });
    	})

	    it('should has a locations property as an array', () => {
	        expect(controller.locations).not.toBeNull()
	        expect(controller.locations.length).not.toBeNull()
	    })
	    it('should has an addLocation method', () => {
	    	expect(controller.addLocation).not.toBeNull()
	    })
	    it('should has an removeLocation method', () => {
	    	expect(controller.removeLocation).not.toBeNull()
	    })
	    it('should has two locations by default', () => {
	        expect(controller.locations.length).toBe(2)
	    })
	    it('should add a location', () => {
	    	controller.location = 'My New Location'
	    	controller.addLocation()
	        expect(controller.locations.length).toBe(3)
	    })
	    it('should remove a location', () => {
	    	controller.removeLocation(1)
	        expect(controller.locations.length).toBe(1)
	    })
    })
    
})