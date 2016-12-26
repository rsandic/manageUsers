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
            //$rootScope.currentUser = user;
            //Boradcats event when user is succes loged in
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            //go to home page to see user details
            $state.go('home');
        }
        
        //if user is log in redirect him on home page
        if ($scope.isLogUser && AuthService.getSessionUser().userName != undefined) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            //go to home page
            $state.go('home')
        }
    }
]);
