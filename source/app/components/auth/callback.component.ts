export default class CallbackComponent {

  constructor(private SweetAlert, private auth) {
  }

  $onInit() {
    let _this = this;
    this.auth.callbackAuth(function() {
      window.location.href = '/';
    }, function (response) {
      console.error(response);
      _this.SweetAlert.swal({
        title: "Login Gagal",
        text: "Gagal masuk dengan akun google anda",
        confirmButtonText: "Coba Lagi",
        type: "error"
      }, function (confirm) {
        if (confirm) {
          _this.auth.logout();
        }
      });
    })
  }

  static Factory() {
    return {
      controller: CallbackComponent,
      templateUrl: 'views/components/auth/callback.html'
    };
  }
}

CallbackComponent.$inject = ['SweetAlert', 'authService'];
