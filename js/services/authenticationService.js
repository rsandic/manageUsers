app.factory('AuthService', function($http, $q, Session, localStorageService, $rootScope) {
    var authService = {};

    //seting admin - default user
     var adminUser = {
            firstName: "Test",
            lastName: "User",
            username: "user",
            password: "user",
            role : 'admin'
        };
    localStorageService.set("user", adminUser);

    authService.login = function(credentials) {
        //attempting to get user from localStorage by his user name
        //if his username existis we ask is his password ok
        var userToCheck = getUserByUserName(credentials.username);
        if (userToCheck != null && userToCheck.password == credentials.password) {
            //storing current user in cookie 
            Session.SetCurrentLogUser(userToCheck.username, userToCheck.role);
            //returng user as promise, and then we set him to rootScope
            return $q.resolve(userToCheck);
        } else {
            //if user not exist
            return $q.reject("No User");
        }
    };

    //funkcija koja iz localStorige vraca user-a , userName se koristi kao key
    function getUserByUserName(userName) {
        return localStorageService.get(userName);
    }

    authService.isAuthenticated = function() {
        return Session.GetCurrentLogUser();
    };

    authService.isAuthorized = function(authorizedRoles) {
        //current loged user    
        var logUser = Session.GetCurrentLogUser();
        if (authorizedRoles.indexOf(logUser.userRole) != -1) {
            return true 
        };
    };

    return authService;
})
