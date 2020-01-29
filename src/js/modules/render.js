export let newCard;

export function createCard() {
  // ф создания шаблона карточки
  const card = document.createElement("div"); // карточка
  card.classList.add("cards-item"); // присваиваем класс

  const cardImg = document.createElement("img"); // аватарка
  cardImg.classList.add("cards-item__photo"); // присваиваем класс

  const cardLogin = document.createElement("p"); // логин
  cardLogin.classList.add("cards-item__login"); // присваиваем класс
  cardLogin.innerText = "Login";

  const cardWrapperLink = document.createElement("p"); // обертка ссылки
  cardWrapperLink.classList.add("cards-item__link"); // присваиваем класс
  const cardLink = document.createElement("a"); // ссылка
  cardLink.classList.add("goOver"); // присваиваем класс
  cardWrapperLink.appendChild(cardLink); //аппендим а в р

  const cardRating = document.createElement("p"); // рэйтинг
  cardRating.classList.add("cards-item__rating"); // присваиваем класс
  card.append(cardImg, cardLogin, cardWrapperLink, cardRating); //наполняем карточку

  newCard = card;

  return newCard;
}
