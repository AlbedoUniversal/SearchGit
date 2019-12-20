const userCardHTML =
  '<img class="cards-item__photo" alt=""><p class="cards-item__login"></p><p class="cards-item__link"></p><p class="cards-item__rating"></p>';
const div = document.createElement("div");
div.classList.add("cards-item");
div.innerHtml = userCardHTML;

let inputSearch = document.querySelector(".inputs-search"); //инпут, куда вводится текст поиска
// let searchString = inputSearch.value; // сам текст поиска

const btn = document.querySelector(".inputs-type"); //кнопка поиска

function a(items) {
  console.log(items);
}

btn.addEventListener("click", () => {
  fetch(`https://api.github.com/search/users?q=${inputSearch.value}`)
    .then(responce => responce.json())
    .then(json => {
      a(json.items);
    });
});
