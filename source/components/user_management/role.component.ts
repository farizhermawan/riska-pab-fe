import CrudPage from "../../classes/crud-page";

export default class RoleComponent extends CrudPage {

  constructor(private apiService, alert) {
    super(
      {},
      {alert: alert}
    );
  }

  $onInit() {
    this.api = {
      index: () => this.apiService.get("/roles"),
      store: (params) => this.apiService.post("/roles", params),
      update: (id, params) => this.apiService.put("/roles/" + id, params),
      destroy: (id) => this.apiService.delete("/roles/" + id),
    };

    this.loadRecords();
  }

  protected validationRules() {
    if (this.params.name == null || this.params.name == "") this.addError('name', 'Nama role tidak boleh kosong');
    if (this.params.description == null || this.params.description == "") this.addError('description', 'Deskripsi role tidak boleh kosong');
  }

  static Factory() {
    return {
      controller: RoleComponent,
      templateUrl: 'views/components/user_management/role.html'
    };
  }
}

RoleComponent.$inject = ['apiService', 'SweetAlert'];
