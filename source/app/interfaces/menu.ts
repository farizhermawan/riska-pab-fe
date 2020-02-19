export default class Menu {

  protected items;

  constructor() {
    this.items = [];
    this.subMenu();
  }

  protected getTitle() {
    return "";
  }

  protected subMenu() {}

  protected getItems() {
    return this.items;
  }

  protected getRequiredPermission() {
    return '';
  }
}
