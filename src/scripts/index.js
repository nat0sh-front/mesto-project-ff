import images from '../components/images.js';
import initialCards from './cards.js';
import '../pages/index.css';
import { openModal, closeModal, setModalEventListeners } from '../components/modal.js';
import { createCard } from '../components/card.js';

const cardList = document.querySelector('.places__list');

function renderCards() {
    initialCards.forEach((item)=> {
        const card = createCard(item.name, item.link, deleteCard);
        cardList.append(card);
    })
}

renderCards();

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

const modalNewCard = document.querySelector('.popup_type_new-card');
const modalEditProfile = document.querySelector('.popup_type_edit');
const modalImage = document.querySelector('.popup_type_image');

[modalNewCard, modalEditProfile, modalImage].forEach((modal) => {
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup')) {
            closeModal(modal);
        }
    })
});

addButton.addEventListener('click', () => {
    openModal(modalNewCard);
});

editButton.addEventListener('click', () => {
    openModal(modalEditProfile);
});