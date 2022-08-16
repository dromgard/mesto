/*import arkhyz from '../images/arkhyz.jpg';
import chelyabinsk from '../images/chelyabinsk-oblast.jpg';
import ivanovo from '../images/ivanovo.jpg';
import kamchatka from '../images/kamchatka.jpg';
import kholmogorsky from '../images/kholmogorsky-rayon.jpg';
import baikal from '../images/baikal.jpg';*/

// Массив для создания стартовых карточек.
/*export const initialCards = [
  {
    name: 'Архыз',
    link: arkhyz,
  },
  {
    name: 'Челябинская область',
    link: chelyabinsk,
  },
  {
    name: 'Иваново',
    link: ivanovo,
  },
  {
    name: 'Камчатка',
    link: kamchatka,
  },
  {
    name: 'Холмогорский район',
    link: kholmogorsky,
  },
  {
    name: 'Байкал',
    link: baikal,
  },
];*/

// Задаем объект со именем и описанием профиля на странице.
export const profileInfo = {
  nameSelector: '.info__name',
  descriptionSelector: '.info__description',
  avatarSelector: '.profile__avatar'
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

// Привязываем константу к значениям элементов открытия попапа подтверждения удаления.
export const popupConfirmDelete = document.querySelector('.popup_type_confirm');

// Привязываем константу к элементу аватарки профиля.
export const avatarElement = document.querySelector('.profile__avatar');

// Привязываем константу к значениям элементов открытия попапа обновления аватарки.
export const popupFormAvatarUpdate = document.querySelector('.popup_type_change-avatar');

// Задаем переменной шаблон Template.
export const elementTemplate = document.querySelector('#element').content;

// Задаем переменной секцию elements - сюда буду добавляться новые элементы.
export const elements = document.querySelector('.elements');
