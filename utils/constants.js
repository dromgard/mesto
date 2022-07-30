import { FormValidator } from '../scripts/FormValidator.js';
import { configSelectorForm } from '../scripts/validateSelectors.js';

// Привязываем константы к значениям элементов открытия попапа редактирования профиля.
export const buttonOpenProfileEdit = document.querySelector('.profile__edit');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');

// Привязываем константы к значениям элементов открытия попапа добавления элемента.
export const buttonAddElement = document.querySelector('.profile__add-button');
export const popupAddElement = document.querySelector('.popup_type_add-element');

// Привязываем константу к форме редактирования профиля в попапе.
export const popopupProfileForm = document.querySelector('.popup__form_type_edit-profile');

// Привязываем константу и запускаем проверку валидации формы редактирования профиля.
export const formEditProfile = new FormValidator(configSelectorForm, popopupProfileForm);

// Привязываем константу к форме добавления элемента в попапе.
export const popupFormAdEl = document.querySelector('.popup__form_type_add-element');

// Привязываем константу и запускаем проверку валидации формы добавления элемента.
export const formAddElement = new FormValidator(configSelectorForm, popupFormAdEl);

// Задаем переменным значения элементов имени профиля и описания профиля.
export const infoName = document.querySelector('.info__name');
export const infoDescription = document.querySelector('.info__description');

// Задаем переменным значения строки имени в попапе и строки описания в попапе.
export const popupEditName = document.querySelector('.popup__input_type_name');
export const popupEditDescription = document.querySelector('.popup__input_type_description');

// Задаем переменным значения строки имени и ссылки в попапе добавления нового элемента.
export const popupElementName = document.querySelector('.popup__input_element_name');
export const popupElementLink = document.querySelector('.popup__input_element_link');

// Привязываем константы к значениям элементов открытия попапа превью изображения.
export const popupImagePreview = document.querySelector('.popup_type_image-preview');
//export const popupImageElement = document.querySelector('.popup__image-preview');
//export const popupImageTitle = document.querySelector('.popup__image-title');


// Задаем переменной шаблон Template.
export const elementTemplate = document.querySelector('#element').content;

// Задаем переменной секцию elements - сюда буду добавляться новые элементы.
export const elements = document.querySelector('.elements');

// Задаем переменной все попапы на старнице для рабы с закрытием по оверлею и крестику.
//export const popups = document.querySelectorAll('.popup');