app.controller('RegisterController', ["$rootScope", "$scope", "localStorageService", "AuthService", "$state", "$stateParams","AUTH_EVENTS", 
    function($rootScope, $scope, localStorageService, AuthService, $state, $stateParams, AUTH_EVENTS) {
    
        //This page is use for registration and editing users
        //When we have username in stateParams we know that is page for editing
        if ($stateParams.username == undefined) {
            //if not a admin he can not register others, redirect to login
            if(AuthService.isAuthenticated().userRole && AuthService.isAuthenticated().userRole != 'admin'){
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                $state.go('home');
            }
            //new page
            $scope.pageState = "new";
            $scope.user = {
                firstName: null,
                lastName: null,
                username: null,
                password: null,
                dateOfRegistration : null,
                lastChangeDate : null,
                role: 'guest'
            };
            //function for storing user in localStorage
            //his username is key, whole object is value 

        } else {
            //editing page
            $scope.pageState = "edit";
            var userForEdit = localStorageService.get($stateParams.username);
            $scope.user = userForEdit;
            $scope.logUser = AuthService.isAuthenticated();
        }


        $scope.Register = function() {
            if ($scope.pageState == 'new') {
                //seting current date for date of registration
                $scope.user.dateOfRegistration = new Date().getTime(); 
                localStorageService.set($scope.user.username, $scope.user);
                $rootScope.$broadcast(AUTH_EVENTS.registerSuccess);
                $state.go('login');
            }else{
                //setting last change date 
                $scope.user.lastChangeDate = new Date().getTime();
                localStorageService.set($stateParams.username, $scope.user);
                //changing current logged user, if he changin 
                //Session.SetCurrentLogUser($scope.username, $scope.role);
                $rootScope.$broadcast(AUTH_EVENTS.editSuccess);
                $state.go('home');
            }

        };


    }
]);
