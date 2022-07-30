import { initialCards } from '../scripts/data.js';
import { Card } from '../scripts/Card.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import {
  buttonOpenProfileEdit,
  popupEditProfile,
  buttonAddElement,
  popupAddElement,
  popopupProfileForm,
  formEditProfile,
  popupFormAdEl,
  formAddElement,
  infoName,
  infoDescription,
  popupEditName,
  popupEditDescription,
  popupElementName,
  popupElementLink,
  popupImagePreview,
  elementTemplate,
  elements,
  //popups
} from '../utils/constants.js';

// Включаем валидацию форм.
formEditProfile.enableValidation();
formAddElement.enableValidation();

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
    const cardElement = card.generateCard();

    // Добавляем сгенерированную карточку на страницу.
    defaultCardList.addItem(cardElement);
  },
  elements
);

// Запускаем метод для добавления карточек на страницу.
defaultCardList.renderItems();


// Функция создания новой карточки.
function submitAdElForm(evt) {
  evt.preventDefault();

  const card = new Card(
    popupElementName.value,
    popupElementLink.value,
    elementTemplate,
    handleCardClick
  );
  const cardElement = card.generateCard();

  // Вызываем публичный метод добавления карточки на страницу
  defaultCardList.addItem(cardElement);

  // Закрываем попап.
  //closePopup(popupAddElement);
  const popupAddEl = new Popup(popupAddElement);
  popupAddEl.close();
}


// POPUPS
// Закрытие попапа.
/*function closePopup(popup) {
  const closePopup = new Popup(popup);
  closePopup.close();
}*/

// Функция навешивает слушатели на все попапы для закрытия по оверлею и крестику.
/*popups.forEach((popup) => {
  
  
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});*/

/*
// Функция закрытия попапа на Esc.
function closePopupOnEsc(evt) {
  if (evt.code === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}*/

// Функция обработчик клика по картинке элемента.
function handleCardClick(name, link) {
  const previeImage = new PopupWithImage(popupImagePreview)
  previeImage.open(name, link);
  previeImage.setEventListeners();
  /*popupImageElement.src = link;
  popupImageTitle.textContent = name;
  popupImageElement.alt = name;
  const popupImage = new Popup(popupImagePreview);
  popupImage.open();
  popupImage.setEventListeners();
  //openPopup(popupImagePreview);*/
}

/*// Открытие попапа.
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}*/

// POPUPS
// Попап редактирования профиля.
/* Создаем функцию, которая при нажатии на кнопку "Редактировать":
1. Открывает попап.
2. Присваиваем значениям строк значения элементов из профиля.
*/
function openProfileForm() {
  const popupProfileForm = new Popup(popupEditProfile);
  popupProfileForm.open();
  popupEditName.value = infoName.textContent;
  popupEditDescription.value = infoDescription.textContent;
  popupProfileForm.setEventListeners();
}

/* Создаем функцию для сохранения данных в попапе по кнопке "Сохранить", которая:
1. Присваивает значениям элементов из профиля значения строк из попапа.
2. Закрывает попап.
*/
function submitProfileForm(evt) {
  evt.preventDefault();
  infoName.textContent = popupEditName.value;
  infoDescription.textContent = popupEditDescription.value;
  const popupProfileForm = new Popup(popupEditProfile);
  popupProfileForm.close();
  //closePopup(popupEditProfile);
}

// LISTENERS
// При нажатии на кнопку "Редактировать":
// 1. Сбрасываем форму 
// 2. Открываем попап редактирования данных профиля.
// 3. Активируем кнопку "submit";
buttonOpenProfileEdit.addEventListener('click', () => {
  openProfileForm();
  formEditProfile.resetValidation();
});

// При нажатии на кнопку "Сохранить" вызываем функцию сохранения данных профиля.
popopupProfileForm.addEventListener('submit', submitProfileForm);

// При нажатии на кнопку "Добавить":
// 1. Сбрасываем форму 
// 2. Открываем попап добавления элемента.
// 3. Деактивируем кнопку "submit";
buttonAddElement.addEventListener('click', () => {
  formAddElement.resetForm();
  const popupAddEl = new Popup(popupAddElement);
  popupAddEl.open();
  //openPopup(popupAddElement);
  formAddElement.resetValidation();
  popupAddEl.setEventListeners();
});

// При нажатии на кнопку "Сохранить" вызываем функцию добавления элемента.
popupFormAdEl.addEventListener('submit', submitAdElForm);
