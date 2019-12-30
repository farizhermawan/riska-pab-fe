function config(locationProvider, stateProvider, urlRouterProvider) {
  locationProvider.html5Mode(true);
  urlRouterProvider.otherwise('/');

  stateProvider
    .state('default', {url: '/', template: '<dashboard></dashboard>'})
    // User Management
    .state('roles', {url: '/roles', template: '<role></role>'})
    .state('role-members', {url: '/roles/:roleId/members', template: '<role-member></role-member>'})
    .state('permissions', {url: '/permissions', template: '<permission></permission>'})
    .state('role-permissions', {url: '/roles/:roleId/permissions', template: '<role-permission></role-permission>'})
      // Auth
    .state('auth-callback', {url: '/auth/callback', template: '<auth-callback></auth-callback>'});
}

config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

export default config;
