function run($rootScope, $localStorage, $location, authService) {

  if ($location.path() != '/auth/callback') {
    authService.checkForAuthentication();
    $rootScope.user = $localStorage.currentUser.profile;
  }
}

run.$inject = ['$rootScope', '$localStorage', '$location', 'authService'];

export default run;
