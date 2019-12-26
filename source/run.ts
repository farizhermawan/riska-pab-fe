function run($rootScope, $location, $timeout, auth) {

  if ($location.path() != '/auth/callback') {
    auth.checkForAuthentication();
    auth.getUserProfile(true, function(profile) {
      $rootScope.user = profile
    }, function (response) {
      if (response.status == 401) auth.logout();
      else console.error(response);
    });
  }
}

run.$inject = ['$rootScope', '$location', '$timeout', 'authService'];

export default run;
