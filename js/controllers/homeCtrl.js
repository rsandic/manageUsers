app.controller('HomeController', ["$rootScope", "$scope", "AuthService", "AUTH_EVENTS", '$state', 'localStorageService',
    function($rootScope, $scope, AuthService, AUTH_EVENTS, $state, localStorageService) {
        //take value from cookie, because we store our user there
        $scope.currentUser = localStorageService.cookie.get('currentUser');

        $scope.Logout = function() {
            localStorageService.cookie.set('currentUser', {});
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            $state.go('login');
        }
    }
]);
