export class Section {
  constructor(renderer, container) {
    this._renderer = renderer;
    this._container = container;
  }

  // Этим методом отрисовываем карточки при загрузке страницы.
  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }

  deleteItem(item) {
    item.remove();
  }

  //Добавляем карточки в начало списка.
  addItemPrepend(element) {
    this._container.prepend(element);
  }

  //Добавляем карточки в конец списка.
  addItemAppend(element) {
    this._container.append(element);
  }
}