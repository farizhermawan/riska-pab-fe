export default class CallbackComponent {

  constructor(private SweetAlert, private authService) {
  }

  $onInit() {
    let _this = this;
    this.authService.callbackAuth(function (response) {
      console.log(response);
      _this.SweetAlert.swal({
        title: "Login Gagal",
        text: "Gagal masuk dengan akun google anda",
        confirmButtonText: "Coba Lagi",
        type: "error"
      }, function (confirm) {
        if (confirm) {
          _this.authService.logout();
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
