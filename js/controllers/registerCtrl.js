app.controller('RegisterController', ["$rootScope", "$scope", "localStorageService", "Session", "$state", "$stateParams",
    function($rootScope, $scope, localStorageService, Session, $state, $stateParams) {
        //console.log("Trenutni ulogovani korisnik je", Session);

        if ($stateParams.username == undefined) {
            $scope.pageState = "new";
            $scope.user = {
                firstName: null,
                lastName: null,
                username: null,
                password: null,
                role: 'guest'
            };
            //function for storing user in localStorage
            //his username is key, whole object is value 

        } else {

            $scope.pageState = "edit";
            var userForEdit = localStorageService.get($stateParams.username);
            $scope.user = userForEdit;
        }


        $scope.Register = function() {
            if ($scope.pageState == 'new') {
                localStorageService.set($scope.user.username, $scope.user);
                $state.go('login');
            }else{
                localStorageService.set($stateParams.username, $scope.user);
            }

        };


    }
]);
