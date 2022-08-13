import './index.css';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { api } from '../components/Api';
import {
  //initialCards,
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





// Загружаем информацию о пользователе на страницу.  
api.getUserInfo()
  .then((result) => {
    document.querySelector(profileInfo.nameSelector).textContent = result.name;
    document.querySelector(profileInfo.descriptionSelector).textContent = result.about;
    document.querySelector(profileInfo.avatarSelector).style.backgroundImage = `url(${result.avatar})`;
  })
  .catch((err) => {
    console.log(`Ошибка загрузки данных пользователя: ${err}`);
  })

// Загружаем стартовые карточки с сервера.
api.getInitialCards()
  .then((result) => {

    // Передаем в класс Section данные для создания и добавления карточек на страницу.
    const defaultCardList = new Section(
      result,

      // Колбеком передаем функцию генерации карточки в классе Card.
      (cardItem) => {
        // Запускаем функцию создания карточки и добавления на страницу.
        defaultCardList.addItem(createCard(cardItem.name, cardItem.link));
      },
      elements
    );

    // Запускаем метод для добавления карточек на страницу.
    defaultCardList.renderItems();
  })
  .catch((err) => {
    console.log(`Ошибка загрузки карточек с сервера: ${err}`);
  })












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
  [],

  // Колбеком передаем функцию генерации карточки в классе Card.
  (cardItem) => {
    // Запускаем функцию создания карточки и добавления на страницу.
    defaultCardList.addItem(createCard(cardItem.name, cardItem.link));
  },
  elements
);

// Запускаем метод для добавления карточек на страницу.
//defaultCardList.renderItems();

// Создаем экземпляр попапа редактирования профиля.
const formPopupProfile = new PopupWithForm(popupEditProfile, submitProfileForm);
formPopupProfile.setEventListeners();

// Создаем экземпляр попапа добавления нового элемента.
const formPopupAddElement = new PopupWithForm(popupAddElement, submitAddElementForm);
formPopupAddElement.setEventListeners();

// Функция создания новой карточки.
function submitAddElementForm(obj) {

  // Отправляем данные инпутов для загрузки на сервер.
  api.addNewCard(obj.name, obj.link)

    // Ловим успешный результат, отображаем новую карточку на страничке и закрываем попап.
    .then((result) => {
      defaultCardList.addItem(createCard(result.name, result.link));
      formPopupAddElement.close();
    })

    // Ловим ошибку.
    .catch((err) => {
      console.log(`Ошибка сохранения новой карточки: ${err}`);
    })
  
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

// Функция сохраняет данные инпутов на сервер и закрывает попап.
function submitProfileForm(obj) {

  // Отправляем данные инпутов для загрузки на сервер.
  api.editUserInfo(obj.name, obj.description)

    // Ловим успешный результат и отображаем новые данные на страничке.
    .then((result) => {
      userInfo.setUserInfo(result.name, result.about);
    })

    // Ловим ошибку.
    .catch((err) => {
      console.log(`Ошибка сохранения данных пользователя: ${err}`);
    })

  // Закрываем попап.
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
