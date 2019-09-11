function run(SweetAlert, $rootScope, $state, $timeout, $location, $cookies) {

  $rootScope.user = {
    id: null,
    auth0_id: null,
    name: 'fariz.hermawan@traveloka.com',
    remember_token: null,
    role: ""
  };

  $rootScope.isLoggedIn = function () {
    return $rootScope.user.role != 'not connected';
  };

  $rootScope.isRegistered = function () {
    return $rootScope.isLoggedIn() && $rootScope.user.role != 'unknown';
  };

  $rootScope.logout = function () {
    SweetAlert.swal({
      title: "Ingin keluar dari aplikasi?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }, function (confirm) {
      if (confirm) {
        window.close();
      }
    });
  };
}

run.$inject = ['SweetAlert', '$rootScope', '$state', '$timeout', '$location', '$cookies'];

export default run;