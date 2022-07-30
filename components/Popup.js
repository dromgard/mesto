export class Popup {
  constructor(popup) {
    this._popup = popup;
    this._bindHandleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._bindHandleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._bindHandleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  // Закрытие попапа по Esc.
  _handleEscClose(evt) {
    if (evt.code === 'Escape') {
      this.close();
    }
  }

  // Навешиваем слушатели на все попапы для закрытия по оверлею и крестику.
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}