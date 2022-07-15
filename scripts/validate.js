export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
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
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      // Если хотябы одно поле не валидно, колбэк вернёт true.
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true.
      return !inputElement.validity.valid;
    });
  };

  // Функция делает кнопку submit активной.
  submitButtonEnable(buttonElement) {
    buttonElement.classList.remove(this._settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };

  // Функция делает кнопку submit неактивной.
  submitButtonDisable(buttonElement) {
    buttonElement.classList.add(this._settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  };

  // Функция проверяет корректность заполнения инпутов и меняет состояние кнопки submit.
  _toggleButtonState(inputList, buttonElement) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      this.submitButtonDisable(buttonElement);
    } else {
      // иначе сделай кнопку активной
      this.submitButtonEnable(buttonElement);
    }
  };

  // Функция добавляет слушатели всем полям input.
  _setEventListeners() {
    // Находим все поля input внутри каждой найденной формы, делаем из них массив.
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));

    // Находим в текущей форме кнопку отправки
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    // Для каждого поля input в полученном массиве:
    inputList.forEach((inputElement) => {
      // Добавляем слушатель.
      inputElement.addEventListener('input', () => {
        // Вызываем функцию isValid, передав ей форму и проверяемое поле input.
        this._isValid(inputElement);

        // Вызываем функцию toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState(inputList, buttonElement);
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

  // Функция сброса формы и ошибок при открытии попапов.
  resetForm() {
    this._formElement.reset();

    const inputElements = this._formElement.querySelectorAll(this._settings.inputSelector);

    inputElements.forEach((inputElement) => {
      inputElement.classList.remove(this._settings.inputErrorClass);
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      errorElement.textContent = '';
    });
  }

}
