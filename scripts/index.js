// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, link, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    
    const deleteButton = cardElement.querySelector('.card__delete-button')
    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    });
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу
function renderCards() {
    initialCards.forEach((item)=> {
        const card = createCard(item.name, item.link, deleteCard);
        cardList.append(card);
    })
}

renderCards();
