//CONSTANTS
// Привязываем константы к значениям элементов открытия попапа редактирования профиля.
const buttonOpenProfileEdit = document.querySelector('.profile__edit');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonCloseEditProfile = document.querySelector('.popup__close_type_edit-profile');

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
const infoName = document.querySelector('.info__name');
const infoDescription = document.querySelector('.info__description');

// Задаем переменным значения строки имени в попапе и строки описания в попапе.
const popupEditName = document.querySelector('.popup__input_type_name');
const popupEditDescription = document.querySelector('.popup__input_type_description');

// Задаем переменным значения строки имени и ссылки в попапе добавления нового элемента.
const popupElementName = document.querySelector('.popup__input_element_name');
const popupElementLink = document.querySelector('.popup__input_element_link');

// Задаем переменной элемент "Лайк".
const buttonLike = document.querySelector('.element__like');

// Массив стартовых элементов.
const initialCards = [
    {
        name: 'Архыз',
        link: 'images/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'images/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'images/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'images/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'images/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'images/baikal.jpg'
    }
];

// Задаем переменной шаблон Template.
const elementTemplate = document.querySelector('#element').content;

// Задаем переменной секцию elements - сюда буду добавляться новые элементы.
const elements = document.querySelector('.elements');

//ELEMENTS
//Создаем наполенние блока Elements данными из массива.
initialCards.forEach(
    function (item) {
        // Клонируем верстку одного элемента.
        const newElement = elementTemplate.querySelector('.element').cloneNode(true);

        //Присваиваем значениям элементов значения из полей попапа.
        newElement.querySelector('.element__title').textContent = item.name;
        newElement.querySelector('.element__image').src = item.link;
        newElement.querySelector('.element__image').alt = item.name;

        //Проставление лайка.
        newElement.querySelector('.element__like').addEventListener('click', function (evt) {
            evt.target.classList.toggle('element__like_active');
        });

        //Удаление элемента.
        newElement.querySelector('.element__delete').addEventListener('click', function () {
            newElement.remove();
        });

        //Просмотр увеличенного изображения в попапе.
        newElement.querySelector('.element__image').addEventListener('click', function () {
            popupImageElement.src = item.link;
            popupImageTitle.textContent = item.name;
            popupImageElement.alt = item.name;
            popupImagePreview.classList.add('popup_opened');
        });

        //Добавляем новый элемент в начало списка.
        elements.append(newElement);
    });

//POPUPS
//Попап редактирования профиля.
/* Создаем функцию, которая при нажатии на кнопку "Редактировать":
1. Открывает попап.
2. Присваиваем значениям строк значения элементов из профиля.
*/
function formPopupProfileEdit() {
    popupEditName.value = infoName.textContent;
    popupEditDescription.value = infoDescription.textContent;
    popupEditProfile.classList.add('popup_opened');
}

// Создаем функцию закрытия попапа редактирования профиля при клике на кнопку "Закрыть".
function closePopupEditProfile() {
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
    closePopupEditProfile();
}

//Попап добавления нового элемента.
//Создаем функцию открытия попапа добавления нового элемента.
function formAddElement() {
    popupAddElement.classList.add('popup_opened');
}

// Создаем функцию закрытия попапа добавления элемента при клике на кнопку "Закрыть".
function closePopupAddEl() {
    popupAddElement.classList.remove('popup_opened');
    popupElementLink.value = '';
    popupElementName.value = '';
}

//Создаем функцию создания нового эелемента.
function formSubmitHandlerAdEl(evt) {
    evt.preventDefault();

    //Клонируем верстку одного элемента.
    const newElement = elementTemplate.querySelector('.element').cloneNode(true);

    //Присваиваем значениям элементов значения из полей попапа.
    newElement.querySelector('.element__title').textContent = popupElementName.value;
    newElement.querySelector('.element__image').src = popupElementLink.value;
    newElement.querySelector('.element__image').alt = popupElementName.value;

    //Проставление лайка.
    newElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    //Удаление элемента.
    newElement.querySelector('.element__delete').addEventListener('click', function () {
        newElement.remove();
    });

    //Просмотр увеличенного изображения в попапе.
    newElement.querySelector('.element__image').addEventListener('click', function () {
        popupImagePreview.classList.add('popup_opened');
        popupImageElement.src = newElement.querySelector('.element__image').src;
        popupImageTitle.textContent = newElement.querySelector('.element__title').textContent;
        popupImageElement.alt = newElement.querySelector('.element__title').textContent;
    });

    //Добавляем новый элемент в начало списка.
    elements.prepend(newElement);

    //Закрываем попап.
    closePopupAddEl();
}

//Попап превью изображения элемента.
// Создаем функцию закрытия попапа превью изображения элемента при клике на кнопку "Закрыть".
function closePopupImagePreview() {
    popupImagePreview.classList.remove('popup_opened');
}

//LISTENERS
// При нажатии на кнопку "Редактировать" вызываем функцию открытия попапа редактирования профиля.
buttonOpenProfileEdit.addEventListener('click', formPopupProfileEdit)

// При нажатии на кнопку "Сохранить" вызываем функцию сохранения данных профиля.
popupForm.addEventListener('submit', formSubmitHandler)

// При нажатии на кнопку "Закрыть" закрываем попап редактирования профиля.
buttonCloseEditProfile.addEventListener('click', closePopupEditProfile);

// При нажатии на кнопку "Добавить" вызываем функцию открытия попапа добавления элемента.
buttonAddElement.addEventListener('click', formAddElement)

// При нажатии на кнопку "Сохранить" вызываем функцию добавления элемента.
popupFormAdEl.addEventListener('submit', formSubmitHandlerAdEl)

// При нажатии на кнопку "Закрыть" закрываем попап добавления элемента.
buttonClosePopupAddEl.addEventListener('click', closePopupAddEl);

// При нажатии на кнопку "Закрыть" закрываем попап превью изображения элемента.
buttonCloseImagePreview.addEventListener('click', closePopupImagePreview);