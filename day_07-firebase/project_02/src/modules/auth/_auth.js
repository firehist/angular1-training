angular.module('chatApplication.auth', [
        'firebase',
        'angular-md5',
        'ui.router'
    ])
    .config(function($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'modules/auth/login.html',
                controller: 'authController as authCtrl',
                resolve: {
                    requireNoAuth: function($state, authService){
                        return authService.$requireAuth()
                            .then(function(auth){
                                $state.go('home')
                            }, function(error){
                                return
                            })
                    }
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'modules/auth/register.html',
                controller: 'authController as authCtrl',
                resolve: {
                    requireNoAuth: function($state, authService){
                        return authService.$requireAuth()
                            .then(function(auth){
                                $state.go('home')
                            }, function(error){
                                return;
                            })
                    }
                }
            })
    })