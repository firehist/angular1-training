describe('awesomeApp.user: userIndexController', function() {

    var myCtrl

    // Retrieve module awesomeApp
    beforeEach(module('awesomeApp.user'))
    // Retrieve OUR controller through the $controller service and init it with an empty scope
    beforeEach(inject(function(_$controller_) {
      myCtrl = _$controller_('userIndexController', {})
    }))

    it('should have a isUserLoading variable', function() {
      expect(myCtrl.isUserLoading).toBeDefined()
    })
    it('should have a users variable', function() {
      expect(myCtrl.users).toBeDefined()
      expect(myCtrl.users.length).toBeDefined()
    })
    it('should have delUser method', function() {
      expect(myCtrl.delUser).toBeDefined()
      expect(typeof myCtrl.delUser).toBe('function')
    })

})