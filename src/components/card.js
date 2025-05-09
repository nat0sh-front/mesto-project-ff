// @todo: Функция создания карточки
export function createCard(name, link, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    
    const deleteButton = cardElement.querySelector('.card__delete-button')
    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });
    return cardElement;
}