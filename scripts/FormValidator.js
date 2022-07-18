export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  // Функция добавляет стилизацию и сообщение об ошибке.
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
  };

  // Функция удаляет стилизацию и сообщение об ошибке.
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = '';
  };

  // Функция проверяет валидность вводимых данных в input.
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //Функция проверяет валидность полей input и возвращает результат проверки каждого поля.
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      // Если хотябы одно поле не валидно, колбэк вернёт true.
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true.
      return !inputElement.validity.valid;
    });
  };

  // Функция делает кнопку submit активной.
  enableSubmitButton() {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  };

  // Функция делает кнопку submit неактивной.
  disableSubmitButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  };

  // Функция проверяет корректность заполнения инпутов и меняет состояние кнопки submit.
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this.disableSubmitButton(this._buttonElement);
    } else {
      // иначе сделай кнопку активной
      this.enableSubmitButton(this._buttonElement);
    }
  };

  // Функция добавляет слушатели всем полям input.
  _setEventListeners() {
    this._toggleButtonState();

    // Для каждого поля input в полученном массиве:
    this._inputList.forEach((inputElement) => {
      // Добавляем слушатель.
      inputElement.addEventListener('input', () => {
        // Вызываем функцию isValid, передав ей проверяемое поле input.
        this._isValid(inputElement);

        // Вызываем функцию toggleButtonState для переключения кнопки.
        this._toggleButtonState();
      });
    });
  };

  // Функция находит все попап формы на странице.
  enableValidation() {
    // Для формы:
    this._formElement.addEventListener('submit', (evt) => {
      // Отменяем стандартное поведение.
      evt.preventDefault();
    });

    // Вызываем функцию setEventListeners (для добавления слушателей всем полям input), передав ей каждую попап форму.
    this._setEventListeners();
  };

  // Функция интеллектуально переключает кнопку в попапе при его открытии и очищает список ошибок.
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

  // Функция сброса формы и ошибок при открытии попапов.
  resetForm() {
    this._formElement.reset();
  }

}
