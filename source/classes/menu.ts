export default class Menu {

  protected items;

  constructor() {
    this.items = [];
    this.registerMenu();
  }

  protected getTitle() {
    return "";
  }

  protected registerMenu() {}

  protected getItems() {
    return this.items;
  }

  protected getRequiredPermission() {
    return '';
  }
}
