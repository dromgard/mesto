// Клас создания карточек.
export class Card {
  constructor(name, link, template, handleCardClick, likes = [], id, handleDeleteCard, handleLikeElement) {
    this._text = name;
    this._image = link;
    this._template = template;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._likeElement = this._element.querySelector('.element__like');
    this._likeCounter = this._element.querySelector('.element__like-count');
    this._handleCardClick = handleCardClick;
    this._likes = likes;
    this._id = id;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeElement = handleLikeElement;
  }

  // Приватный метод возвращает разметку из template.
  _getTemplate() {
    const cardElement = this._template.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  // Публичный метод наполняет разметку входящими данными.
  generateCard(idCardCompare, likeCompare) {
    this._setEventListeners();

    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;

    this._element.querySelector('.element__title').textContent = this._text;
    this._element.querySelector('.element__like-count').textContent = this._likes.length;

    // Если карточка не моя, то убираем значок корзины.
    if (!idCardCompare) {
      this._element.querySelector('.element__delete')
        .remove();
    }

    // Если лайк мой, то делаем его активным.
    if (likeCompare) {
      this._likeElement.classList.add('element__like_active');
    }

    return this._element;
  }

  // Проставление лайка.
  _toggleLike(likesArr) {
    this._likeCounter.textContent = likesArr.likes.length;
    this._likeElement.classList.toggle('element__like_active');
  }

  // Удаление элемента.
  _deleteCard() {
    this._handleDeleteCard(this._id, this._element);
  }

  // Открытие попапа с превью изображения.
  _handleImageClick() {
    this._handleCardClick(this._text, this._image)
  }

  // Навешиваем слушатели.
  _setEventListeners() {
    this._likeElement.addEventListener('click', () => {
      this._handleLikeElement(this._id, this._likeElement, this._toggleLike.bind(this));
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleImageClick();
    });
  }

}
