const grid = document.getElementById("featuredGrid");

const scrollAmount = 400;

document.querySelector(".next").addEventListener("click", () => {

    const maxScroll = grid.scrollWidth - grid.clientWidth;

    if (grid.scrollLeft >= maxScroll - 5) {

        // 最后一页 → 第一页
        grid.scrollTo({
            left: 0,
            behavior: "smooth"
        });

    } else {

        grid.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });

    }
});

document.querySelector(".prev").addEventListener("click", () => {

    if (grid.scrollLeft <= 5) {

        // 第一页 → 最后一页
        grid.scrollTo({
            left: grid.scrollWidth,
            behavior: "smooth"
        });

    } else {

        grid.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        });

    }
});
