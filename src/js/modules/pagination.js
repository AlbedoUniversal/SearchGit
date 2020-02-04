const Pagination = {
  notesOnPage: 6,
  roundedPaginationNumbers: 0,
  arrPaginationLi: [],
  countLi() {
    let pagination = document.querySelector("#paginations");
    pagination.innerHTML = "";
    Rendering.getResultFound(saveLocalStorage.slice(0, 6));
    this.roundedPaginationNumbers = Math.ceil(
      saveLocalStorage.length / this.notesOnPage
    );
    for (let j = 1; j <= roundedPaginationNumbers; j++) {
      let li = document.createElement("li");
      li.innerText = j;
      pagination.appendChild(li);
      this.arrPaginationLi.push(li);
      for (let item of this.arrPaginationLi) {
        item.addEventListener("click", () => {
          let pageNum = +item.innerHTML;
          let start = (pageNum - 1) * this.notesOnPage;
          let end = start + this.notesOnPage;
          saveLocalStorage.slice(start, end);
          Rendering.getResultFound(saveLocalStorage.slice(start, end));
        });
      }
    }
  }
};

export default Pagination;
