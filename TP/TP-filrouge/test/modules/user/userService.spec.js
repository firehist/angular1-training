describe('awesomeApp.user: userService', function() {

    var $httpBackend, $q, myService

    beforeEach(module('awesomeApp.user'))
    beforeEach(inject(function(_$httpBackend_, userService) {
        $httpBackend = _$httpBackend_
        myService = userService
    }))

    it('should get users collection', function() {
        expect(myService.getUsers()).toBeDefined()
        expect(myService.getUsers().length).toBe(0)
    })

    it('should add user to the users collection', function() {
        expect(myService.getUsers().length).toBe(0)
        expect(myService.addUser({name: {first: 'Benjamin', last: 'Longearet'}})).toBe(1)
        expect(myService.getUsers().length).toBe(1)
    })

})