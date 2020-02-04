import Rendering from "./modules/render";
import Pagination from "./modules/pagination";

const inputSearch = document.querySelector(".inputs-search"); //инпут, куда вводится текст поиска
const btn = document.querySelector(".inputs-type"); //кнопка поиска
const sectionDelete = document.querySelector(".deletePrev"); // контейнер с кнопкой удаления
const deleteAllBtn = document.querySelector(".deleteAll"); // кнопка удалить все
// const pagination = document.querySelector("#paginations"); // ul, где все li

let saveLocalStorage = JSON.parse(localStorage.getItem("gitCards")) || [];
// let arrLi = []; // массив, куда будут пушиться все li
// let notesOnPage = 6; // количество страниц, для отображения
// let countOfpaginchiki = 0;

if (localStorage.getItem("gitCards")) Pagination.countLi();

// function countLi() {
//   pagination.innerHTML = "";
//   Rendering.getResultFound(saveLocalStorage.slice(0, 6));
//   countOfpaginchiki = Math.ceil(saveLocalStorage.length / notesOnPage);
//   for (let j = 1; j <= countOfpaginchiki; j++) {
//     let li = document.createElement("li");
//     li.innerText = j;
//     pagination.appendChild(li);
//     arrLi.push(li);
//     for (let item of arrLi) {
//       item.addEventListener("click", () => {
//         let pageNum = +item.innerHTML;
//         let start = (pageNum - 1) * notesOnPage;
//         let end = start + notesOnPage;
//         saveLocalStorage.slice(start, end);
//         Rendering.getResultFound(saveLocalStorage.slice(start, end));
//       });
//     }
//   }
// }

// ф очищения всего поля с карточками
function clearAll() {
  inputSearch.value = "";
  saveLocalStorage = [];
  Rendering.getResultFound(saveLocalStorage);
  localStorage.removeItem("gitcards");
}

async function getData() {
  return await fetch(
    `https://api.github.com/search/users?q=${inputSearch.value}`
  )
    .then(responce => responce.json())
    .then(json => {
      saveLocalStorage = json.items;
      Pagination.countLi();
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
