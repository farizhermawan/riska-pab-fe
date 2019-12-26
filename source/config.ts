function config(locationProvider, stateProvider, urlRouterProvider) {
  locationProvider.html5Mode(true);
  urlRouterProvider.otherwise('/');

  stateProvider
    .state('default', {url: '/', template: '<dashboard></dashboard>'})
    // User Management
    .state('roles', {url: '/roles', template: '<role></role>'})
    .state('roles-members', {url: '/roles/:roleId/members', template: '<role-member></role-member>'})
    // Auth
    .state('auth-callback', {url: '/auth/callback', template: '<auth-callback></auth-callback>'});
}

config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

export default config;
