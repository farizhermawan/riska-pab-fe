export default class MainSidebarComponent {

  protected user;

  constructor(private $rootScope, private SweetAlert, private authService) {
  }

  $onInit() {
    this.user = this.$rootScope.user;
  }

  logout() {
    let _this = this;
    _this.SweetAlert.swal({
      title: "Ingin keluar dari aplikasi?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }, function (confirm) {
      if (confirm) {
        _this.authService.logout();
      }
    });
  };

  static Factory() {
    return {
      controller: MainSidebarComponent,
      templateUrl: 'views/components/main-sidebar.html'
    };
  }
}

MainSidebarComponent.$inject = ['$rootScope', 'SweetAlert', 'authService'];
