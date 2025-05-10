// @todo: Функция создания карточки
function createCard(name, link, deleteCard, likeCard, openModalImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", (e) => {
    likeCard(e);
  });

  cardImage.addEventListener("click", () => {
    openModalImage(name, link);
  });

  return cardElement;
}

function handleDelete(card) {
  card.remove();
}

function handleLike(e) {
  if (e.target.classList.contains("card__like-button")) {
    e.target.classList.toggle("card__like-button_is-active");
  }
}

export { createCard, handleDelete, handleLike };