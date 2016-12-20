
app.factory('Session', function($http, localStorageService) {

    var Session = {};

    Session.SetCurrentLogUser = function(userName, userRole) {
        var key = 'currentUser';
        var val = {
            userName: userName,
            userRole: userRole
        }

        return localStorageService.cookie.set(key, val);
    }

    Session.GetCurrentLogUser = function() {
        return localStorageService.cookie.get('currentUser');
    }


    Session.DestroyCurrentLogUser = function() {
        return localStorageService.cookie.set('currentUser', {});
    }

    return Session;
});
