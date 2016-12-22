app.controller('MainCtroller', ["$rootScope", "$scope", "AuthService", "AUTH_EVENTS", "AlertService",

    function($rootScope, $scope, AuthService, AUTH_EVENTS, AlertService) {
        $rootScope.alertsShow = false;

        //added main controller to better organize notfication
        $scope.$on('handleAlertBroadcast', function() {
            $rootScope.alertsShow = AlertService.getAlertShowState();
            $rootScope.alerts = AlertService.getAlerts();

        });

        $scope.showNotification = function(type, msg) {
            AlertService.addAlert(type, msg, 10000);
        };

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, args) {
            AlertService.alertsShow = true;
            $scope.showNotification('success', 'You are logged in.');
        });

        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event, args){
        	AlertService.alertsShow = true;
            $scope.showNotification('danger', 'You are logged out.');
        });

        $rootScope.$on(AUTH_EVENTS.notAuthorized, function(event, args){
        	AlertService.alertsShow = true;
            $scope.showNotification('danger', 'You are not authorized.');
        });

        $rootScope.$on(AUTH_EVENTS.registerSuccess, function(event, args){
        	AlertService.alertsShow = true;
            $scope.showNotification('success', 'You are succesfuly done registration.');
        });

        $rootScope.$on(AUTH_EVENTS.editSuccess, function(event, args){
        	AlertService.alertsShow = true;
            $scope.showNotification('success', 'You are succesfuly done editing.');
        });

        $rootScope.$on(AUTH_EVENTS.loginFailed, function(event, args){
        	AlertService.alertsShow = true;
            $scope.showNotification('danger', 'Login failed.');
        });

    }
]);
