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

// Передаем в класс Section данные для создания и добавления карточек на старницу.
const defaultCardList = new Section(
  initialCards,

  // Колбеком передаем функцию генерации карточки в классе Card.
  (cardItem) => {
    const card = new Card(
      cardItem.name,
      cardItem.link,
      elementTemplate,
      handleCardClick
    );
    
    // Вызываем публичный метод генерации карточки.
    const cardElement = card.generateCard();

    // Вызываем публичный метод добавления карточки на страницу.
    defaultCardList.addItem(cardElement);
  },
  elements
);

// Запускаем метод для добавления карточек на страницу.
defaultCardList.renderItems();

// Создаем экземпляр попапа редактирования профиля.
const FormPopupProfile = new PopupWithForm(popupEditProfile, submitProfileForm);
FormPopupProfile.setEventListeners();

// Создаем экземпляр попапа добавления нового элемента.
const FormPopupAddElement = new PopupWithForm(popupAddElement, submitAdElForm);
FormPopupAddElement.setEventListeners();

// Функция создания новой карточки.
function submitAdElForm(obj) {
  const card = new Card(
    obj.name,
    obj.link,
    elementTemplate,
    handleCardClick
  );
  
  // Вызываем публичный метод генерации карточки.
  const cardElement = card.generateCard();

  // Вызываем публичный метод добавления карточки на страницу.
  defaultCardList.addItem(cardElement);

  // Закрываем попап.
  FormPopupAddElement.close();
}

 // Создаем экземпляр класса редактирования данных профиля на странице. 
const userInfo = new UserInfo(profileInfo);

// Функция открывает попап редактирования профиля и проставляет имя и описание в инпуты.
function openProfileForm() {
  popupEditName.value = userInfo.getUserInfo().name.textContent;
  popupEditDescription.value = userInfo.getUserInfo().description.textContent;
  FormPopupProfile.open();
}

// Функция сохраняет данные инпутов в провиль и закрывает попап.
function submitProfileForm(obj) {
  userInfo.setUserInfo(obj.name, obj.description);
  FormPopupProfile.close();
}

// Функция обработчик клика по картинке элемента.
function handleCardClick(name, link) {
  const previeImage = new PopupWithImage(popupImagePreview)
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
  FormPopupAddElement.open();
  formAddElementValid.resetValidation();
});
