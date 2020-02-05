const Rendering = {
  newCard: null,
  createCard() {
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

    this.newCard = card;
  },
  drawCards(items) {
    const allCards = document.querySelector(".cards");

    allCards.innerHTML = "";

    for (let i = 0; i < items.length; i++) {
      this.createCard();
      this.newCard.setAttribute("data-index-number", i + 1); // даем айди карточке, согласно его номеру в массиве

      //////////////////////////////////////////////////////////////////////////////////////////////
      let img = [...this.newCard.childNodes].find(
        x => x.className === "cards-item__photo"
      );
      img.setAttribute("src", items[i].avatar_url);

      //////////////////////////////////////////////////////////////////////////////////////////////
      let namingString = [...this.newCard.childNodes].find(
        // дотягиваемся до логина

        x => x.className === "cards-item__login"
      );
      namingString.innerText = `LOGIN:   ${items[i].login}`; // вставляем
      //////////////////////////////////////////////////////////////////////////////////////////////
      let linkString = [...this.newCard.childNodes].find(
        // дотягиваемся до p для а

        x => x.className === "cards-item__link"
      );
      let CardLink = [...linkString.childNodes].find(
        // дотягиваемся до (а)
        y => y.className === "goOver"
      );
      CardLink.innerText = `LINK:   ${items[i].html_url}`; // вставляем
      CardLink.setAttribute("href", items[i].html_url);
      //////////////////////////////////////////////////////////////////////////////////////////////
      let raitString = [...this.newCard.childNodes].find(
        // дотягиваемся до рейтингa
        x => x.className === "cards-item__rating"
      );
      raitString.innerText = `SCORE:   ${items[i].score}`; // вставляем
      //////////////////////////////////////////////////////////////////////////////////////////////
      allCards.appendChild(this.newCard);
    }

    if (allCards.innerHTML != "")
      document.querySelector(".deletePrev").classList.add("active");
  }
};

export default Rendering;
