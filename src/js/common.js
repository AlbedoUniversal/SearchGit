// import Rendering from "./modules/render";
import Pagination from "./modules/pagination";

const inputSearch = document.querySelector(".inputs-search"); //инпут, куда вводится текст поиска
const btn = document.querySelector(".inputs-type"); //кнопка поиска
const sectionDelete = document.querySelector(".deletePrev"); // контейнер с кнопкой удаления
const deleteAllBtn = document.querySelector(".deleteAll"); // кнопка удалить все
let r = document.querySelectorAll(".radio-box__input");

let saveLocalStorage = JSON.parse(localStorage.getItem("gitCards")) || [];

if (localStorage.getItem("gitCards")) Pagination.countLi(saveLocalStorage);

// ф очищения всего поля с карточками
function clearAll() {
  inputSearch.value = "";
  saveLocalStorage = [];
  Pagination.countLi(saveLocalStorage);
  localStorage.removeItem("gitCards");
}

async function getData() {
  return await fetch(
    `https://api.github.com/search/users?q=${inputSearch.value}`
  )
    .then(responce => responce.json())
    .then(json => {
      saveLocalStorage = json.items;
      Pagination.countLi(saveLocalStorage);
      localStorage.setItem("gitCards", JSON.stringify(saveLocalStorage));
      JSON.parse(localStorage.getItem("gitCards"));
      if (!json.items.length) {
        alert("Простите, но мы не смогли найти людей по такому логину");
        inputSearch.value = "";
      }
    });
}

//  ф проверки пустого поля и отправка запроса
function checkField() {
  inputSearch.value != "" ? getData() : alert("empty field");
}

btn.addEventListener("click", () => {
  checkField();
});

inputSearch.addEventListener("keydown", e => {
  if (e.keyCode === 13) checkField();
});

deleteAllBtn.addEventListener("click", () => {
  clearAll();
  sectionDelete.classList.remove("active");
});

for (let item of r) {
  item.addEventListener("click", () => {
    Pagination.notesOnPage = item.value;
    Pagination.countLi(saveLocalStorage);
  });
}
