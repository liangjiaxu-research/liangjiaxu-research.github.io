const grid = document.getElementById("featuredGrid");

document.querySelector(".next").addEventListener("click", () => {
    grid.scrollBy({
        left: 400,
        behavior: "smooth"
    });
});

document.querySelector(".prev").addEventListener("click", () => {
    grid.scrollBy({
        left: -400,
        behavior: "smooth"
    });
});
