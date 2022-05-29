// Привязываем константы к значениям элементов открытия попапа, самого попапа и закрытия попапа.
const buttonOpenPopup = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const buttonClosePopup = document.querySelector('.popup__close');

// Пивязываем константу к кнопке сохранения в попапе.
const popupForm = document.querySelector('.popup__form');

// Задаем переменным значения элементов имени профиля и описания профиля.
let infoName = document.querySelector('.info__name');
let infoDescription = document.querySelector('.info__description');

// Задаем переменным значения строки имени в попапе и строки описания в попапе.
let popupEditName = document.querySelector('.popup__input_type_name');
let popupEditDescription = document.querySelector('.popup__input_type_description');

/* Создаем функцию, которая при нажатии на кнопку "Редактировать":
1. Открывает попап.
2. присваиваем значениям строк значения элементов из профиля.
*/
function formPopupOpen () {
    popupEditName.value = infoName.textContent;
    popupEditDescription.value = infoDescription.textContent;
    popup.classList.add('popup_opened');
}

// Создаем функцию закрытия попапа при клике на кнопку "Закрыть".
function closePopup () {
    popup.classList.remove('popup_opened');
}

/* Создаем функцию для сохранения данных в попапе по кнопке "Сохранить", которая:
1. Присваивает значениям элементов из профиля значения строк из попапа.
2. Закрывает попап.
*/
function formSubmitHandler (evt) {
    evt.preventDefault();
    infoName.textContent = popupEditName.value;
    infoDescription.textContent = popupEditDescription.value;
    closePopup ();
}

// При нажатии на кнопку "Редактировать" вызываем функцию открытия попапа.
buttonOpenPopup.addEventListener('click', formPopupOpen)

// При нажатии на кнопку "Сохранить" вызываем функцию сохранения данных.
popupForm.addEventListener('submit', formSubmitHandler)

// При нажатии на кнопку "Закрыть" закрыть закрываем попап.
buttonClosePopup.addEventListener('click', closePopup);