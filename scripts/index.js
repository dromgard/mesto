import { FormValidator } from './validate.js';
import { configSelectorForm } from './validateSelectors.js';
import { initialCards } from './data.js';
import { Card } from './card.js';

// CONSTANTS
// Привязываем константы к значениям элементов открытия попапа редактирования профиля.
const buttonOpenProfileEdit = document.querySelector('.profile__edit');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

// Привязываем константы к значениям элементов открытия попапа добавления элемента.
const buttonAddElement = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('.popup_type_add-element');

// Привязываем константу к форме редактирования профиля в попапе.
const popopupProfileForm = document.querySelector('.popup__form_type_edit-profile');

// Привязываем константу и запускаем проверку валидации формы редактирования профиля.
const formEditProfile = new FormValidator(configSelectorForm, popopupProfileForm);
formEditProfile.enableValidation();

// Привязываем константу к форме добавления элемента в попапе.
const popupFormAdEl = document.querySelector('.popup__form_type_add-element');

// Привязываем константу и запускаем проверку валидации формы добавления элемента.
const formAddElement = new FormValidator(configSelectorForm, popupFormAdEl);
formAddElement.enableValidation();

// Задаем переменным значения элементов имени профиля и описания профиля.
const infoName = document.querySelector('.info__name');
const infoDescription = document.querySelector('.info__description');

// Задаем переменным значения строки имени в попапе и строки описания в попапе.
const popupEditName = document.querySelector('.popup__input_type_name');
const popupEditDescription = document.querySelector('.popup__input_type_description');

// Задаем переменным значения строки имени и ссылки в попапе добавления нового элемента.
const popupElementName = document.querySelector('.popup__input_element_name');
const popupElementLink = document.querySelector('.popup__input_element_link');

// Задаем переменной шаблон Template.
const elementTemplate = document.querySelector('#element').content;

// Задаем переменной секцию elements - сюда буду добавляться новые элементы.
const elements = document.querySelector('.elements');

// Задаем переменной все попапы на старнице для рабы с закрытием по оверлею и крестику.
const popups = document.querySelectorAll('.popup');

// POPUPS
// Закрытие попапа.
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

// Функция навешивает слушатели на все попапы для закрытия по оверлею и крестику.
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

// Функция закрытия попапа на Esc.
function closePopupOnEsc(evt) {
  if (evt.code === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// Открытие попапа.
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

// Создаем функцию наполнения блока Elements готовыми карточками из массива или из попапа.
function renderCard(card, container) {
  container.prepend(card);
}

// Обходим каждый объект массива, передаем данные объекта в класс создания карточек,
// Каждой карточке вызываем функцию добавления на страницу.
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, elementTemplate, openPopup);
  const cardElement = card.generateCard();
  renderCard(cardElement, elements)
});

// POPUPS
// Попап редактирования профиля.
/* Создаем функцию, которая при нажатии на кнопку "Редактировать":
1. Открывает попап.
2. Присваиваем значениям строк значения элементов из профиля.
*/
function openProfileForm() {
  openPopup(popupEditProfile);
  popupEditName.value = infoName.textContent;
  popupEditDescription.value = infoDescription.textContent;
}

/* Создаем функцию для сохранения данных в попапе по кнопке "Сохранить", которая:
1. Присваивает значениям элементов из профиля значения строк из попапа.
2. Закрывает попап.
*/
function submitProfileForm(evt) {
  evt.preventDefault();
  infoName.textContent = popupEditName.value;
  infoDescription.textContent = popupEditDescription.value;
  closePopup(popupEditProfile);
}

// Создаем функцию создания нового эелемента.
function SubmitAdElForm(evt) {
  evt.preventDefault();

  // Передаем данные из попапа в класс создания карточек, вызываем функцию добавления на страницу.
  const card = new Card(popupElementName.value, popupElementLink.value, elementTemplate, openPopup);

  const cardElement = card.generateCard();

  renderCard(cardElement, elements);

  // Закрываем попап.
  closePopup(popupAddElement);
}

// LISTENERS
// При нажатии на кнопку "Редактировать":
// 1. Сбрасываем форму 
// 2. Открываем попап редактирования данных профиля.
// 3. Активируем кнопку "submit";
buttonOpenProfileEdit.addEventListener('click', () => {
  formEditProfile.resetForm();
  openProfileForm();
  formEditProfile.submitButtonEnable(popopupProfileForm.querySelector(configSelectorForm.submitButtonSelector));
});

// При нажатии на кнопку "Сохранить" вызываем функцию сохранения данных профиля.
popopupProfileForm.addEventListener('submit', submitProfileForm);

// При нажатии на кнопку "Добавить":
// 1. Сбрасываем форму 
// 2. Открываем попап добавления элемента.
// 3. Деактивируем кнопку "submit";
buttonAddElement.addEventListener('click', () => {
  formAddElement.resetForm();
  openPopup(popupAddElement);
  formAddElement.submitButtonDisable(popupFormAdEl.querySelector(configSelectorForm.submitButtonSelector));
});

// При нажатии на кнопку "Сохранить" вызываем функцию добавления элемента.
popupFormAdEl.addEventListener('submit', SubmitAdElForm);
