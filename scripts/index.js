// Привязываем константы к значения элементов открытия попапа, самого попапа и закрытия попапа.
const buttonOpenPopup = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const buttonClosePopup = document.querySelector('.popup__close');

// Задаем переменным значения элементов имени профиля и описания профиля.
let infoName = document.querySelector('.info__name');
let infoDescription = document.querySelector('.info__description');

// Задаем переменным значения строки имени в попапе и строки описания в попапе.
let popupEditName = document.querySelector('.popup__name');
let popupEditDescription = document.querySelector('.popup__description');

/* Создаем функцию, которая при нажатии на кнопку "Редактировать":
1. Открывает попап.
2. присваиваем значениям строк значения элементов из профиля.
*/
function formPopupOpen () {
    popup.classList.remove('popup_hidden');
    popupEditName.value = infoName.textContent;
    popupEditDescription.value = infoDescription.textContent;
}

// При нажатии на кнопку "Редактировать" вызываем функцию открытия попапа.
buttonOpenPopup.addEventListener('click', formPopupOpen)

// При нажатии на кнопку "Закрыть" закрываем попап.
buttonClosePopup.addEventListener('click', function () {
    popup.classList.add('popup_hidden');
})

// Пивязываем константу к кнопке сохранения в попапе.
const popupSaveButton = document.querySelector('.popup__save');

/* Создаем функцию для сохранения данных в попапе по кнопке "Сохранить", которая:
1. Присваивает значениям элементов из профиля значения строк из попапа.
2. Закрывает попап.
*/
function formSubmitHandler () {
    infoName.textContent = popupEditName.value;
    infoDescription.textContent = popupEditDescription.value;
    popup.classList.add('popup_hidden');
}

// При нажатии на кнопку "Сохранить" вызываем функцию сохранения данных.
popupSaveButton.addEventListener('click', formSubmitHandler)