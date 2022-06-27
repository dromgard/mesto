//Функция добавляет стилизацию и сообщение об ошибке.
const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
};

//Функция удаляет стилизацию и сообщение об ошибке.
const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = "";
};

//Функция проверяет валидность вводимых данных в input.
const isValid = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

//Функция проверяет валидность полей input и возвращает результат проверки каждого поля.
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        // Если хотябы одно поле не валидно, колбэк вернёт true.
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true.
        return !inputElement.validity.valid;
    });
};

// Функция делает кнопку submit активной.
const submitButtonEnable = (buttonElement, settings) => {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
};

// Функция делает кнопку submit неактивной.
const submitButtonDisable = (buttonElement, settings) => {
    buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
};

// Функция проверяет корректность заполнения инпутов и меняет состояние кнопки submit.
const toggleButtonState = (inputList, buttonElement, settings) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        submitButtonDisable(buttonElement, settings);
    } else {
        // иначе сделай кнопку активной
        submitButtonEnable(buttonElement, settings);
    }

};

//Функция добавляет слушатели всем полям input.
const setEventListeners = (formElement, settings) => {
    // Находим все поля input внутри каждой найденной формы, делаем из них массив.
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));

    // Находим в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, settings);

    //Для каждого поля input в полученном массиве:
    inputList.forEach((inputElement) => {
        //Добавляем слушатель.
        inputElement.addEventListener('input', () => {
            //Вызываем функцию isValid, передав ей форму и проверяемое поле input.
            isValid(formElement, inputElement, settings)

            //Вызываем функцию toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
};

//Функция находит все попап формы на странице.
const enableValidation = (settings) => {
    //Находим все попап формы на странице, делаем из них массив.
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    //Для каждой формы в полученном массиве:
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            //Отменяем стандартное поведение.
            evt.preventDefault();
        });

        //Вызываем функцию setEventListeners (для добавления слушателей всем полям input), передав ей каждую попап форму.
        setEventListeners(formElement, settings);
    });
};

//Функция сброса формы и ошибок при открытии попапов.
function resetForm(settings, form) {
    form.reset();
    
    const inputElements = form.querySelectorAll(settings.inputSelector);

    inputElements.forEach((inputElement) => {
        inputElement.classList.remove(settings.inputErrorClass);
        const errorElement = form.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = "";
    });
};