function config(locationProvider, stateProvider, urlRouterProvider) {
  locationProvider.html5Mode(true);
  urlRouterProvider.otherwise('/');

  stateProvider.state('default', {
    url: '/',
    template: '<dashboard></dashboard>'
  })
  .state('department', {
    url: '/departments',
    template: '<department></department>'
  })
  .state('auth-callback', {
    url: '/auth/callback',
    template: '<auth-callback></auth-callback>'
  });
}

config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

export default config;
