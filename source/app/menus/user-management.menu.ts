import Menu from "../interfaces/menu";
import MenuItem from "../interfaces/menu-item";
import PermissionName from "../constants/permission-name";

export default class UserManagementMenu extends Menu {

  protected getTitle(): string {
    return "User Management";
  }

  protected subMenu() {
    this.items.push(new MenuItem("Permissions", "permissions"));
    this.items.push(new MenuItem("Roles", "roles"));
  }

  protected getRequiredPermission() {
    return PermissionName.MENU_USER_MANAGEMENT;
  }
}
