const Render = {
  newCard: null,
  createCard() {
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

    this.newCard = card
  },

  getResultFound(items) {
    let parent = document.querySelector(".cards")
    parent.innerHTML = "";
  
    for (let i = 0; i < items.length; i++) {
      this.createCard();
      this.newCard.setAttribute("data-index-number", i); // даем айди карточке, согласно его номеру в массиве
      this.newCard.childNodes[0].setAttribute("src", items[i].avatar_url); // присваем урл каждой картинки - вставляем   найти по классу!!!!!!

      // дотягиваемся до логина
      let namingString = [...this.newCard.childNodes].find(x => x.className === "cards-item__login");
      namingString.innerText = `LOGIN:   ${items[i].login}`; // вставляем

      // дотягиваемся до p для а
      let linkString = [...this.newCard.childNodes].find(x => x.className === "cards-item__link");

      // дотягиваемся до (а)
      let CardLink = [...linkString.childNodes].find(y => y.className === "goOver");
      CardLink.innerText = `LINK:   ${items[i].html_url}`; // вставляем
      CardLink.setAttribute("href", items[i].html_url);

      // дотягиваемся до рейтингa
      let raitString = [...this.newCard.childNodes].find(x => x.className === "cards-item__rating");
      raitString.innerText = `SCORE:   ${items[i].score}`; // вставляем

      parent.appendChild(this.newCard);
    }

    if (parent.innerHTML != "") document.querySelector(".deletePrev").classList.add("active")
  }
}

export default Render