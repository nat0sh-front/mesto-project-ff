import "../pages/index.css";
import initialCards from "./cards.js";
import { openModal, closeModal } from "../components/modal.js";
import { createCard, handleDelete, handleLike } from "../components/card.js";

//Card
const cardList = document.querySelector(".places__list");

function handleOpenModalImage(name, link) {
  const popupImage = modalImage.querySelector(".popup__image");
  popupImage.src = link;
  popupImage.alt = name;

  const popupTitle = modalImage.querySelector(".popup__caption");
  popupTitle.textContent = name;

  openModal(modalImage);
}

function renderCards() {
  initialCards.forEach((item) => {
    const card = createCard(
      item.name,
      item.link,
      handleDelete,
      handleLike,
      handleOpenModalImage
    );
    cardList.append(card);
  });
}

renderCards();

//Modal
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const modalEditProfile = document.querySelector(".popup_type_edit");
const modalNewCard = document.querySelector(".popup_type_new-card");
const modalImage = document.querySelector(".popup_type_image");

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

const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");

editButton.addEventListener("click", () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  openModal(modalEditProfile);
});

addButton.addEventListener("click", () => {
  openModal(modalNewCard);
});

//Form
const formEditProfile = modalEditProfile.querySelector(".popup__form");

const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);

function editProfile(nameValue, jobValue) {
  nameElement.textContent = nameValue;
  jobElement.textContent = jobValue;
}

function handleFormEditProfileSubmit(e) {
  e.preventDefault();
  editProfile(nameInput.value, jobInput.value);
  closeModal(modalEditProfile);
}

formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);

const formNewCard = modalNewCard.querySelector(".popup__form");

const cardNameInput = formNewCard.querySelector(".popup__input_type_card-name");
const cardImageLinkInput = formNewCard.querySelector(".popup__input_type_url");

function handleFormNewCardSubmit(e) {
  e.preventDefault();
  const newCard = createCard(
    cardNameInput.value,
    cardImageLinkInput.value,
    handleDelete,
    handleLike,
    handleOpenModalImage
  );
  cardList.prepend(newCard);
  formNewCard.reset();
  closeModal(modalNewCard);
}

formNewCard.addEventListener("submit", handleFormNewCardSubmit);
