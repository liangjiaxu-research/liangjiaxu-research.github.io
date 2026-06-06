const grid = document.getElementById("featuredGrid");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

nextBtn.addEventListener("click", () => {

    const firstCard = grid.firstElementChild;

    grid.appendChild(firstCard);

});

prevBtn.addEventListener("click", () => {

    const lastCard = grid.lastElementChild;

    grid.insertBefore(lastCard, grid.firstElementChild);

});
