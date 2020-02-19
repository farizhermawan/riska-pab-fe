import CrudPage from "../../interfaces/crud-page";
import ValidationUtil from "../../utils/validation-util";

export default class PermissionComponent extends CrudPage {

  constructor(private apiService, alert) {
    super(
      {},
      {alert: alert}
    );
  }

  $onInit() {
    this.api = {
      index: () => this.apiService.get("/permissions"),
      store: (params) => this.apiService.post("/permissions", params),
      update: (id, params) => this.apiService.put("/permissions/" + id, params),
      destroy: (id) => this.apiService.delete("/permissions/" + id),
    };

    this.loadRecords();
  }

  protected callbackErrorSaveRecord = (response) => {
    this.addError('name', response.data.error);
  };

  protected validationRules() {
    if (this.params.name == null || this.params.name == "") this.addError('name', 'Kode permission tidak boleh kosong');
    else if (ValidationUtil.containSpecialChar(this.params.name.replace(/:/g, ""))) this.addError('name', 'Kode permission tidak boleh mengandung spasi dan special character kecuali titik dua');
    if (this.params.description == null || this.params.description == "") this.addError('description', 'Deskripsi permission tidak boleh kosong');
  }

  static Factory() {
    return {
      controller: PermissionComponent,
      templateUrl: 'views/components/user_management/permission.html'
    };
  }
}

PermissionComponent.$inject = ['apiService', 'SweetAlert'];
