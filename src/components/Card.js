// Клас создания карточек.
export class Card {
  constructor(name, link, template, handleCardClick) {
    this._text = name;
    this._image = link;
    this._template = template;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._handleCardClick = handleCardClick;
  }

  // Приватный метод возвращает разметку из template.
  _getTemplate() {
    const cardElement = this._template.querySelector('.element').cloneNode(true);

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

  // Проставление лайка.
  _toggleLike(evt) {
    evt.target.classList.toggle('element__like_active');
  }

  // Удаление элемента.
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Открытие попапа с превью изображения.
  _handleImageClick() {
    this._handleCardClick(this._text, this._image)
  }

  // Навешиваем слушатели.
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleImageClick();
    });
  }

}
