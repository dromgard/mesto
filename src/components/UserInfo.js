export class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  // Метод возвращает объект с именем и описанием со страницы профиля.
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
      id: this.id,
      avatar: this._avatar
    }
  }

  // Метод устанавливает новое имя и описание на страницу профиля.
  setUserInfo({ name, about, avatar, _id }) {
    this._name = name
    this._description = about
    this.id = _id;
    this._avatar = avatar;
  }

  renderUserInfo() {
    this._profileName.textContent = this._name;
    this._profileDescription.textContent = this._description;
  }

  renderUserAvatar() {
    this._profileAvatar.style.backgroundImage = `url(${this._avatar})`;
  }

}