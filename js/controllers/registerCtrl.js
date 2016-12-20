app.controller('RegisterController', ["$rootScope", "$scope", "localStorageService", "Session", '$state',
    function($rootScope, $scope, localStorageService, Session, $state) {
        
        console.log("Trenutni ulogovani korisnik je",Session);
        $scope.user = {
            firstName: null,
            lastName: null,
            username: null,
            password: null,
            role : 'guest'
        };

        //function for storing user in localStorage
        //his username is key, whole object is value 
        $scope.Register = function(){
        	localStorageService.set($scope.user.username, $scope.user);
            $state.go('login');
        };

    }
]);
