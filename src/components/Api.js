class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(this._handleResponce);

  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(this._handleResponce);
  }

  editUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._handleResponce)
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._handleResponce)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._handleResponce)
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._handleResponce)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._handleResponce)
  }

  updateUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    }).then(this._handleResponce)
  }



}













export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '7e5b2ceb-9034-4735-bb3b-2ce2a4adf48b',
    'Content-Type': 'application/json'
  }
}); 