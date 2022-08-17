import './index.css';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api.js';
import {
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
  popupFormAddElement,
  popupConfirmDelete,
  popupFormAvatarUpdate,
  avatarElement,
} from '../utils/constants.js';

// Создаем экземпляр класса подключения к серверу.
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '7e5b2ceb-9034-4735-bb3b-2ce2a4adf48b',
    'Content-Type': 'application/json'
  }
});

// Создаем экземпляр класса редактирования данных профиля на странице. 
const userInfo = new UserInfo(profileInfo);

let userId;

const cardList = new Section(
  (cardItem) => {
    // Колбэк функции создания карточки и добавления на страницу.
    const idCardCompare = userId === cardItem.owner._id;
    const idLikeCompare = cardItem.likes.some((like) => like._id === userId);
    cardList.addItemAppend(createCard(cardItem.name, cardItem.link, cardItem.likes, cardItem._id, handleDeleteCard, idCardCompare, handleLikeElement, idLikeCompare));
  }
  ,
  elements
);

// Функция обновления аватарки по кнопке submit.
function submitAvatarForm(obj) {
  popapAvatarUpdate.renderLoading(true);
  api.updateUserAvatar(obj.link)
    .then((result) => {
      userInfo.setUserInfo(result);
      userInfo.renderUserAvatar();
      popapAvatarUpdate.close();
    })
    .catch((err) => {
      console.log(`Ошибка обновления аватара: ${err}`);
    })
    .finally(() => popapAvatarUpdate.renderLoading(false));
};

// Создаем экземпляр класса попапа обновления аватарки.
const popapAvatarUpdate = new PopupWithForm(popupFormAvatarUpdate, submitAvatarForm);
popapAvatarUpdate.setEventListeners();

// Функция удаления карточки после нажатия на кнопку submit.
function deleteUserCard(id, card) {
  api.deleteCard(id)
    .then(() => {
      cardList.deleteItem(card);
      popupConfirm.close();
    })
    .catch((err) => {
      console.log(`Ошибка удаления карточки: ${err}`);
    });
};

// Создаем экземпляр класса попапа подтверждения удаления.
const popupConfirm = new PopupWithConfirm(popupConfirmDelete, deleteUserCard);
popupConfirm.setEventListeners();

// Функция обработчик клика по иконке удаления элемента.
function handleDeleteCard(id, card) {
  popupConfirm.open(id, card);
}

// Функция обработчик проставления лайка.
function handleLikeElement(id, likeToggle, isLiked) {
  if (isLiked) {
    api.deleteLike(id)
      .then((result) => likeToggle(result))
      .catch((err) => {
        console.log(`Ошибка удаления лайка: ${err}`);
      });
  } else {
    api.addLike(id)
      .then((result) => likeToggle(result))
      .catch((err) => {
        console.log(`Ошибка добавления лайка: ${err}`);
      });
  }
};

// Включаем валидацию формы редактирования профиля.
const formEditProfileValid = new FormValidator(configSelectorForm, popupProfileForm);
formEditProfileValid.enableValidation();

// Включаем валидацию формы добавления элемента.
const formAddElementValid = new FormValidator(configSelectorForm, popupFormAddElement);
formAddElementValid.enableValidation();

// Включаем валидацию формы изменения аватара.
const formUpdateAvatarValid = new FormValidator(configSelectorForm, popupFormAvatarUpdate);
formUpdateAvatarValid.enableValidation();

// Функция создания карточки из класса.
function createCard(name, link, likes, id, handleDeleteCard, idCardCompare, handleLikeElement, idLikeCompare) {
  const card = new Card(name, link, elementTemplate, handleCardClick, likes, id, handleDeleteCard, handleLikeElement, idCardCompare);

  // Вызываем публичный метод генерации карточки.
  return card.generateCard(idCardCompare, idLikeCompare);
}

// Создаем экземпляр попапа редактирования профиля.
const formPopupProfile = new PopupWithForm(popupEditProfile, submitProfileForm);
formPopupProfile.setEventListeners();

// Создаем экземпляр попапа добавления нового элемента.
const formPopupAddElement = new PopupWithForm(popupAddElement, submitAddElementForm);
formPopupAddElement.setEventListeners();

// Функция создания новой карточки.
function submitAddElementForm(obj) {
  formPopupAddElement.renderLoading(true);

  // Отправляем данные инпутов для загрузки на сервер.
  api.addNewCard(obj.name, obj.link)


    // Ловим успешный результат, отображаем новую карточку на страничке и закрываем попап.
    .then((result) => {
      cardList.addItemPrepend(createCard(result.name, result.link, [], result._id, handleDeleteCard, true, handleLikeElement, false));
      formPopupAddElement.close();
    })

    // Ловим ошибку.
    .catch((err) => {
      console.log(`Ошибка сохранения новой карточки: ${err}`);
    })
    .finally(() => formPopupAddElement.renderLoading(false));
}

// Функция открывает попап редактирования профиля и проставляет имя и описание в инпуты.
function openProfileForm() {
  const { name, description } = userInfo.getUserInfo();
  popupEditName.value = name;
  popupEditDescription.value = description;
  formPopupProfile.open();
}

// Функция сохраняет данные инпутов на сервер и закрывает попап.
function submitProfileForm(obj) {
  formPopupProfile.renderLoading(true);

  // Отправляем данные инпутов для загрузки на сервер.
  api.editUserInfo(obj.name, obj.description)

    // Ловим успешный результат и отображаем новые данные на страничке.
    .then((result) => {
      userInfo.setUserInfo(result);
      userInfo.renderUserInfo();
      formPopupProfile.close();
    })

    // Ловим ошибку.
    .catch((err) => {
      console.log(`Ошибка сохранения данных пользователя: ${err}`);
    })
    .finally(() => formPopupProfile.renderLoading(false));
}

// Создаем экземпляр класса просмотра увеличенного изображения в попапе.
const previeImage = new PopupWithImage(popupImagePreview)

// Функция обработчик клика по картинке элемента.
function handleCardClick(name, link) {
  previeImage.open(name, link);
}

Promise.all([
  // Получаем информацию о пользователе.
  api.getUserInfo(),
  // Получаем набор карточек.
  api.getInitialCards()
])
  .then(([userData, cards]) => {
    // Загружаем информацию о пользователе на страницу.
    userInfo.setUserInfo(userData);
    userInfo.renderUserInfo();
    userInfo.renderUserAvatar();
    userId = userData._id;

    // Загружаем карточки на страницу.
    cardList.renderItems(cards);
  })
  .catch(err => {
    console.log(`Ошибка загрузки данных с сервера: ${err}`);
  });

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

// При нажатии на аватар открываем попап изменения аватара.
avatarElement.addEventListener('click', () => {
  popapAvatarUpdate.open();
  formUpdateAvatarValid.resetValidation();
});
