import Render from "./modules/render";

const inputSearch = document.querySelector(".inputs-search"); //инпут, куда вводится текст поиска
const btn = document.querySelector(".inputs-type"); //кнопка поиска
// const allCards = document.querySelector(".cards"); // контейнер с карточками
const sectionDelete = document.querySelector(".deletePrev"); // контейнер с кнопкой удаления
const deleteAllBtn = document.querySelector(".deleteAll"); // кнопка удалить все

/* Слишком сложная запись для такого простого действия. Ниже показано, как сделать это проще */
// let saveLocalStorage = localStorage.getItem("gitCards")
//   ? JSON.parse(localStorage.getItem("gitCards"))
//   : [];
let saveLocalStorage = JSON.parse(localStorage.getItem("gitCards")) || []

/* Код повторяется, незачем парсить 2 раза одно и то же в одну и ту же переменную */
// if (localStorage.getItem("gitCards")) {
//   saveLocalStorage = JSON.parse(localStorage.getItem("gitCards"));
//   getResultFound(saveLocalStorage);
// }

/* А здесь уже можно вызвать рендер, в зависимости от наличия localStorage */
if (localStorage.getItem("gitCards")) Render.getResultFound(saveLocalStorage);

// ф очищения всего поля с карточками
function clearAll() {
  inputSearch.value = "";
  /* Никогда не видел, чтобы так очищали массив :). Ниже написал способ попроще и популярнее */
  // saveLocalStorage.splice(0, saveLocalStorage.length);
  saveLocalStorage = []

  Render.getResultFound(saveLocalStorage);
  /* Тоже сильно перемудрил. Без лишнего кода просто удаляем позицию в localStorage */
  // localStorage.setItem("gitCards", JSON.stringify(saveLocalStorage));
  // delete localStorage["gitCards"]; // local.storage(remove)
  localStorage.removeItem('gitCards')
}

async function getData() {
  return await fetch(`https://api.github.com/search/users?q=${inputSearch.value}`)
    .then(response => response.json())
    .then(json => {
      /* Очень сильно перемудрил. Намного проще перезаписывать переменную, по крайней мере, в твоем случае */
      // saveLocalStorage.splice(0, saveLocalStorage.length);
      // saveLocalStorage.push(...json.items);
      saveLocalStorage = json.items

      Render.getResultFound(saveLocalStorage);
      localStorage.setItem("gitCards", JSON.stringify(saveLocalStorage));
      
      /* Вообще не понял, зачем это */
      // JSON.parse(localStorage.getItem("gitCards"));
      
      /* 0 - это false. Можешь использовать в таких случаях более лаконичный способ записи условия */
      // if (json.items.length === 0) {
      if (!json.items.length) {
        alert("Простите, но мы не смогли найти людей по такому логину");
        inputSearch.value = "";
      }
    });

  /* Ты никак не используешь res в самой функции, а значит, она просто не нужна. Достаточно добавить return к самому запросу */
  // return res;
}

//  ф проверки пустого поля и отправка запроса
/* слишком длинное название функции. Это ничуть не ошибка, но старайся всегда сокращать свои записи */
// function checkEmptyFieldAndSendRequest() {
function checkField() {
  /* Опять же, пустая строка - это false, плюс конструкция if/else здесь примитивна. В таких случаях пиши лаконичнее */
  // if (inputSearch.value != "") {
  //   getData();
  // } else alert("empty field");
  inputSearch.value ? getData() : alert('empty field')
}

/* Если в addEventListener ты передаешь только вызов функции, то не нужно засовывать ее в еще одну функцию. Достаточно записи ниже */
// btn.addEventListener("click", () => {
//   checkEmptyFieldAndSendRequest();
// });
btn.addEventListener("click", checkField);

inputSearch.addEventListener("keydown", e => {
  /* Опять же, пробуй писать короче и лаконичнее */
  // if (e.keyCode === 13) {
  //   checkEmptyFieldAndSendRequest();
  // }
  if (e.keyCode === 13) checkField()
});

deleteAllBtn.addEventListener("click", () => {
  clearAll();
  sectionDelete.classList.remove("active");
});
