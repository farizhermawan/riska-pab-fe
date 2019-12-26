import Menu from "../classes/menu";
import MenuItem from "../classes/menu-item";

export default class UserManagementMenu extends Menu {

  protected getTitle(): string {
    return "User Management";
  }

  protected registerMenu() {
    this.items.push(new MenuItem("Roles", "roles"));
  }
}
