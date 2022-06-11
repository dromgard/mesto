// Привязываем константы к значениям элементов открытия попапа редактирования профиля.
const buttonOpenPopup = document.querySelector('.profile__edit');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonClosePopup = document.querySelector('.popup__close');

// Привязываем константы к значениям элементов открытия попапа добавления элемента.
const buttonAddElement = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('.popup_type_add-element');
const buttonClosePopupAddEl = document.querySelector('.popup__close_type_add-element');

// Привязываем константы к значениям элементов открытия попапа превью изображения.
const popupImagePreview = document.querySelector('.popup_type_image-preview');
const buttonCloseImagePreview = document.querySelector('.popup__close_type_image-preview');
const popupImageElement = document.querySelector('.popup__image-preview');
const popupImageTitle = document.querySelector('.popup__image-title');

// Пивязываем константу к форме в попапе.
const popupForm = document.querySelector('.popup__form');

// Пивязываем константу к форме в попапе.
const popupFormAdEl = document.querySelector('.popup__form_type_add-element');

// Задаем переменным значения элементов имени профиля и описания профиля.
let infoName = document.querySelector('.info__name');
let infoDescription = document.querySelector('.info__description');

// Задаем переменным значения строки имени в попапе и строки описания в попапе.
let popupEditName = document.querySelector('.popup__input_type_name');
let popupEditDescription = document.querySelector('.popup__input_type_description');

// Задаем переменным значения строки имени и ссылки в попапе добавления нового элемента.
let popupElementName = document.querySelector('.popup__input_element_name');
let popupElementLink = document.querySelector('.popup__input_element_link');

// Задаем переменной элемент "Лайк".
let buttonLike = document.querySelector('.element__like');

// Массив стартовых элементов.
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Задаем переменной шаблон Template.
const elementTemplate = document.querySelector('#element').content;

// Задаем переменной секцию elements - сюда буду добавляться новые элементы.
const elements = document.querySelector('.elements');

initialCards.forEach(
    function (item) {
        // Клонируем верстку одного элемента.
        const newElement = elementTemplate.querySelector('.element').cloneNode(true);

        newElement.querySelector('.element__image').src = item.link;
        newElement.querySelector('.element__title').textContent = item.name;

        newElement.querySelector('.element__like').addEventListener('click', function (evt) {
            evt.target.classList.toggle('element__like_active');
        });

        newElement.querySelector('.element__delete').addEventListener('click', function () {
            newElement.remove();
        });

        newElement.querySelector('.element__image').addEventListener('click', function () {
            popupImageElement.src = item.link;
            popupImageTitle.textContent = item.name;
            popupImagePreview.classList.add('popup_opened');
        });

        elements.append(newElement);
    });

//const elementLike = elementTemplate.querySelector('.element__like');
//elementLike.addEventListener('click', function (evt) {
//  evt.target.classList.toggle('element__like_active');
//});

/* Создаем функцию, которая при нажатии на кнопку "Редактировать":
1. Открывает попап.
2. присваиваем значениям строк значения элементов из профиля.
*/
function formPopupOpen() {
    popupEditName.value = infoName.textContent;
    popupEditDescription.value = infoDescription.textContent;
    popupEditProfile.classList.add('popup_opened');
}

// Создаем функцию закрытия попапа при клике на кнопку "Закрыть".
function closePopup() {
    popupEditProfile.classList.remove('popup_opened');
}

/* Создаем функцию для сохранения данных в попапе по кнопке "Сохранить", которая:
1. Присваивает значениям элементов из профиля значения строк из попапа.
2. Закрывает попап.
*/
function formSubmitHandler(evt) {
    evt.preventDefault();
    infoName.textContent = popupEditName.value;
    infoDescription.textContent = popupEditDescription.value;
    closePopup();
}

function formAddElement() {
    popupAddElement.classList.add('popup_opened');
}

function formSubmitHandlerAdEl(evt) {
    evt.preventDefault();

    // Клонируем верстку одного элемента.
    const newElement = elementTemplate.querySelector('.element').cloneNode(true);

    newElement.querySelector('.element__image').src = popupElementLink.value;
    newElement.querySelector('.element__title').textContent = popupElementName.value;

    newElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    newElement.querySelector('.element__delete').addEventListener('click', function () {
        newElement.remove();
    });

    newElement.querySelector('.element__image').addEventListener('click', function () {
        popupImagePreview.classList.add('popup_opened');
        popupImageElement.src = newElement.querySelector('.element__image').src;
        popupImageTitle.textContent = newElement.querySelector('.element__title').textContent;
    });

    elements.prepend(newElement);

    closePopupAddEl();
}

// Создаем функцию закрытия попапа добавления элемента при клике на кнопку "Закрыть".
function closePopupAddEl() {
    popupAddElement.classList.remove('popup_opened');
    popupElementLink.value = '';
    popupElementName.value = '';
}

// Создаем функцию закрытия попапа превью изображения элемента при клике на кнопку "Закрыть".
function closePopupImagePreview() {
    popupImagePreview.classList.remove('popup_opened');
}

// При нажатии на кнопку "Редактировать" вызываем функцию открытия попапа редактирования профиля.
buttonOpenPopup.addEventListener('click', formPopupOpen)

// При нажатии на кнопку "Сохранить" вызываем функцию сохранения данных.
popupForm.addEventListener('submit', formSubmitHandler)

// При нажатии на кнопку "Закрыть" закрыть закрываем попап.
buttonClosePopup.addEventListener('click', closePopup);

// При нажатии на кнопку "Добавить" вызываем функцию открытия попапа добавления элемента.
buttonAddElement.addEventListener('click', formAddElement)

// При нажатии на кнопку "Сохранить" вызываем функцию добавления элемента.
popupFormAdEl.addEventListener('submit', formSubmitHandlerAdEl)

// При нажатии на кнопку "Закрыть" закрыть закрываем попап добавления элемента.
buttonClosePopupAddEl.addEventListener('click', closePopupAddEl);

// При нажатии на кнопку "Закрыть" закрыть закрываем попап добавления элемента.
buttonCloseImagePreview.addEventListener('click', closePopupImagePreview);