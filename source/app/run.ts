function run($rootScope, $state, $location, $timeout, $q, auth) {

  let checkPermission = function(permission) {
    console.log(permission, typeof permission !== 'undefined', $rootScope.permissions.indexOf(permission));
    if(typeof permission !== 'undefined' && $rootScope.permissions.indexOf(permission) == -1) {
      $state.go('default');
    }
  };

  let afterLoadSession = function(user) {
    $rootScope.user = user.profile;
    $rootScope.permissions = user.permissions;
    $rootScope.roles = user.roles;

    if(typeof $state.current.needPermission !== 'undefined' && $rootScope.permissions.indexOf($state.current.needPermission) == -1) {
      $state.go('default');
    }

    $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
      if(typeof to.needPermission !== 'undefined' && $rootScope.permissions.indexOf(to.needPermission) == -1) {
        ev.preventDefault();
      }
    });
  };

  $timeout(500).then(function() {
    if ($location.path() != '/auth/callback') {
      auth.checkForAuthentication();

      if (auth.isLoggedIn()) {
        auth.getUserProfile(true, afterLoadSession, function (response) {
          auth.logout();
        });
      }
    } else {
      $rootScope.isCallback = true;
    }
  });
}

run.$inject = ['$rootScope', '$state', '$location', '$timeout', '$q', 'authService'];

export default run;
