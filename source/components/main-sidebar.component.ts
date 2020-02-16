import MainMenu from "../menus/main.menu";

export default class MainSidebarComponent {

  protected menus;

  constructor(private $rootScope, private $state, private SweetAlert, private auth) {
  }

  $onInit() {
    this.menus = new MainMenu();
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
        _this.auth.logout();
      }
    });
  };

  isMenuActive(menu) {
    let items = menu.getItems();
    for(let i=0; i<items.length; i++){
      if (this.$state.current.name.indexOf(items[i].link) != -1) return true;
    }
    return false;
  };

  isMenuItemActive(menu) {
    return this.$state.current.name.indexOf(menu.link) != -1;
  };

  canAccess(menu) {
    return menu.getRequiredPermission() == "" ? true : this.$rootScope.permissions.indexOf(menu.getRequiredPermission()) != -1;
  }

  static Factory() {
    return {
      controller: MainSidebarComponent,
      templateUrl: 'views/components/main-sidebar.html'
    };
  }
}

MainSidebarComponent.$inject = ['$rootScope', '$state', 'SweetAlert', 'authService'];
