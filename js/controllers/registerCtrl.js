app.controller('RegisterController', ["$rootScope", "$scope", "localStorageService", "AuthService", "$state", "$stateParams","AUTH_EVENTS", 
    function($rootScope, $scope, localStorageService, AuthService, $state, $stateParams, AUTH_EVENTS) {
        //console.log("Trenutni ulogovani korisnik je", Session);
        
        if ($stateParams.username == undefined) {
            //if not a admin he can not register others, redirect to login
            
            if(AuthService.isAuthenticated().userRole && AuthService.isAuthenticated().userRole != 'admin'){
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                $state.go('home');
            }
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
            $scope.logUser = AuthService.isAuthenticated();
        }


        $scope.Register = function() {
            if ($scope.pageState == 'new') {
                localStorageService.set($scope.user.username, $scope.user);
                $rootScope.$broadcast(AUTH_EVENTS.registerSuccess);
                $state.go('login');
            }else{
                localStorageService.set($stateParams.username, $scope.user);
                //changing current logged user, if he changin 
                //Session.SetCurrentLogUser($scope.username, $scope.role);
                $rootScope.$broadcast(AUTH_EVENTS.editSuccess);
            }

        };


    }
]);
