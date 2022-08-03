import './index.css';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  initialCards,
  buttonOpenProfileEdit,
  popupEditProfile,
  buttonAddElement,
  popupAddElement,
  popupEditName,
  popupEditDescription,
  popupImagePreview,
  elementTemplate,
  elements,
  profileInfo,
  configSelectorForm,
  popupProfileForm,
  popupFormAddElement
} from '../utils/constants.js';

// Включаем валидацию формы редактирования профиля.
const formEditProfileValid = new FormValidator(configSelectorForm, popupProfileForm);
formEditProfileValid.enableValidation();

// Включаем валидацию формы добавления элемента.
const formAddElementValid = new FormValidator(configSelectorForm, popupFormAddElement);
formAddElementValid.enableValidation();

// Функция создания карточки из класса.
function createCard(name, link) {
  const card = new Card(name, link, elementTemplate, handleCardClick);

  // Вызываем публичный метод генерации карточки.
  const cardElement = card.generateCard();
  
  // Возвращаем готовую карточку.
  return cardElement;
}

// Передаем в класс Section данные для создания и добавления карточек на страницу.
const defaultCardList = new Section(
  initialCards,

  // Колбеком передаем функцию генерации карточки в классе Card.
  (cardItem) => {
    // Запускаем функцию создания карточки и добавления на страницу.
    defaultCardList.addItem(createCard(cardItem.name, cardItem.link));
  },
  elements
);

// Запускаем метод для добавления карточек на страницу.
defaultCardList.renderItems();

// Создаем экземпляр попапа редактирования профиля.
const formPopupProfile = new PopupWithForm(popupEditProfile, submitProfileForm);
formPopupProfile.setEventListeners();

// Создаем экземпляр попапа добавления нового элемента.
const formPopupAddElement = new PopupWithForm(popupAddElement, submitAddElementForm);
formPopupAddElement.setEventListeners();

// Функция создания новой карточки.
function submitAddElementForm(obj) {
  
  // Запускаем функцию создания карточки и добавления на страницу.
  defaultCardList.addItem(createCard(obj.name, obj.link));
  
  // Закрываем попап.
  formPopupAddElement.close();
}

// Создаем экземпляр класса редактирования данных профиля на странице. 
const userInfo = new UserInfo(profileInfo);

// Функция открывает попап редактирования профиля и проставляет имя и описание в инпуты.
function openProfileForm() {
  const { name, description } = userInfo.getUserInfo();
  popupEditName.value = name;
  popupEditDescription.value = description;
  formPopupProfile.open();
}

// Функция сохраняет данные инпутов в провиль и закрывает попап.
function submitProfileForm(obj) {
  userInfo.setUserInfo(obj.name, obj.description);
  formPopupProfile.close();
}

// Создаем экземпляр класса просмотра увеличенного изображения в попапе.
const previeImage = new PopupWithImage(popupImagePreview)

// Функция обработчик клика по картинке элемента.
function handleCardClick(name, link) {
  previeImage.open(name, link);
}

// LISTENERS
// При нажатии на кнопку "Редактировать" открываем попап редактирования данных профиля.
buttonOpenProfileEdit.addEventListener('click', () => {
  openProfileForm();
  formEditProfileValid.resetValidation();
});

// При нажатии на кнопку "Добавить карточку на страницу" открываем попап добавления элемента.
buttonAddElement.addEventListener('click', () => {
  formPopupAddElement.open();
  formAddElementValid.resetValidation();
});
