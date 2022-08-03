export class Section {
  constructor(items, renderer, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    //this._items.forEach(item => this._renderer(item));
    this._items.forEach(this._renderer.bind(this));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}