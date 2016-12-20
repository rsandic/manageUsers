app.controller('DashboardController', ["$rootScope", "$scope", "AuthService", "AUTH_EVENTS",'$state','localStorageService',
    function($rootScope, $scope, AuthService, AUTH_EVENTS, $state, localStorageService) {
        
        $scope.currentUser = localStorageService.cookie.get('currentUser');
        $scope.arrayOfAllUserData = [];

        var lsKeys = localStorageService.keys();
        console.log(lsKeys);
        //$scope.ListOfAllUsers();

        //---------------------------------------
        //methods
        $scope.GetUserByKey = function(key) {
        	return localStorageService.get(key);
        }

        $scope.ListOfAllUsers = function(){
        	for(i=1; i<lsKeys.length; i++){
        		$scope.arrayOfAllUserData.push($scope.GetUserByKey(lusKeys[i]));
        	}
        	//console.log($scope.arrayOfAllUserData);
        }
    }
]);