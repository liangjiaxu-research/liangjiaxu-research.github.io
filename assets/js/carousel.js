const grid = document.getElementById("featuredGrid");

const cards = grid.querySelectorAll(".featured-card");

const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

grid.appendChild(firstClone);
grid.insertBefore(lastClone, cards[0]);

const gap = 32;
const cardWidth = cards[0].offsetWidth + gap;

grid.scrollLeft = cardWidth;

document.querySelector(".next").addEventListener("click", () => {

    grid.scrollBy({
        left: cardWidth,
        behavior: "smooth"
    });

});

document.querySelector(".prev").addEventListener("click", () => {

    grid.scrollBy({
        left: -cardWidth,
        behavior: "smooth"
    });

});

grid.addEventListener("scrollend", () => {

    const maxScroll =
        grid.scrollWidth - grid.clientWidth;

    // 到最后一个复制的第一张
    if (grid.scrollLeft >= maxScroll - cardWidth) {

        grid.scrollLeft = cardWidth;
    }

    // 到最前面复制的最后一张
    if (grid.scrollLeft <= 0) {

        grid.scrollLeft =
            maxScroll - cardWidth * 2;
    }

});
