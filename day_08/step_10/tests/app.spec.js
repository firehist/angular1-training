'use strict';
 
describe('appController', function(){
    var scope; // Global var pour l'utiliser dans le test
 
    // On inject notre module angularJS
    beforeEach(module('myApp'));

    // On inject $rootScope et $controller d'AngularJS
    beforeEach(inject(function($rootScope, $controller){
        // On instancie un nouveau scope
        scope = $rootScope.$new();
        // On déclare notre appController avec le $scope créé
        $controller('appController', {$scope: scope});
    }));
    // Tests

    it('should have variable text = "Hello World!"', function(){
        expect(scope.text).toBe('Hello World!');
    });
});