import Rendering from "./render";
// let r = document.querySelector(".radio-box__checkmark");

const Pagination = {
  notesOnPage: 3,
  roundedPaginationNumbers: 0,
  arrPaginationLi: [],
  activeLi: null,
  showPage(li) {
    if (this.activeLi) this.activeLi.classList.remove("active");
    this.activeLi = li;
    this.activeLi.classList.add("active");
  },
  countLi(arr) {
    let parent = document.querySelector("#paginations");
    parent.innerHTML = "";
    Rendering.drawCards(arr.slice(0, this.notesOnPage));
    this.roundedPaginationNumbers = Math.ceil(arr.length / this.notesOnPage);
    for (let j = 1; j <= this.roundedPaginationNumbers; j++) {
      let li = document.createElement("li");
      li.innerText = j;
      parent.appendChild(li);
      this.arrPaginationLi.push(li);
      for (let item of this.arrPaginationLi) {
        this.showPage(parent.childNodes[0]);
        item.addEventListener("click", () => {
          this.showPage(item);
          let pageNum = +item.innerHTML;
          let start = (pageNum - 1) * this.notesOnPage;
          let end = start + this.notesOnPage;
          arr.slice(start, end);
          Rendering.drawCards(arr.slice(start, end));
          // localStorage.setItem("gitCards", JSON.stringify(arr)); напомнить про это
        });
      }
    }
  }
};

// r.addEventListener("click", () => {
//   Pagination.notesOnPage = 6;
// });

export default Pagination;

// module.export = {

// }
