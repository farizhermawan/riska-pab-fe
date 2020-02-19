export default class DefaultPage {

  protected view;
  protected defaultView = "read";

  private alert;
  private loadingState;

  constructor(alert) {
    this.loadingState = false;
    this.view = this.defaultView;

    this.alert = alert;
  }

  protected setView(view) {
    this.view = view;
  }

  protected back() {
    this.reset();
    this.setView(this.defaultView);
  }

  protected reset() {
    this.loading(false);
  }

  protected loading(isLoading = true) {
    this.loadingState = isLoading;
  }

  protected isLoading() {
    return this.loadingState == true;
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

  protected successMsg(title, message) {
    this.alert.swal(title, message, "success");
  }

  protected errorMsg(title, message) {
    this.alert.swal(title, message, "error");
  }

  protected infoMsg(title, message) {
    this.alert.swal(title, message, "info");
  }

  protected doNothing() {
  }
}
