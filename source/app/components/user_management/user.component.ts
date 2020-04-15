import CrudPage from "../../interfaces/crud-page";

export default class UserComponent extends CrudPage {

  constructor(private apiService, private lightbox, alert) {
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

  openPhoto(src) {
    this.lightbox.openModal([{url: src, thumbUrl: src}], 0);
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

UserComponent.$inject = ['apiService', 'Lightbox', 'SweetAlert'];
