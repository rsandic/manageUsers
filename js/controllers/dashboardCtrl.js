app.controller('DashboardController', ["$rootScope", "$scope", "AuthService", "AUTH_EVENTS", '$state', 'localStorageService',
    function($rootScope, $scope, AuthService, AUTH_EVENTS, $state, localStorageService) {

        $scope.currentUser = localStorageService.cookie.get('currentUser');
        $scope.arrayOfAllUserData = [];

        $scope.listOfUsers = localStorageService.keys();
        console.log($scope.listOfUsers);


        //---------------------------------------
        //methods

        $scope.GetUserByKey = function(key) {
            return localStorageService.get(key);
        }

        $scope.ListOfAllUsers = function() {

            angular.forEach($scope.listOfUsers, function(value, key) {
                $scope.arrayOfAllUserData.push($scope.GetUserByKey(value));
            });
        }

        $scope.ListOfAllUsers();

        $scope.DeleteUser = function(userName) {
            localStorageService.remove(userName);
        }

        

    }
]);
