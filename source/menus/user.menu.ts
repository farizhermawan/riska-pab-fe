import Menu from "../interfaces/menu";
import MenuItem from "../interfaces/menu-item";

export default class UserMenu extends Menu {

  protected getTitle(): string {
    return "User";
  }

  protected subMenu() {
    this.items.push(new MenuItem("Pengalaman Kepanitiaan", "me-events"));
  }
}
