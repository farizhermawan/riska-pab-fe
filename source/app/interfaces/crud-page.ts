import DefaultPage from "./default-page";

export default class CrudPage extends DefaultPage {

  protected record;
  protected records;
  protected selectedRecord;
  protected params;
  protected error;
  protected api;

  private defaultParam;

  protected callbackAfterLoadRecords = (resp) => {
    this.records = resp.data.data;
    this.loading(false);
  };

  protected callbackAfterLoadRecord = (resp) => {
    this.record = resp.data;
    this.loading(false);
  };

  protected callbackAfterSaveRecord = () => {
    this.reset();
    this.loadRecords();
    this.setView(this.defaultView);
  };

  protected callbackErrorSaveRecord = (response) => {
    this.errorMsg("Error", "Gagal menyimpan data");
  };

  protected formPage = "create";

  constructor(params, plugins) {
    super(plugins['alert']);

    this.params = params;
    this.defaultParam = angular.copy(params);
    this.error = {};

    this.records = [];
    this.api = {};
    this.selectedRecord = null;
  }

  protected loadRecord(id, callback = this.callbackAfterLoadRecord) {
    this.loading();
    this.api.show(id).then(callback);
  }

  protected loadRecords(callback = this.callbackAfterLoadRecords) {
    this.loading();
    this.api.index().then(callback);
  }

  protected saveRecord(withoutConfirm = false) {
    if (!this.validateRecord()) return;
    if (withoutConfirm) {
      this.doSave().then(this.callbackAfterSaveRecord, this.callbackErrorSaveRecord);
    } else {
      this.confirmSave(() => this.doSave().then(this.callbackAfterSaveRecord, this.callbackErrorSaveRecord));
    }
  }

  protected doSave() {
    this.loading();
    return this.params.id == null ? this.api.store(this.params) : this.api.update(this.params.id, this.params);
  }

  protected updateRecord(item) {
    this.selectedRecord = angular.copy(item);
    this.params = angular.copy(this.selectedRecord);
    this.setView(this.formPage);
  }

  protected removeRecord(item) {
    this.confirmRemove(() => this.api.destroy(item.id).then(this.callbackAfterSaveRecord));
  }

  protected validateRecord() {
    this.resetError();
    this.validationRules();
    return !this.isError();
  }

  protected validationRules() {
    this.doNothing();
  }

  protected reset() {
    super.reset();
    this.params = angular.copy(this.defaultParam);
    this.resetError();
  }

  protected addError(id, message) {
    this.error[id] = message;
  }

  protected resetError() {
    this.error = {};
  }

  protected hasError(id) {
    return this.error.hasOwnProperty(id);
  }

  protected isError() {
    return !angular.equals(this.error, {});
  }

  protected confirmSave(onConfirm, onCancel = this.doNothing) {
    this.confirmMessage("Simpan Data", "Pastikan semua data yang kamu masukan sudah benar!", onConfirm, onCancel);
  }

  protected confirmRemove(onConfirm, onCancel = this.doNothing) {
    this.confirmMessage("Hapus Data", "Data yang sudah dihapus tidak bisa dikembalikan!", onConfirm, onCancel);
  }
}
