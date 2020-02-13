import CrudPage from "../../classes/crud-page";
import ValidationUtil from "../../classes/validation-util";

export default class RoleMemberComponent extends CrudPage {

  private readonly roleId;
  private user;

  constructor(private apiService, private $q, alert, $stateParams) {
    super(
      {},
      {alert: alert}
    );
    this.roleId = $stateParams.roleId;
  }

  $onInit() {
    this.api = {
      index: () => this.apiService.get("/roles/" + this.roleId + "/users"),
      show: () => this.apiService.get("/roles/" + this.roleId),
      store: (params) => this.apiService.post("/roles/" + this.roleId + "/users", params),
      update: (userId, params) => this.apiService.put("/roles/" + this.roleId + "/users/" + userId, params),
      destroy: (userId) => this.apiService.delete("/roles/" + this.roleId + "/users/" + userId),
      searchUser: (filter) => this.apiService.get("/users/", filter)
    };

    this.loadRecords();
  }

  protected callbackAfterLoadRecords = (resp) => {
    this.records = resp.data;
    this.loading(false);
  };

  protected callbackErrorSaveRecord = (response) => {
    this.addError('email', response.data.error);
    this.loading(false);
  };

  protected saveRecord() {
    this.params.email = this.user == null ? null : this.user.email;
    super.saveRecord(true);
  }

  protected validationRules() {
    if (this.params.email == null || this.params.email == "") this.addError('email', 'Email tidak boleh kosong');
    else if (ValidationUtil.isEmail(this.params.email) == false) this.addError('email', 'Email tidak valid');
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

  searchUser(query, querySelectAs) {
    if (query == null || query.length < 2) return;
    let deferred = this.$q.defer();
    this.api.searchUser({email: query}).then((resp) => {
      deferred.resolve(resp.data.data);
    });
    return deferred.promise;
  };

  static Factory() {
    return {
      controller: RoleMemberComponent,
      templateUrl: 'views/components/user_management/role-member.html'
    };
  }
}

RoleMemberComponent.$inject = ['apiService', '$q', 'SweetAlert', '$stateParams'];
