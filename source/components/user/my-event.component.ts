import CrudPage from "../../interfaces/crud-page";

export default class MyEventComponent extends CrudPage {
  private readonly userId;
  protected readonly dropdownEventYear = [];
  protected readonly dropdownEventType = [];
  protected readonly dropdownEventRole = [];

  constructor(private apiService, private $rootScope, alert) {
    super(
      {},
      {alert: alert}
    );
    this.userId = $rootScope.user.id;

    this.generateDropdownYear();

    // TODO: use values from suggestion table
    this.dropdownEventRole.push('Ketua Pelaksana');
    this.dropdownEventRole.push('Ketua Acara');
    this.dropdownEventRole.push('Lainnya');

    this.dropdownEventType.push({key: "Internal / Event RISKA", value: 1});
    this.dropdownEventType.push({key: "Eksternal", value: 0});
  }

  $onInit() {
    this.api = {
      index: () => this.apiService.get("/users/" + this.userId + "/events"),
      store: (params) => this.apiService.post("/users/" + this.userId + "/events", params),
      update: (id, params) => this.apiService.put("/users/" + this.userId + "/events/" + id, params),
      destroy: (id) => this.apiService.delete("/users/" + this.userId + "/events/" + id),
    };

    this.loadRecords();
  }

  protected validationRules() {
    if (this.params.name == null || this.params.name == "") this.addError('name', 'Nama event tidak boleh kosong');
    if (this.params.role == null || this.params.role == "") this.addError('role', 'Peran dalam event belum dipilih');
    if (this.params.year == null || this.params.year == "") this.addError('year', 'Tahun pelaksanaan event belum dipilih');
    if (this.params.is_internal == null) this.addError('is_internal', 'Kategori event belum dipilih');
    if (this.params.description == null || this.params.description == "") this.addError('description', 'Deskripsi peran tidak boleh kosong');
  }

  private generateDropdownYear() {
    let year = new Date().getFullYear();
    for(let i = 0; i<10; i++) {
      this.dropdownEventYear.push(year - i);
    }
  }

  static Factory() {
    return {
      controller: MyEventComponent,
      templateUrl: 'views/components/user/my-event.html'
    };
  }
}

MyEventComponent.$inject = ['apiService', '$rootScope', 'SweetAlert'];
