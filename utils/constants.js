// Массив для создания стартовых карточек.
export const initialCards = [
  {
    name: 'Архыз',
    link: 'images/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'images/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'images/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'images/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'images/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'images/baikal.jpg',
  },
];

// Задаем объект со именем и описанием профиля на странице.
export const profileInfo = {
  nameSelector: '.info__name',
  descriptionSelector: '.info__description'
};

// Задаем список селекторов внутри формы.
export const configSelectorForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  spanSelector: '.popup__input-error',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_type_inactive',
  inputErrorClass: 'popup__input_type_error',
};

// Привязываем константы к значениям элементов открытия попапа редактирования профиля.
export const buttonOpenProfileEdit = document.querySelector('.profile__edit');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');

// Привязываем константы к значениям элементов открытия попапа добавления элемента.
export const buttonAddElement = document.querySelector('.profile__add-button');
export const popupAddElement = document.querySelector('.popup_type_add-element');

// Привязываем константу к форме редактирования профиля в попапе.
export const popupProfileForm = document.querySelector('.popup__form_type_edit-profile');

// Привязываем константу к форме добавления элемента в попапе.
export const popupFormAddElement = document.querySelector('.popup__form_type_add-element');

// Задаем переменным значения строки имени в попапе и строки описания в попапе.
export const popupEditName = document.querySelector('.popup__input_type_name');
export const popupEditDescription = document.querySelector('.popup__input_type_description');

// Привязываем константы к значениям элементов открытия попапа превью изображения.
export const popupImagePreview = document.querySelector('.popup_type_image-preview');

// Задаем переменной шаблон Template.
export const elementTemplate = document.querySelector('#element').content;

// Задаем переменной секцию elements - сюда буду добавляться новые элементы.
export const elements = document.querySelector('.elements');
