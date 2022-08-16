import './index.css';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
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
  popupFormAddElement,
  popupConfirmDelete,
  popupFormAvatarUpdate,
  avatarElement
} from '../utils/constants.js';

// Загружаем информацию о пользователе на страницу.  
api.getUserInfo()
  .then((result) => {
    document.querySelector(profileInfo.nameSelector).textContent = result.name;
    document.querySelector(profileInfo.descriptionSelector).textContent = result.about;
    avatarElement.style.backgroundImage = `url(${result.avatar})`;
  })
  .catch((err) => {
    console.log(`Ошибка загрузки данных пользователя: ${err}`);
  })


// Функция обновления аватарки.
function submitAvatarForm(obj) {
  popapAvatarUpdate.showSavingMessage();
  api.updateUserAvatar(obj.link)
    .then((result) => {
      avatarElement.style.backgroundImage = `url(${result.avatar})`;
      popapAvatarUpdate.close();
    })
    .catch((err) => {
      console.log(`Ошибка обновления аватара: ${err}`);
    })
    .finally(() => popapAvatarUpdate.hideSavingMessage());
};


// Создаем экземпляр класса попапа обновления аватарки.
const popapAvatarUpdate = new PopupWithForm(popupFormAvatarUpdate, submitAvatarForm);
popapAvatarUpdate.setEventListeners();

// Функция удаления карточки.
function deleteUserCard(id, card) {
  api.deleteCard(id)
    .then(() => {
      defaultCardList.deleteItem(card);
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
const handleLikeElement = (id, likeElement, likeToggle) => {
  if (likeElement.classList.contains('element__like_active')) {
    api.deleteLike(id)
      .then((result) => likeToggle(result, false))
      .catch((err) => {
        console.log(`Ошибка удаления лайка: ${err}`);
      });
  } else {
    api.addLike(id)
      .then((result) => likeToggle(result, true))
      .catch((err) => {
        console.log(`Ошибка добавления лайка: ${err}`);
      });
  }
};

// Загружаем стартовые карточки с сервера.
api.getInitialCards()
  .then((result) => {

    // Передаем в класс Section данные для создания и добавления карточек на страницу.
    const defaultCardList = new Section(
      result,

      // Колбеком передаем функцию генерации карточки в классе Card.
      (cardItem) => {
        // Запускаем функцию создания карточки и добавления на страницу.
        const idCardCompare = '228dfe54eee38c362f8e308a' === cardItem.owner._id;
        const idLikeCompare = cardItem.likes.some((like) => like._id === '228dfe54eee38c362f8e308a');
        defaultCardList.addItem(createCard(cardItem.name, cardItem.link, cardItem.likes, cardItem._id, handleDeleteCard, idCardCompare, handleLikeElement, idLikeCompare));
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

// Включаем валидацию формы изменения аватара.
const formUpdateAvatarValid = new FormValidator(configSelectorForm, popupFormAvatarUpdate);
formUpdateAvatarValid.enableValidation();

// Функция создания карточки из класса.
function createCard(name, link, likes, id, handleDeleteCard, idCardCompare, handleLikeElement, idLikeCompare) {
  const card = new Card(name, link, elementTemplate, handleCardClick, likes, id, handleDeleteCard, handleLikeElement, idCardCompare);

  // Вызываем публичный метод генерации карточки.
  return card.generateCard(idCardCompare, idLikeCompare);

  // Возвращаем готовую карточку.
  //return cardElement;
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
  formPopupAddElement.showSavingMessage();

  // Отправляем данные инпутов для загрузки на сервер.
  api.addNewCard(obj.name, obj.link)
  

    // Ловим успешный результат, отображаем новую карточку на страничке и закрываем попап.
    .then((result) => {
      defaultCardList.addItem(createCard(result.name, result.link, [], result._id, handleDeleteCard, true, handleLikeElement, false));
      formPopupAddElement.close();
    })

    // Ловим ошибку.
    .catch((err) => {
      console.log(`Ошибка сохранения новой карточки: ${err}`);
    })
    .finally(() => formPopupAddElement.hideSavingMessage());


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
  formPopupProfile.showSavingMessage();

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
    .finally(() => formPopupProfile.hideSavingMessage());

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

// При нажатии на аватар открываем попап изменения аватара.
avatarElement.addEventListener('click', () => {
  popapAvatarUpdate.open();
  formUpdateAvatarValid.resetValidation();
});
