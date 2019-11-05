import angular = require("angular");

export default class DefaultPage {

  protected list;
  protected param;
  protected data;
  protected selected;
  protected loading;
  protected error;
  protected view;

  private defaultParam;
  private alert;

  constructor(list, param, data, plugins) {
    this.list = list;
    this.param = param;
    this.defaultParam = angular.copy(param);
    this.data = data;
    this.selected = null;
    this.loading = false;
    this.error = {};
    this.view = 'read';

    this.alert = plugins['SweetAlert'];
  }

  protected reset() {
    this.param = angular.copy(this.defaultParam);
    this.loading = false;
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

  protected confirmMessage(title, text, onConfirm, onCancel = this.doNothing) {
    this.alert.swal({
      title: title,
      text: text,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
      closeOnConfirm: true
    }, function (isConfirm) {
      if (isConfirm) onConfirm();
      else onCancel();
    });
  }

  protected confirmSave(onConfirm, onCancel = this.doNothing) {
    this.confirmMessage("Simpan Data", "Pastikan semua data yang kamu masukan sudah benar!", onConfirm, onCancel);
  }

  protected confirmRemove(onConfirm, onCancel = this.doNothing) {
    this.confirmMessage("Hapus Data", "Data yang sudah dihapus tidak bisa dikembalikan!", onConfirm, onCancel);
  }

  protected inputBox(title, text, onSubmit) {
    this.alert.swal({
      title: title,
      text: text,
      type: "input",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
      closeOnConfirm: true
    }, function (input) {
      onSubmit(input);
    });
  }

  protected successMsg(title, message) {
    this.alert.swal(title, message, "success");
  }

  protected errorMsg(title, message) {
    this.alert.swal(title, message, "error");
  }

  protected infoMsg(title, message) {
    this.alert.swal(title, message, "info");
  }

  protected changeView(view) {
    this.view = view;
  }

  protected back() {
    this.reset();
    this.changeView('read');
  }

  private doNothing() {
  }
}
