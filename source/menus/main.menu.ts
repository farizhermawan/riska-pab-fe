import UserMenu from "./user.menu";
import UserManagementMenu from "./user-management.menu";

export default class MainMenu {

  private items;

  public getItems(): [] {
    return this.items;
  }

  constructor() {
    this.items = [];
    this.items.push(new UserMenu());
    this.items.push(new UserManagementMenu());
  }
}
