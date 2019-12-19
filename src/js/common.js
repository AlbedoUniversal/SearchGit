const userCardHTML =
  '<img class="cards-item__photo" alt=""><p class="cards-item__login"></p><p class="cards-item__link"></p><p class="cards-item__rating"></p>';

const div = createElement("div");

div.classList.add("cards-item");
div.innerHtml = userCardHTML;
