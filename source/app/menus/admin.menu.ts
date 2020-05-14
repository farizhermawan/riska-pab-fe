import Menu from "../interfaces/menu";
import MenuItem from "../interfaces/menu-item";

export default class AdminMenu extends Menu {

  protected getTitle(): string {
    return "Admin";
  }

  protected subMenu() {
    this.items.push(new MenuItem("Suggestion", "suggestions"));
  }
}
