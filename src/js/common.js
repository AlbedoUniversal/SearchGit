import { functionTypeParam } from "babel-types";
// import { getResultFound } from "./render.js";

const inputSearch = document.querySelector(".inputs-search"); //инпут, куда вводится текст поиска

const btn = document.querySelector(".inputs-type"); //кнопка поиска

const allCards = document.querySelector(".cards"); // контейнер с карточками

const sectionDelete = document.querySelector(".deletePrev"); // контейнер с кнопкой удаления

const deleteAllBtn = document.querySelector(".deleteAll"); // кнопка удалить все

let newCard;

const saveLocalStorage = localStorage.getItem("gitCards")
  ? JSON.parse(localStorage.getItem("gitCards"))
  : [];

// const saveLocalStorage = [];

function createCard() {
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

function getResultFound(items) {
  allCards.innerHTML = "";
  // saveLocalStorage.splice(0, saveLocalStorage.length);
  for (let i = 0; i < items.length; i++) {
    createCard();
    newCard.setAttribute("data-index-number", i); // даем айди карточке, согласно его номеру в массиве

    //////////////////////////////////////////////////////////////////////////////////////////////
    newCard.childNodes[0].setAttribute("src", items[i].avatar_url); // присваем урл каждой картинки - вставляем
    //////////////////////////////////////////////////////////////////////////////////////////////
    let namingString = [...newCard.childNodes].find(
      // дотягиваемся до логина

      x => x.className === "cards-item__login"
    );
    namingString.innerText = `LOGIN:   ${items[i].login}`; // вставляем
    //////////////////////////////////////////////////////////////////////////////////////////////
    let linkString = [...newCard.childNodes].find(
      // дотягиваемся до p для а

      x => x.className === "cards-item__link"
    );
    let allCardLinks = [...linkString.childNodes].find(
      // дотягиваемся до (а)
      y => y.className === "goOver"
    );
    allCardLinks.innerText = `LINK:   ${items[i].html_url}`; // вставляем
    allCardLinks.setAttribute("href", items[i].html_url);
    //////////////////////////////////////////////////////////////////////////////////////////////
    let raitString = [...newCard.childNodes].find(
      // дотягиваемся до рейтингa
      x => x.className === "cards-item__rating"
    );
    raitString.innerText = `SCORE:   ${items[i].score}`; // вставляем
    //////////////////////////////////////////////////////////////////////////////////////////////
    allCards.appendChild(newCard);
    localStorage.setItem("gitCards", JSON.stringify(saveLocalStorage));
  }
  if (allCards.innerHTML != "") {
    sectionDelete.classList.add("active");
  }
}

function clearAll() {
  // ф очищения всего поля с карточками
  inputSearch.value = "";
  saveLocalStorage.splice(0, saveLocalStorage.length);
  getResultFound(saveLocalStorage);
  localStorage.setItem("gitCards", JSON.stringify(saveLocalStorage));
  delete localStorage["gitCards"];
}

async function getData() {
  let res = await fetch(
    `https://api.github.com/search/users?q=${inputSearch.value}`
  )
    .then(responce => responce.json())
    .then(json => {
      saveLocalStorage.splice(0, saveLocalStorage.length);
      saveLocalStorage.push(...json.items);
      getResultFound(saveLocalStorage);
      console.log(saveLocalStorage);
      localStorage.setItem("gitCards", JSON.stringify(saveLocalStorage));
      if (json.items.length === 0) {
        alert("Простите, но мы не смогли найти людей по такому логину");
        inputSearch.value = "";
      }
    });
  return res;
}

function checkEmptyFieldAndSendRequest() {
  //  ф проверки пустого поля и отправка запроса
  if (inputSearch.value != "") {
    getData();
  } else alert("empty field");
}

btn.addEventListener("click", () => {
  checkEmptyFieldAndSendRequest();
});

inputSearch.addEventListener("keydown", e => {
  if (e.keyCode === 13) {
    checkEmptyFieldAndSendRequest();
  }
});

deleteAllBtn.addEventListener("click", () => {
  clearAll();
  sectionDelete.classList.remove("active");
});

import "babel-polyfill";
