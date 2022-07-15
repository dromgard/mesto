// Клас создания карточек.
export class Card {
  constructor(name, link, selector, handleClickImage) {
    this._text = name;
    this._image = link;
    this._selector = selector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._popupImagePreview = document.querySelector('.popup_type_image-preview');
    this._popupImageElement = document.querySelector('.popup__image-preview');
    this._popupImageTitle = document.querySelector('.popup__image-title');
    this._handleClickImage = handleClickImage;
  }

  // Приватный метод возвращает разметку из template.
  _getTemplate() {
    const cardElement = this._selector.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  // Публичный метод наполняет разметку входящими данными.
  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;

    this._element.querySelector('.element__title').textContent = this._text;

    return this._element;
  }

  // Приватный метод содержит слушатели новой карточки.
  _setEventListeners() {
    // Слушатель проставления лайка.
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
    });

    // Слушатель удаления элемента.
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._element.remove();
    });

    // Слушатель открытия попапа с превью изображения.
    this._cardImage.addEventListener('click', () => {
      this._handleClickImage(this._popupImagePreview);
    });

    // Слушатель просмотра увеличенного изображения в попапе.
    this._cardImage.addEventListener('click', () => {
      this._popupImageElement.src = this._image;
      this._popupImageTitle.textContent = this._text;
      this._popupImageElement.alt = this._text;
    });
  }
}
