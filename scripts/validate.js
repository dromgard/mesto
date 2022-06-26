//Функция добавляет стилизацию и сообщение об ошибке.
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
};

//Функция удаляет стилизацию и сообщение об ошибке.
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = "";
};

//Функция проверяет валидность вводимых данных в input.
const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        // Если хотябы одно поле не валидно, колбэк вернёт true.
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true.
        return !inputElement.validity.valid;
    });
};


const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.classList.add('popup__save_type_inactive');
        buttonElement.setAttribute('disabled', true);
    } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove('popup__save_type_inactive');
        buttonElement.removeAttribute('disabled');
    }

};


//Функция добавляет слушатели всем полям input.
const setEventListeners = (formElement) => {
    // Находим все поля input внутри каждой найденной формы, делаем из них массив.
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

    // Находим в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector('.popup__save');

    toggleButtonState(inputList, buttonElement);

    //Для каждого поля input в полученном массиве:
    inputList.forEach((inputElement) => {
        //Добавляем слушатель.
        inputElement.addEventListener('input', () => {
            //Вызываем функцию isValid, передав ей форму и проверяемое поле input.
            isValid(formElement, inputElement)

            //Вызываем функцию toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(inputList, buttonElement);
        });
    });
};

//Функция находит все попап формы на странице.
const enableValidation = () => {
    //Находим все попап формы на странице, делаем из них массив.
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    //Для каждой формы в полученном массиве:
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            //Отменяем стандартное поведение.
            evt.preventDefault();
        });

        //Вызываем функцию setEventListeners (для добавления слушателей всем полям input), передав ей каждую попап форму.
        setEventListeners(formElement);
    });
};

// Вызываем функцию поиска всех попап форм на странице. С нее начинается работа по валидации всех полей input.
enableValidation(); 