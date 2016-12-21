app.controller('LoginController', ["$rootScope", "$scope", "AuthService", "AUTH_EVENTS",'$state','AlertService', 
    function($rootScope, $scope, AuthService, AUTH_EVENTS, $state, AlertService) {
        //console.log(AuthService);
        $scope.login = function(credentials) {
            AuthService.login(credentials).then(function(user) {
            	//console.log(user);
                //$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                //setting current user    
                $scope.SetCurrentUser(user);
                AlertService.alertsShow = true;
                $scope.showNotification('danger', 'Border width style can only be between 1 and 10px.');
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


        $scope.$on('handleAlertBroadcast', function () {
            $scope.alertsShow = AlertService.getAlertShowState();
            $scope.alerts = AlertService.getAlerts();

        });


        $scope.showNotification = function (type, msg) {
            AlertService.addAlertWithTime(type, msg, 4000);
        };
    }
]);
