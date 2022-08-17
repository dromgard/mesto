import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, handlerSubmitForm) {
    super(popup);
    this._handlerSubmitForm = handlerSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector('.popup__save');
    this._formInputsValues = {};
  }

  // Собираем в объект значения инпутов формы
  _getInputValues() {
    this._inputList.forEach((input) => {
      this._formInputsValues[input.name] = input.value;
    });
    return this._formInputsValues;

  }

  // При нажатии на кнопку "Submit" запускаем функцию колбэк и передаем данные из инпутов.
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  // Используем метод закрытия попапа в родителе и сбрасываем форму.
  close() {
    super.close();
    this._form.reset();
  }

  // Показываем на кнопке Submit процесс сохранения.
  showSavingMessage() {
    this._submitButton.textContent = 'Сохранение...';
  }

  // Убираем с кнопки Submit процесс сохранения.
  hideSavingMessage() {
    if (this._form.classList.contains('popup__form_type_add-element')) {
      this._submitButton.textContent = 'Создать';
    } else {
      this._submitButton.textContent = 'Сохранить';
    }

  }
}