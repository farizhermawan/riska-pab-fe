import CrudPage from "../../interfaces/crud-page";

export default class UserComponent extends CrudPage {

  constructor(private apiService, alert) {
    super(
      {},
      {alert: alert}
    );
  }

  $onInit() {
    this.api = {
      index: () => this.apiService.get("/users"),
      store: (params) => this.apiService.post("/users", params),
      update: (id, params) => this.apiService.put("/users/" + id, params),
      destroy: (id) => this.apiService.delete("/users/" + id),
    };

    this.loadRecords();
  }

  protected validationRules() {

  }

  static Factory() {
    return {
      controller: UserComponent,
      templateUrl: 'views/components/user_management/user.html'
    };
  }
}

UserComponent.$inject = ['apiService', 'SweetAlert'];
