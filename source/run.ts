function run($rootScope, $location, authService) {

  if ($location.path() != '/auth/callback') {
    authService.checkForAuthentication();
    $rootScope.user = authService.currentUser().profile;
  }
}

run.$inject = ['$rootScope', '$location', 'authService'];

export default run;
