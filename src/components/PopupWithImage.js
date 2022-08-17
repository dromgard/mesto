import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImageElement = this._popup.querySelector('.popup__image-preview');;
    this._popupImageTitle = this._popup.querySelector('.popup__image-title');
    super.setEventListeners();
  }

  // Публичный метод задает элементам попапа значение картинки и описания.
  open(name, link) {
    this._popupImageElement.src = link;
    this._popupImageTitle.textContent = name;
    this._popupImageElement.alt = name;

    // И открывает попап родительским методом.
    super.open();
  }
}