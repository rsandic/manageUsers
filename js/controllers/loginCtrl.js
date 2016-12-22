app.controller('LoginController', ["$rootScope", "$scope", "AuthService", "AUTH_EVENTS", '$state', 'AlertService',
    function($rootScope, $scope, AuthService, AUTH_EVENTS, $state, AlertService) {
        //$scope.alertsShow = false;

        //if user is log show notidication
        $scope.isLogUser = AuthService.isAuthenticated();

        $scope.login = function(credentials) {
            AuthService.login(credentials).then(function(user) {
                //setting current user    
                $scope.SetCurrentUser(user);
            }, function(result) {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };

        $scope.SetCurrentUser = function(user) {
            $rootScope.currentUser = user;
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $state.go('home')
        }


        if ($scope.isLogUser.userName) {
            //if user is log in redirect him on home page
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $state.go('home')
        }
    }
]);
