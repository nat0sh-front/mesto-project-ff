import "../pages/index.css";
import initialCards from "./cards.js";
import { openModal, closeModal } from "./modal.js";
import { createCard, handleDelete, handleLike } from "./card.js";

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

const formEditProfile = modalEditProfile.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

const formNewCard = modalNewCard.querySelector(".popup__form");
const cardNameInput = formNewCard.querySelector(".popup__input_type_card-name");
const cardImageLinkInput = formNewCard.querySelector(".popup__input_type_url");

function handleOpenModalImage(name, link) {
  modalImageElement.src = link;
  modalImageElement.alt = name;

  modalCaptionElement.textContent = name;

  openModal(modalImage);
}

function renderCards() {
  initialCards.forEach((item) => {
    const card = createCard(
      { name: item.name, link: item.link },
      {
        deleteCard: handleDelete,
        likeCard: handleLike,
        openModalImage: handleOpenModalImage
      }
    );
    cardList.append(card);
  });
}

function editProfile(nameValue, jobValue) {
  nameElement.textContent = nameValue;
  jobElement.textContent = jobValue;
}

function handleFormEditProfileSubmit(e) {
  e.preventDefault();
  editProfile(nameInput.value, jobInput.value);
  closeModal(modalEditProfile);
}

function handleFormNewCardSubmit(e) {
  e.preventDefault();
  const newCard = createCard(
    { name: cardNameInput.value, link: cardImageLinkInput.value },
    {
      deleteCard: handleDelete,
      likeCard: handleLike,
      openModalImage: handleOpenModalImage
    }
  );
  cardList.prepend(newCard);
  formNewCard.reset();
  closeModal(modalNewCard);
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
  openModal(modalEditProfile);
});

addButton.addEventListener("click", () => {
  openModal(modalNewCard);
});

formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
formNewCard.addEventListener("submit", handleFormNewCardSubmit);

renderCards();