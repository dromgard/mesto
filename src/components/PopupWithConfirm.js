import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popup, handlerSubmitForm) {
    super(popup);
    this._form = this._popup.querySelector('.popup__form');
    this._handlerSubmitForm = handlerSubmitForm;
  }

  // Открываем попап подтверждения удаления карточки. В него попадает id карточки и сама карточка.
  open(id, card) {
    this._id = id;
    this._card = card;

    super.open();
  }

  // При нажатии на кнопку submit передаем в колбэк id карточки и саму карточку для удаления.
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(this._id, this._card);
    });

    super.setEventListeners();
  }

}
