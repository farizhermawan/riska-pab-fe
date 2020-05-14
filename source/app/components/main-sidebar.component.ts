import UserMenu from "../menus/user.menu";
import UserManagementMenu from "../menus/user-management.menu";
import AdminMenu from "../menus/admin.menu";

export default class MainSidebarComponent {

  protected readonly menus;

  constructor(private $rootScope, private $state, private SweetAlert, private auth) {
    this.menus = [
      new UserMenu(),
      new UserManagementMenu(),
      new AdminMenu(),
    ];
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
      if (this.isMenuItemActive(items[i])) return true;
    }
    return false;
  };

  isMenuItemActive(menu) {
    let currentState = this.$state.current;
    if (typeof currentState.base != 'undefined') return currentState.base.indexOf(menu.link) != -1;
    return currentState.name.indexOf(menu.link) != -1;
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
