const grid = document.getElementById("featuredGrid");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

nextBtn.addEventListener("click", () => {

    const cardWidth =
        grid.firstElementChild.offsetWidth + 32;

    grid.style.transform =
        `translateX(-${cardWidth}px)`;

    setTimeout(() => {

        const firstCard =
            grid.firstElementChild;

        grid.appendChild(firstCard);

        grid.style.transition = "none";
        grid.style.transform = "translateX(0)";

        grid.offsetHeight;

        grid.style.transition =
            "transform 0.4s ease";

    }, 400);

});

prevBtn.addEventListener("click", () => {

    const cardWidth =
        grid.firstElementChild.offsetWidth + 32;

    const lastCard =
        grid.lastElementChild;

    grid.style.transition = "none";

    grid.insertBefore(
        lastCard,
        grid.firstElementChild
    );

    grid.style.transform =
        `translateX(-${cardWidth}px)`;

    grid.offsetHeight;

    grid.style.transition =
        "transform 0.4s ease";

    grid.style.transform =
        "translateX(0)";

});
