app.controller('LoginController', ["$rootScope", "$scope", "AuthService", "AUTH_EVENTS",'$state',
    function($rootScope, $scope, AuthService, AUTH_EVENTS, $state) {
        //console.log(AuthService);
        $scope.login = function(credentials) {
            AuthService.login(credentials).then(function(user) {
            	console.log(user);
                //$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                //setting current user    
                $scope.SetCurrentUser(user);
            }, function(result) {
                console.log(result);
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };

        $scope.SetCurrentUser = function(user){
            $rootScope.currentUser = user;
            //when user register go to login, add notification
            //session will expire when user refresh page, because we put user in rootScope
            $state.go('home');
        }
    }
]);
