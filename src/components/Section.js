export class Section {
  constructor(items, renderer, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

  deleteItem(item) {
    item.remove();
  }

  addItem(element) {
    this._container.append(element);
  }
}