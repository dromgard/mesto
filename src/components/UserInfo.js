export class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
  }

  // Метод возвращает объект с именем и описанием со страницы профиля.
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent
    }
  }

  // Метод устанавливает новое имя и описание на страницу профиля.
  setUserInfo(newName, newDescription) {
    this._profileName.textContent = newName;
    this._profileDescription.textContent = newDescription;
  }

}