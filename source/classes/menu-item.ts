export default class MenuItem {

  private title;
  private link;

  constructor(title, link) {
    this.title = title;
    this.link = link;
  }

  getTitle() {
    return this.title;
  }

  getLink() {
    return this.link;
  }
}
