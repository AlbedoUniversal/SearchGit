import { functionTypeParam } from "babel-types";
import { renderCard } from './render.js';

const inputSearch = document.querySelector(".inputs-search"); //инпут, куда вводится текст поиска

const btn = document.querySelector(".inputs-type"); //кнопка поиска

const allCards = document.querySelector(".cards"); // контейнер с карточками

const sectionDelete = document.querySelector(".deletePrev"); // контейнер с кнопкой удаления

const deleteAllBtn = document.querySelector(".deleteAll"); // кнопка удалить все

let saveLocalStorage = [];

let newCard;


function createCard() {
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

  newCard = card;
}


function getResultFound(items) {
  if (items.length != 0) {
    sectionDelete.classList.add("active");
  }
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
    namingString.innerText = items[i].login; // вставляем
    //////////////////////////////////////////////////////////////////////////////////////////////
    let linkString = [...newCard.childNodes].find(
      // дотягиваемся до p для а

      x => x.className === "cards-item__link"
    );
    let allCardLinks = [...linkString.childNodes].find(
      // дотягиваемся до (а)
      y => y.className === "goOver"
    );
    allCardLinks.innerText = items[i].html_url; // вставляем
    allCardLinks.setAttribute("href", items[i].html_url);
    //////////////////////////////////////////////////////////////////////////////////////////////
    let raitString = [...newCard.childNodes].find(
      // дотягиваемся до рейтингa
      x => x.className === "cards-item__rating"
    );
    raitString.innerText = items[i].score; // вставляем
    //////////////////////////////////////////////////////////////////////////////////////////////
    allCards.appendChild(newCard);
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
      saveLocalStorage = json.items;
      localStorage.setItem('gitCards', saveLocalStorage);
      if (json.items.length === 0) {
        alert("Простите, но мы не смогли найти людей по такому логину");
      }
    });
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

inputSearch.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    checkEmptyFieldAndSendRequest();
  }
});

deleteAllBtn.addEventListener("click", () => {
  clearAll();
  sectionDelete.classList.remove("active");
});


renderCard();

