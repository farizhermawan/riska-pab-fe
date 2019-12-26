import CrudPage from "../../classes/crud-page";
import Util from "../../classes/util";

export default class RoleMemberComponent extends CrudPage {

  private roleId;

  constructor(private apiService, alert, $stateParams) {
    super(
      {},
      {alert: alert}
    );
    this.roleId = $stateParams.roleId;
  }

  $onInit() {
    this.api = {
      show: () => this.apiService.get("/roles/" + this.roleId),
      store: (params) => this.apiService.post("/roles/" + this.roleId + "/users", params),
      update: (userId, params) => this.apiService.put("/roles/" + this.roleId + "/users/" + userId, params),
      destroy: (userId) => this.apiService.delete("/roles/" + this.roleId + "/users/" + userId)
    };

    this.loadRecords();
  }

  protected loadRecords() {
    super.loadRecord(this.roleId);
  }

  protected callbackErrorSaveRecord = (response) => {
    this.addError('email', response.data.error);
  };

  protected saveRecord() {
    super.saveRecord(true);
  }

  protected validationRules() {
    if (this.params.email == null || this.params.email == "") this.addError('email', 'Email tidak boleh kosong');
    else if (Util.validateEmail(this.params.email) == false) this.addError('email', 'Email tidak valid');
  }

  markAsActive (item) {
    this.loading();
    this.api.update(item.id, {is_active: true, expired_at: item.pivot.expired_at}).then((response) => {
      item.pivot.is_active = true;
      this.loading(false);
    });
  }

  markAsInactive (item) {
    this.loading();
    this.api.update(item.id, {is_active: false, expired_at: item.pivot.expired_at}).then((response) => {
      item.pivot.is_active = false;
      this.loading(false);
    });
  }

  static Factory() {
    return {
      controller: RoleMemberComponent,
      templateUrl: 'views/components/user_management/role-member.html'
    };
  }
}

RoleMemberComponent.$inject = ['apiService', 'SweetAlert', '$stateParams'];
