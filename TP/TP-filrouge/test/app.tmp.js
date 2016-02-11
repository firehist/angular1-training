xdescribe('awesomeApp', function() {
  var _$controller, _$filter, _$httpBackend, _$rootScope, _$q, deferred

  // Retrieve module awesomeApp
  beforeEach(module('awesomeApp'))
  // Retrieve $controller service (angularJS internal service)
  beforeEach(inject(function($controller, $filter, $httpBackend, $rootScope, $q) {
    _$controller = $controller
    _$filter = $filter
    _$httpBackend = $httpBackend
    _$rootScope = $rootScope
    _$q = $q
    deferred = _$q.defer()
  }))

  describe('awesomeAppCtrl', function() {
    var myCtrl

    // Retrieve OUR controller through the $controller service and init it with an empty scope
    beforeEach(function() {
      myCtrl = _$controller('awesomeAppCtrl', {})
    })

    it('should have a title variable', function() {
      expect(myCtrl.title).toBeDefined()
    })
    it('should have a todayIs variable', function() {
      expect(myCtrl.todayIs).toBeDefined()
    })
    it('should have title equal to "blablabla"', function() {
      expect(myCtrl.title).toBe('blablabla')
    })

  })

  describe('fullname filter', function() {
    var myFilter
    var myUser = {
      firstname: 'Benjamin',
      lastname: 'Longearet'
    }
    var myFullnameUser = 'Benjamin Longearet'

    beforeEach(function() {
      myFilter = _$filter('fullname')
    })

    it('should concatenate firstname and lastname properties', function() {
      expect(myFilter(myUser)).toBe(myFullnameUser)
    })
    it('should return original value when nothing is sent', function() {
      expect(myFilter(null)).toBe(null)
      expect(myFilter(undefined)).toBe(undefined)
      var emptyObject = {}
      expect(myFilter(emptyObject)).toBe(emptyObject)
      var emptyArray = []
      expect(myFilter(emptyArray)).toBe(emptyArray)
    })

  })

  describe('userService', function() {
    var myService

    beforeEach(inject(function(userService) {
      myService = userService
    }))
    beforeEach(function() {
      _$httpBackend
        .when('GET', 'http://api.randomuser.me/?results=2000')
        .respond([{id: 1}, {id: 2}]);

      spyOn(myService, 'getUsers').and.returnValue(deferred.promise);
    })

    it('should have a users property', function() {
      expect(myService.users).toBeDefined()
    })
    it('should have 2 users in the collection', function() {
      expect(myService.users.length).toBe(2)
    })
    it('should retrieve users from server', function() {
      var results = []
      myService.getUsers().then(function(res) {
        results = res
      })
      _$rootScope.$apply()
      expect(results.length).toBe(2)
    })

  })

})