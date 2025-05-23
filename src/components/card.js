import { deleteCardAPI, likeCard, unlikeCard } from './api.js';

const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, callbacks) {
  const { name, link, _id, ownerId, likes, currentUserId } = cardData;
  const { deleteCard, openModalImage } = callbacks;

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCountElement = cardElement.querySelector(".card__like-count");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__title").textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  likeCountElement.textContent = likes.length;

  if (likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (ownerId !== currentUserId) {
    deleteButton.style.display = 'none';
  }

  deleteButton.addEventListener("click", () => {
    handleDelete(_id, cardElement, deleteCard);
  });

  likeButton.addEventListener("click", (e) => {
    handleLike(e, _id, likeCountElement);
  });

  cardImage.addEventListener("click", () => {
    openModalImage(name, link);
  });

  return cardElement;
}

function handleDelete(cardId, cardElement, deleteCardCallback) {
  deleteCardAPI(cardId)
    .then(() => {
      deleteCardCallback(cardElement);
    })
}

function handleLike(e, cardId, likeCountElement) {
  const likeButton = e.target;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const apiCall = isLiked ? unlikeCard : likeCard;

  apiCall(cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCountElement.textContent = updatedCard.likes.length;
    })
}

export { createCard, handleDelete, handleLike };