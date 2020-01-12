export default class Menu {

  protected items;

  constructor() {
    this.items = [];
    this.registerMenu();
  }

  getTitle() {
    return "";
  }

  protected registerMenu() {}

  getItems() {
    return this.items;
  }

  getRequiredPermission() {
    return '';
  }
}
