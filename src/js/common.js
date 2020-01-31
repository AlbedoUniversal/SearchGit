import { newCard, createCard } from "./modules/render";

const inputSearch = document.querySelector(".inputs-search"); //инпут, куда вводится текст поиска

const btn = document.querySelector(".inputs-type"); //кнопка поиска

const allCards = document.querySelector(".cards"); // контейнер с карточками

const sectionDelete = document.querySelector(".deletePrev"); // контейнер с кнопкой удаления

const deleteAllBtn = document.querySelector(".deleteAll"); // кнопка удалить все

// --------------------------------------------------------------

let saveLocalStorage = localStorage.getItem("gitCards")
  ? JSON.parse(localStorage.getItem("gitCards"))
  : [];

if (localStorage.getItem("gitCards")) {
  saveLocalStorage = JSON.parse(localStorage.getItem("gitCards"));
  getResultFound(saveLocalStorage);
}

console.log(saveLocalStorage);

let arrLi = []; // массив, куда будут пушиться все li
let pagination = document.querySelector("#paginations"); // ul, где все li
let notesOnPage = 6; // количество страниц, для отображения

let countOfpaginchiki = Math.ceil(saveLocalStorage.length / notesOnPage);

console.log(1);

function countLi() {
  for (let j = 1; j <= countOfpaginchiki; j++) {
    let li = document.createElement("li");
    li.innerText = j;
    pagination.appendChild(li);
    arrLi.push(li);
  }
}
countLi();

for (let item of arrLi) {
  item.addEventListener("click", function() {
    let pageNum = +this.innerHTML;
    let start = (pageNum - 1) * notesOnPage;
    let end = start + notesOnPage;
    let notes = saveLocalStorage.slice(start, end);
    getResultFound(notes);
  });
}

function getResultFound(items) {
  // добавить второй аргумент
  allCards.innerHTML = "";

  for (let i = 0; i < items.length; i++) {
    createCard();
    newCard.setAttribute("data-index-number", i + 1); // даем айди карточке, согласно его номеру в массиве

    //////////////////////////////////////////////////////////////////////////////////////////////
    let img = [...newCard.childNodes].find(
      x => x.className === "cards-item__photo"
    );
    img.setAttribute("src", items[i].avatar_url);

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
    let CardLink = [...linkString.childNodes].find(
      // дотягиваемся до (а)
      y => y.className === "goOver"
    );
    CardLink.innerText = `LINK:   ${items[i].html_url}`; // вставляем
    CardLink.setAttribute("href", items[i].html_url);
    //////////////////////////////////////////////////////////////////////////////////////////////
    let raitString = [...newCard.childNodes].find(
      // дотягиваемся до рейтингa
      x => x.className === "cards-item__rating"
    );
    raitString.innerText = `SCORE:   ${items[i].score}`; // вставляем
    //////////////////////////////////////////////////////////////////////////////////////////////
    allCards.appendChild(newCard);
  }
  localStorage.setItem("gitCards", JSON.stringify(saveLocalStorage));

  if (allCards.innerHTML != "") {
    sectionDelete.classList.add("active");
  }
}

// ф очищения всего поля с карточками
function clearAll() {
  inputSearch.value = "";
  saveLocalStorage.splice(0, saveLocalStorage.length);
  z;
  getResultFound(saveLocalStorage);
  localStorage.setItem("gitCards", JSON.stringify(saveLocalStorage));
  delete localStorage["gitCards"]; // local.storage(remove)
}

async function getData() {
  let res = await fetch(
    `https://api.github.com/search/users?q=${inputSearch.value}`
  )
    .then(responce => responce.json())
    .then(json => {
      // saveLocalStorage.splice(0, saveLocalStorage.length);
      // saveLocalStorage.push(...json.items);
      saveLocalStorage = json.items;

      getResultFound(saveLocalStorage);
      localStorage.setItem("gitCards", JSON.stringify(saveLocalStorage));
      JSON.parse(localStorage.getItem("gitCards"));
      if (json.items.length === 0) {
        alert("Простите, но мы не смогли найти людей по такому логину");
        inputSearch.value = "";
      }
    });
  return res;
}

//  ф проверки пустого поля и отправка запроса
function checkEmptyFieldAndSendRequest() {
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
