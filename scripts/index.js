//CONSTANTS
// Задаем список селекторов внутри формы.
const configSelectorForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  spanSelector: '.popup__input-error',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_type_inactive',
  inputErrorClass: 'popup__input_type_error'
};

// Привязываем константы к значениям элементов открытия попапа редактирования профиля.
const buttonOpenProfileEdit = document.querySelector('.profile__edit');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

// Привязываем константы к значениям элементов открытия попапа добавления элемента.
const buttonAddElement = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('.popup_type_add-element');

// Привязываем константы к значениям элементов открытия попапа превью изображения.
const popupImagePreview = document.querySelector('.popup_type_image-preview');
const popupImageElement = document.querySelector('.popup__image-preview');
const popupImageTitle = document.querySelector('.popup__image-title');

// Привязываем константу к форме в попапе.
const popopupProfileForm = document.querySelector('.popup__form_type_edit-profile');

// Привязываем константу к форме в попапе.
const popupFormAdEl = document.querySelector('.popup__form_type_add-element');

// Задаем переменным значения элементов имени профиля и описания профиля.
const infoName = document.querySelector('.info__name');
const infoDescription = document.querySelector('.info__description');

// Задаем переменным значения строки имени в попапе и строки описания в попапе.
const popupEditName = document.querySelector('.popup__input_type_name');
const popupEditDescription = document.querySelector('.popup__input_type_description');

// Задаем переменным значения строки имени и ссылки в попапе добавления нового элемента.
const popupElementName = document.querySelector('.popup__input_element_name');
const popupElementLink = document.querySelector('.popup__input_element_link');

// Задаем переменной элемент "Лайк".
const buttonLike = document.querySelector('.element__like');

// Задаем переменной шаблон Template.
const elementTemplate = document.querySelector('#element').content;

// Задаем переменной секцию elements - сюда буду добавляться новые элементы.
const elements = document.querySelector('.elements');

// Задаем переменной все попапы на старнице для рабы с закрытием по оверлею и крестику.
const popups = document.querySelectorAll('.popup')

// Вызываем функцию поиска всех попап форм на странице. С нее начинается работа по валидации всех полей input.
enableValidation(configSelectorForm);

//POPUPS
//Закрытие попапа.
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

//Функция навешивает слушатели на все попапы для закрытия по оверлею и крестику.
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

//Функция закрытия попапа на Esc.
function closePopupOnEsc(evt) {
  if (evt.code === "Escape") {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

//Открытие попапа.
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

//ELEMENTS
//Создаем функцию создания карточки данными из массива или данными из попапа.
function createCard(cardName, cardLink) {
  // Клонируем верстку одного элемента.
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = newElement.querySelector('.element__image');

  //Присваиваем значениям элементов значения из полей попапа.
  newElement.querySelector('.element__title').textContent = cardName;
  elementImage.src = cardLink;
  elementImage.alt = cardName;

  //Проставление лайка.
  newElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  //Удаление элемента.
  newElement.querySelector('.element__delete').addEventListener('click', function () {
    newElement.remove();
  });

  //Просмотр увеличенного изображения в попапе.
  elementImage.addEventListener('click', function () {
    popupImageElement.src = cardLink;
    popupImageTitle.textContent = cardName;
    popupImageElement.alt = cardName;
    openPopup(popupImagePreview);
  });

  return newElement;
}

//Создаем функцию наполнения блока Elements данными из массива или данными из попапа.
function renderCard(card, container) {
  container.prepend(card);
}

//Создаем наполенние блока Elements данными из массива.
initialCards.forEach(
  function (item) {
    //Создаем карточки для каждого элемента массива
    renderCard(createCard(item.name, item.link), elements);
  });

//POPUPS
//Попап редактирования профиля.
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

//Создаем функцию создания нового эелемента.
function SubmitAdElForm(evt) {
  evt.preventDefault();

  //Добавляем новый элемент в список.
  renderCard(createCard(popupElementName.value, popupElementLink.value), elements);

  //Закрываем попап.
  closePopup(popupAddElement);
}

//LISTENERS
// При нажатии на кнопку "Редактировать" открываем попап редактирования данных профиля.
buttonOpenProfileEdit.addEventListener('click', () => {
  resetForm(configSelectorForm, popopupProfileForm);
  openProfileForm();
  submitButtonEnable(popopupProfileForm.submit, configSelectorForm);
})

// При нажатии на кнопку "Сохранить" вызываем функцию сохранения данных профиля.
popopupProfileForm.addEventListener('submit', submitProfileForm)

// При нажатии на кнопку "Добавить" вызываем функцию открытия попапа добавления элемента.
buttonAddElement.addEventListener('click', () => {
  resetForm(configSelectorForm, popupFormAdEl);
  openPopup(popupAddElement);
  submitButtonDisable(popupFormAdEl.submit, configSelectorForm);
})

// При нажатии на кнопку "Сохранить" вызываем функцию добавления элемента.
popupFormAdEl.addEventListener('submit', SubmitAdElForm)