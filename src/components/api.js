const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38',
    headers: {
        authorization: '57b4c088-195f-43a4-98fb-ebf4b7c1a275',
        'Content-Type': 'application/json'
    }
}

function handleResponse(res) {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers
    })
    .then(res=>handleResponse(res))
    .catch((err) => {
        console.error('Ошибка при получении карточек:', err);
    });
}

function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: config.headers
    })
    .then((res)=>handleResponse(res))
    .catch((err)=>{
        console.error('Ошибка при получении информации о пользователе:', err);
    })
}

function editUserInfo(nameData, aboutData) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: nameData,
            about: aboutData
        })
    })
    .then((res)=>handleResponse(res))
    .catch((err)=>{
        console.error('Ошибка при обновлении информации о пользователе:', err);
    })
}

function editUserAvatar(avatarData) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: {
            avatar: avatarData
        }
    })
    .then((res)=>handleResponse(res))
    .catch((err)=>{
        console.error('Ошибка при обновлении аватарки пользователя:', err);
    })
}

function addNewCard(nameData, linkData) {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: nameData,
            link: linkData
        })
    })
    .then((res)=>handleResponse(res))
    .catch((err)=>{
        console.error('Ошибка при добавлении новой карточки:', err);
    })
}

function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
    .then((res)=>handleResponse(res))
    .catch((err)=>{
        console.error('Ошибка при удалении карточки:', err);
    })
}

function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers
    })
    .then((res)=>handleResponse(res))
    .catch((err)=>{
        console.error('Ошибка при лайке карточки:', err);
    })
}

function unlikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
    .then((res)=>handleResponse(res))
    .catch((err)=>{
        console.error('Ошибка при убирании лайка с карточки:', err);
    })
}

export { getInitialCards, getUserInfo, editUserInfo, editUserAvatar, addNewCard, deleteCard as deleteCardAPI, likeCard, unlikeCard };