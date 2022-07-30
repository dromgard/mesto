import { Popup } from './Popup.js';
//import { popupImageElement, popupImageTitle } from '../utils/constants.js';


export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
   // this._popupImageElement = popupImageElement;
    //this._popupImageTitle = popupImageTitle;
    this._popupImageElement = document.querySelector('.popup__image-preview');;
    this._popupImageTitle = document.querySelector('.popup__image-title');
  }

  open(name, link) {
    this._popupImageElement.src = link;
    this._popupImageTitle.textContent = name;
    this._popupImageElement.alt = name;
    super.open();
  }
}