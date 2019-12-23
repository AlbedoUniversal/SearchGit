import { functionTypeParam } from "babel-types";

// const userCardHtml =
//   '<img class="cards-item__photo" alt=""><p class="cards-item__login"></p><p class="cards-item__link"></p><p class="cards-item__rating"></p>';

const inputSearch = document.querySelector(".inputs-search"); //инпут, куда вводится текст поиска

const btn = document.querySelector(".inputs-type"); //кнопка поиска

const allCards = document.querySelector(".cards"); // контейнер с карточками

const sectionDelete = document.querySelector(".deletePrev"); // контейнер с кнопкой

const deleteAllBtn = document.querySelector(".deleteAll");

function getResultFound(items) {
  console.log(items);
  for (let i = 0; i < items.length; i++) {
    const card = document.createElement("div"); // карточка
    card.classList.add("cards-item");

    const cardImg = document.createElement("img"); // аватарка
    cardImg.classList.add("cards-item__photo");

    const cardLogin = document.createElement("p"); // логин
    cardLogin.classList.add("cards-item__login");

    const cardLink = document.createElement("p"); // ссылка
    cardLink.classList.add("cards-item__link");
    const a = document.createElement("a");
    a.classList.add("goOver");
    cardLink.appendChild(a);

    const cardRating = document.createElement("p"); // рэйтинг
    cardRating.classList.add("cards-item__rating");

    card.append(cardImg, cardLogin, cardLink, cardRating); //наполняем карточку
    card.setAttribute("id", i); // даем айди карточке, согласно его номеру в массиве

    cardImg.setAttribute("src", items[i].avatar_url); // присваем урл каждой картинки - вставляем

    let namingArr = [...card.childNodes].find(
      // находим все имена
      x => x.className === "cards-item__login"
    );
    namingArr.innerText = items[i].login; // вставляем

    let linksArr = [...card.childNodes].find(
      // находим все p для а
      x => x.className === "cards-item__link"
    );
    let allA = [...linksArr.childNodes].find(y => y.className === "goOver"); // находим все ссылки (а)
    allA.innerText = items[i].html_url; // вставляем
    allA.setAttribute("href", items[i].html_url);

    let raitArr = [...card.childNodes].find(
      // находим все рейтинги
      x => x.className === "cards-item__rating"
    );
    raitArr.innerText = items[i].score; // вставляем

    allCards.appendChild(card);
  }
  if (allCards.childNodes.length >= 1) {
    sectionDelete.classList.add("active");
  } else {
    sectionDelete.classList.remove("active");
  }
}

function clearAll() {
  while (allCards.firstChild) {
    allCards.removeChild(allCards.firstChild);
  }
}

btn.addEventListener("click", () => {
  fetch(`https://api.github.com/search/users?q=${inputSearch.value}`)
    .then(responce => responce.json())
    .then(json => {
      getResultFound(json.items);
    });
});

deleteAllBtn.addEventListener("click", () => {
  clearAll();
});

// resultFound();
