export class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._profileNameSelector = document.querySelector(nameSelector);
    this._profileDescriptionSelector = document.querySelector(descriptionSelector);
  }

  // Метод возвращает объект с именем и описанием со страницы профиля.
  getUserInfo() {
    return {
      name: this._profileNameSelector,
      description: this._profileDescriptionSelector
    }
  }

  // Метод устанавливает новое имя и описание на страницу профиля.
  setUserInfo(newName, newDescription) {
    this._profileNameSelector.textContent = newName;
    this._profileDescriptionSelector.textContent = newDescription;
  }

}