import "../pages/index.css";
import { openModal, closeModal } from "./modal.js";
import { createCard, handleDelete, handleLike } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  addNewCard,
  editUserAvatar,
  editUserInfo,
  getInitialCards,
  getUserInfo,
} from "./api.js";

const cardList = document.querySelector(".places__list");

const editInfoButton = document.querySelector(".profile__edit-button");
const editAvatarButton = document.querySelector(".profile__image_edit-button");
const addButton = document.querySelector(".profile__add-button");

const modalEditProfile = document.querySelector(".popup_type_edit");
const modalEditAvatar = document.querySelector(".popup_type_edit-avatar");
const modalNewCard = document.querySelector(".popup_type_new-card");
const modalImage = document.querySelector(".popup_type_image");

const modalImageElement = modalImage.querySelector(".popup__image");
const modalCaptionElement = modalImage.querySelector(".popup__caption");

const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");
const imageElement = document.querySelector(".profile__image");

const formEditProfile = modalEditProfile.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);

const formEditAvatar = modalEditAvatar.querySelector(".popup__form");
const avatarLinkInput = formEditAvatar.querySelector(".popup__input_type_url");

const formNewCard = modalNewCard.querySelector(".popup__form");
const cardNameInput = formNewCard.querySelector(".popup__input_type_card-name");
const cardImageLinkInput = formNewCard.querySelector(".popup__input_type_url");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};

function renderCards() {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([user, initialCards]) => {
      nameElement.textContent = user.name;
      jobElement.textContent = user.about;
      imageElement.style.backgroundImage = `url('${user.avatar}')`;

      initialCards.forEach((item) => {
        const card = createCard(
          {
            name: item.name,
            link: item.link,
            _id: item._id,
            ownerId: item.owner._id,
            likes: item.likes,
            currentUserId: user._id,
          },
          {
            deleteCard: handleDelete,
            likeCard: handleLike,
            openModalImage: handleOpenModalImage,
          }
        );
        cardList.append(card);
      });
    })
    .catch((err) => {
      console.error(
        "Ошибка при получении данных о пользователе или карточек:",
        err
      );
    });
}

function editProfile(nameValue, jobValue) {
  nameElement.textContent = nameValue;
  jobElement.textContent = jobValue;
}

function editAvatar(linkValue) {
  imageElement.style.backgroundImage = `url('${linkValue}')`;
}

function handleFormEditProfileSubmit(e) {
  e.preventDefault();
  editUserInfo(nameInput.value, jobInput.value)
    .then((userData) => {
      editProfile(userData.name, userData.about);
      closeModal(modalEditProfile);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении информации о пользователе:", err);
    });
}

function handleFormEditAvatarSubmit(e) {
  e.preventDefault();
  toggleButtonLoading(formEditAvatar, true);
  editUserAvatar(avatarLinkInput.value)
    .then((userData) => {
      editAvatar(userData.avatar);
      closeModal(modalEditAvatar);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватарки пользователя:", err);
    })
    .finally(() => {
      toggleButtonLoading(formEditAvatar, true);
    });
}

function handleFormNewCardSubmit(e) {
  e.preventDefault();
  toggleButtonLoading(formNewCard, true);
  addNewCard(cardNameInput.value, cardImageLinkInput.value)
    .then((dataCard) => {
      const newCard = createCard(
        {
          name: dataCard.name,
          link: dataCard.link,
          _id: dataCard._id,
          ownerId: dataCard.ownerId,
          likes: dataCard.likes,
          currentUserId: dataCard.currentUserId,
        },
        {
          deleteCard: handleDelete,
          likeCard: handleLike,
          openModalImage: handleOpenModalImage,
        }
      );
      cardList.prepend(newCard);
      formNewCard.reset();
      closeModal(modalNewCard);
    })
    .catch((err) => {
      console.error("Ошибка при добавлении новой карточки:", err);
    })
    .finally(() => {
      toggleButtonLoading(formNewCard, false);
    });
}

function handleOpenModalImage(name, link) {
  modalImageElement.src = link;
  modalImageElement.alt = name;

  modalCaptionElement.textContent = name;

  openModal(modalImage);
}

function toggleButtonLoading(formElement, isLoading) {
  const buttonElement = formElement.querySelector(".popup__button");
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = "Сохранить";
    buttonElement.disabled = false;
  }
}

[modalEditProfile, modalNewCard, modalImage, modalEditAvatar].forEach(
  (modal) => {
    modal.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("popup__close") ||
        e.target.classList.contains("popup")
      ) {
        closeModal(modal);
      }
    });
  }
);

editInfoButton.addEventListener("click", () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  clearValidation(modalEditProfile, validationConfig);
  openModal(modalEditProfile);
});

editAvatarButton.addEventListener("click", () => {
  clearValidation(modalEditAvatar, validationConfig);
  openModal(modalEditAvatar);
});

addButton.addEventListener("click", () => {
  clearValidation(modalNewCard, validationConfig);
  openModal(modalNewCard);
});

formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
formNewCard.addEventListener("submit", handleFormNewCardSubmit);
formEditAvatar.addEventListener("submit", handleFormEditAvatarSubmit);

renderCards();
enableValidation(validationConfig);