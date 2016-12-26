app.factory('AuthService', function($http, $q, Session, localStorageService, $rootScope) {
    var authService = {};

    //seting admin - default user, 
    var adminUser = {
        firstName: "Default",
        lastName: "Admin",
        username: "user",
        password: "user",
        email : "user@gmail.com",
        role: 'admin',
        dateOfRegistration: new Date("2016-12-25T12:00:00Z").getTime(),
        lastChangeDate: null
    };
    localStorageService.set("user", adminUser);

    authService.login = function(credentials) {
        //attempting to get user from localStorage by his user name
        //if his username existis we ask is his password ok
        var userToCheck = authService.getUserByUserName(credentials.username);
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
    authService.getUserByUserName = function(userName) {
        //geting user by user name from localstorage
        return localStorageService.get(userName);
    }

    authService.isAuthenticated = function() {
        //get current user, how is stored in cookie
        return Session.GetCurrentLogUser();
    };

    authService.isAuthorized = function(authorizedRoles) {
        //current loged user    
        var logUser = Session.GetCurrentLogUser();
        if (authorizedRoles.indexOf(logUser.userRole) != -1) {
            return true
        };
    };

    //retutning current session user from cookie
    authService.getSessionUser = function() {
        return Session.GetCurrentLogUser()
    };

    return authService;
})
