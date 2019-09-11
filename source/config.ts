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
    });
}

config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

export default config;