import PermissionName from "./classes/permission-name";

function config(locationProvider, stateProvider, urlRouterProvider) {
  locationProvider.html5Mode(true);
  urlRouterProvider.otherwise('/');

  stateProvider
    .state('default', {
      url: '/',
      template: '<dashboard></dashboard>'
    })
    // User Management
    .state('roles', {
      url: '/roles',
      needPermission: PermissionName.MENU_USER_MANAGEMENT,
      template: '<role></role>'
    })
    .state('role-members', {
      url: '/roles/:roleId/members',
      needPermission: PermissionName.MENU_USER_MANAGEMENT,
      template: '<role-member></role-member>'
    })
    .state('permissions', {
      url: '/permissions',
      needPermission: PermissionName.MENU_USER_MANAGEMENT,
      template: '<permission></permission>'
    })
    .state('role-permissions', {
      url: '/roles/:roleId/permissions',
      needPermission: PermissionName.MENU_USER_MANAGEMENT,
      template: '<role-permission></role-permission>'
    })
    // Auth
    .state('auth-callback', {url: '/auth/callback', template: '<auth-callback></auth-callback>'});
}

config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

export default config;
