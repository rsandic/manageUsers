var app = angular.module("ManageUsers", [
    'ui.router', 
    'LocalStorageModule',
    'lsalert'
]);

//-------------------------------------------------
//defining app constant

app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
}).constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
});

//-------------------------------------------------
//routing

app.config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES', function($stateProvider, $urlRouterProvider, USER_ROLES) {

    $urlRouterProvider.when('', '/login');

    $stateProvider
        .state('login', {
            url: '/login',
            controller: 'LoginController',
            templateUrl: 'views/login.view.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
            }
        })
        .state('register', {
            url: '/register',
            controller: 'RegisterController',
            templateUrl: 'views/register.view.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
            }

        })
        .state('home', {
            url: '/home',
            controller: 'HomeController',
            templateUrl: 'views/home.view.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
            }
        })
        .state('dashboard', {
            url: '/dashboard',
            controller: 'DashboardController',
            templateUrl: 'views/dashboard.view.html',
            data: {
                authorizedRoles: [USER_ROLES.admin]
            }
        })
}]);

//------------------------------------------------------------
//on state change check is user is authorized and authenticated

app.run(function($rootScope, AUTH_EVENTS, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
        var authorizedRoles = next.data.authorizedRoles;
        //console.log(AuthService.isAuthorized(authorizedRoles));
        if(!(next.name == 'register' || next.name == 'login'))
        if (!AuthService.isAuthorized(authorizedRoles)) {
            event.preventDefault();
            if (AuthService.isAuthenticated()) {
                // user is not allowed  
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            } else {
                // user is not logged in
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
        }
    });


});
