// @todo: Функция создания карточки
export function createCard(name, link, deleteCard, likeCard, openModalImage) {
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