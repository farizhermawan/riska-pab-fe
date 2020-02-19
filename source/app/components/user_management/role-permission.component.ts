import CrudPage from "../../interfaces/crud-page";

export default class RolePermissionComponent extends CrudPage {

  private readonly roleId;
  private permissionIds;

  constructor(private apiService, alert, $stateParams) {
    super(
      {},
      {alert: alert}
    );
    this.roleId = $stateParams.roleId;
  }

  $onInit() {
    this.api = {
      permissions: () => this.apiService.get("/permissions"),
      index: () => this.apiService.get("/roles/" + this.roleId + "/permissions"),
      show: () => this.apiService.get("/roles/" + this.roleId),
      store: (params) => this.apiService.post("/roles/" + this.roleId + "/permissions", params),
      destroy: (permissionId) => this.apiService.delete("/roles/" + this.roleId + "/permissions/" + permissionId)
    };

    this.loadRecords();
  }

  protected async loadRecords() {
    this.permissionIds = [];

    await this.api.permissions().then((response) => {
      this.records = response.data.data;
    });
    await this.api.index().then((response) => {
      response.data.forEach((item, index) => {
        this.permissionIds.push(item.id);
      });
    });
    await this.api.show().then((response) => {
      this.record = response.data;
    });
  }

  hasPermission(permissionId) {
    return this.permissionIds.indexOf(permissionId) != -1;
  }

  attachPermission (permissionId) {
    this.loading();
    this.api.store({permission_id: permissionId}).then((response) => {
      this.permissionIds.push(permissionId);
      this.loading(false);
    });
  }

  detachPermission (permissionId) {
    this.loading();
    this.api.destroy(permissionId).then((response) => {
      this.permissionIds = this.permissionIds.filter(item => item != permissionId);
      this.loading(false);
    });
  }

  static Factory() {
    return {
      controller: RolePermissionComponent,
      templateUrl: 'views/components/user_management/role-permission.html'
    };
  }
}

RolePermissionComponent.$inject = ['apiService', 'SweetAlert', '$stateParams'];
