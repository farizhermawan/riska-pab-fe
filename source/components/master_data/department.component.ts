import DefaultPage from "../../classes/default-page";

export default class DepartmentComponent extends DefaultPage {

  constructor(private dataService, SweetAlert) {
    super(
      {},
      {id: null, name: null, short_name: null},
      {},
      {SweetAlert: SweetAlert}
    );
  }

  $onInit() {
    this.loadRecords();
  }

  private submitForm() {
    let _this = this;
    if (!this.validateForm()) return;

    this.confirmSave(function (resp) {
      _this.loading = true;
      _this.dataService.saveDepartment(_this.param, function () {
        _this.reset();
        _this.loadRecords();
        _this.changeView('read');
      }, function () {
        _this.errorMsg("Error", "Gagal menyimpan data");
      });
    });
  }

  private updateRecord(item) {
    this.changeView('create');
    this.selected = angular.copy(item);
    this.param = angular.copy(this.selected);
  }

  private removeRecord(item) {
    let _this = this;
    this.confirmRemove(function () {
      _this.dataService.removeDepartment(item.id, function () {
        _this.reset();
        _this.loadRecords();
        _this.changeView('read');
      });
    });
  }

  private loadRecords() {
    let _this = this;
    this.loading = true;
    this.dataService.getAllDepartments(function (resp) {
      _this.data = resp.data;
      _this.loading = false;
    })
  }

  private validateForm() {
    this.resetError();
    if (this.param.name == null || this.param.name == "") this.addError('name', 'Nama departemen tidak boleh kosong');
    if (this.param.short_name == null || this.param.short_name == "") this.addError('short_name', 'Nama pendek departemen tidak boleh kosong');
    return !this.isError();
  }

  static Factory() {
    return {
      controller: DepartmentComponent,
      templateUrl: 'views/components/master_data/department.html'
    };
  }
}

DepartmentComponent.$inject = ['dataService', 'SweetAlert'];
