import Menu from "../classes/menu";
import MenuItem from "../classes/menu-item";
import PermissionName from "../classes/permission-name";

export default class UserManagementMenu extends Menu {

  protected getTitle(): string {
    return "User Management";
  }

  protected registerMenu() {
    this.items.push(new MenuItem("Permissions", "permissions"));
    this.items.push(new MenuItem("Roles", "roles"));
  }

  protected getRequiredPermission() {
    return PermissionName.MENU_USER_MANAGEMENT;
  }
}
