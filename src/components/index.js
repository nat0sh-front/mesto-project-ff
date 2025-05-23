import "../pages/index.css";
import { openModal, closeModal } from "./modal.js";
import { createCard, handleDelete, handleLike } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import { addNewCard, editUserInfo, getInitialCards, getUserInfo } from "./api.js";

const cardList = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const modalEditProfile = document.querySelector(".popup_type_edit");
const modalNewCard = document.querySelector(".popup_type_new-card");
const modalImage = document.querySelector(".popup_type_image");

const modalImageElement = modalImage.querySelector(".popup__image");
const modalCaptionElement = modalImage.querySelector(".popup__caption");

const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");
const imageElement = document.querySelector(".profile__image");

const formEditProfile = modalEditProfile.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

const formNewCard = modalNewCard.querySelector(".popup__form");
const cardNameInput = formNewCard.querySelector(".popup__input_type_card-name");
const cardImageLinkInput = formNewCard.querySelector(".popup__input_type_url");

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
}

function handleOpenModalImage(name, link) {
  modalImageElement.src = link;
  modalImageElement.alt = name;

  modalCaptionElement.textContent = name;

  openModal(modalImage);
}

function renderCards() {
  Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, initialCards])=>{
    console.log(user);
    nameElement.textContent = user.name;
    jobElement.textContent = user.about;
    imageElement.src = user.avatar;

    initialCards.forEach((item) => {
    const card = createCard(
      { 
        name: item.name,
        link: item.link,
        _id: item._id,
        ownerId: item.owner._id,
        likes: item.likes,
        currentUserId: user._id 
      },
      {
        deleteCard: handleDelete,
        likeCard: handleLike,
        openModalImage: handleOpenModalImage
      }
    );
    cardList.append(card);
    });
  })
}

function editProfile(nameValue, jobValue) {
  nameElement.textContent = nameValue;
  jobElement.textContent = jobValue;
}

function handleFormEditProfileSubmit(e) {
  e.preventDefault();
  editUserInfo(nameInput.value, jobInput.value);
  editProfile(nameInput.value, jobInput.value);
  closeModal(modalEditProfile);
}

function handleFormNewCardSubmit(e) {
  e.preventDefault();
  addNewCard(cardNameInput.value, cardImageLinkInput.value)
  .then((cardFromAPI)=>{
    console.log(cardFromAPI);
  const newCard = createCard(
    { 
      name: cardFromAPI.name, 
      link: cardFromAPI.link,
      _id: cardFromAPI._id,
      ownerId: cardFromAPI.ownerId,
      likes: cardFromAPI.likes,
      currentUserId: cardFromAPI.currentUserId
    },
    {
      deleteCard: handleDelete,
      likeCard: handleLike,
      openModalImage: handleOpenModalImage
    }
  );
  cardList.prepend(newCard);
  formNewCard.reset();
  closeModal(modalNewCard);
  })
}

[modalEditProfile, modalNewCard, modalImage].forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("popup__close") ||
      e.target.classList.contains("popup")
    ) {
      closeModal(modal);
    }
  });
});

editButton.addEventListener("click", () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  clearValidation(modalEditProfile, validationConfig);
  openModal(modalEditProfile);
});

addButton.addEventListener("click", () => {
  clearValidation(modalNewCard, validationConfig);
  openModal(modalNewCard);
});

formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
formNewCard.addEventListener("submit", handleFormNewCardSubmit);

renderCards();
enableValidation(validationConfig);
