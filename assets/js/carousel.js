const carousel = document.querySelector(".featured-carousel");
const grid = document.getElementById("featuredGrid");
const dotsBox = document.getElementById("featuredDots");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

// 动画时长，与 CSS 中 .featured-grid 的 transition 保持一致
const DURATION = 400;

const cards = [...grid.children];
cards.forEach((card, i) => { card.dataset.index = i; });

let busy = false;

// 卡片间距以 CSS 的 gap 为准
const gap = () => parseFloat(getComputedStyle(grid).columnGap) || 0;
const step = () => grid.firstElementChild.offsetWidth + gap();
const current = () => Number(grid.firstElementChild.dataset.index);

/* 圆点指示器 */
const dots = cards.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Go to article ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsBox.appendChild(dot);
    return dot;
});

function updateDots() {
    const c = current();
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === c);
        dot.setAttribute("aria-current", i === c ? "true" : "false");
    });
}

/* 翻页 */
function next() {
    if (busy) return;
    busy = true;

    grid.style.transform = `translateX(-${step()}px)`;

    setTimeout(() => {
        grid.appendChild(grid.firstElementChild);

        grid.style.transition = "none";
        grid.style.transform = "translateX(0)";
        grid.offsetHeight;
        grid.style.transition = "";

        updateDots();
        busy = false;
    }, DURATION);
}

function prev() {
    if (busy) return;
    busy = true;

    grid.style.transition = "none";
    grid.insertBefore(grid.lastElementChild, grid.firstElementChild);
    grid.style.transform = `translateX(-${step()}px)`;
    grid.offsetHeight;
    grid.style.transition = "";
    grid.style.transform = "translateX(0)";

    updateDots();
    setTimeout(() => { busy = false; }, DURATION);
}

// 点击圆点：相邻的用滑动动画，较远的直接跳转并淡入
function goTo(i) {
    if (busy || i === current()) return;

    const n = cards.length;
    const forward = (i - current() + n) % n;

    if (forward === 1) return next();
    if (forward === n - 1) return prev();

    for (let k = 0; k < forward; k++) {
        grid.appendChild(grid.firstElementChild);
    }
    grid.animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 300, easing: "ease-out" });
    updateDots();
}

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);

/* 手机上左右滑动翻页 */
let touchX = null;
grid.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
grid.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchX = null;
});

/* 自动轮播：间隔由 data-autoplay（毫秒）设定，设为 0 即关闭；鼠标悬停、键盘聚焦或页面隐藏时暂停 */
const delay = Number(carousel.dataset.autoplay) || 0;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let timer = null;

function startAutoplay() {
    if (delay > 0 && !reduceMotion && !timer) timer = setInterval(next, delay);
}
function stopAutoplay() {
    clearInterval(timer);
    timer = null;
}

carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);
carousel.addEventListener("focusin", stopAutoplay);
carousel.addEventListener("focusout", startAutoplay);
carousel.addEventListener("touchstart", stopAutoplay, { passive: true });
document.addEventListener("visibilitychange", () => {
    document.hidden ? stopAutoplay() : startAutoplay();
});

updateDots();
startAutoplay();
