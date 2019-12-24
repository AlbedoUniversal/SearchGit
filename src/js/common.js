import { functionTypeParam } from "babel-types";

// const userCardHtml =
//   '<img class="cards-item__photo" alt=""><p class="cards-item__login"></p><p class="cards-item__link"></p><p class="cards-item__rating"></p>';

const inputSearch = document.querySelector(".inputs-search"); //инпут, куда вводится текст поиска

const btn = document.querySelector(".inputs-type"); //кнопка поиска

const allCards = document.querySelector(".cards"); // контейнер с карточками

const sectionDelete = document.querySelector(".deletePrev"); // контейнер с кнопкой удаления

const deleteAllBtn = document.querySelector(".deleteAll"); // кнопка удалить все

function getResultFound(items) {
  sectionDelete.classList.add("active");
  console.log(items);
  for (let i = 0; i < items.length; i++) {
    const card = document.createElement("div"); // карточка
    card.classList.add("cards-item"); // присваиваем класс

    const cardImg = document.createElement("img"); // аватарка
    cardImg.classList.add("cards-item__photo"); // присваиваем класс

    const cardLogin = document.createElement("p"); // логин
    cardLogin.classList.add("cards-item__login"); // присваиваем класс

    const cardWrapperLink = document.createElement("p"); // обертка ссылки
    cardWrapperLink.classList.add("cards-item__link"); // присваиваем класс
    const cardLink = document.createElement("a"); // ссылка
    cardLink.classList.add("goOver"); // присваиваем класс
    cardWrapperLink.appendChild(cardLink); //аппендим а в р

    const cardRating = document.createElement("p"); // рэйтинг
    cardRating.classList.add("cards-item__rating"); // присваиваем класс

    card.append(cardImg, cardLogin, cardWrapperLink, cardRating); //наполняем карточку
    card.setAttribute("data-index-number", i); // даем айди карточке, согласно его номеру в массиве

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    cardImg.setAttribute("src", items[i].avatar_url); // присваем урл каждой картинки - вставляем
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let namingString = [...card.childNodes].find(
      // дотягиваемся до логина
      x => x.className === "cards-item__login"
    );
    namingString.innerText = items[i].login; // вставляем
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let linkString = [...card.childNodes].find(
      // дотягиваемся до p для а
      x => x.className === "cards-item__link"
    );
    let allCardLinks = [...linkString.childNodes].find(
      y => y.className === "goOver"
    ); // дотягиваемся до (а)
    allCardLinks.innerText = items[i].html_url; // вставляем
    allCardLinks.setAttribute("href", items[i].html_url);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let raitString = [...card.childNodes].find(
      // дотягиваемся до рейтингa
      x => x.className === "cards-item__rating"
    );
    raitString.innerText = items[i].score; // вставляем
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    allCards.appendChild(card);
  }
}

function clearAll() {
  // ф очищения всего поля с карточками
  while (allCards.firstChild) {
    allCards.removeChild(allCards.firstChild);
  }
  inputSearch.value = "";
}

function getData() {
  // ф отправки запроса на сервер
  fetch(`https://api.github.com/search/users?q=${inputSearch.value}`)
    .then(responce => responce.json())
    .then(json => {
      getResultFound(json.items);
    });
}

btn.addEventListener("click", () => {
  getData();
});

btn.addEventListener("keydown", handler);

function handler(event) {
  console.log(event);
}

handler();

deleteAllBtn.addEventListener("click", () => {
  clearAll();
  sectionDelete.classList.remove("active");
});

// resultFound();
