const body = document.querySelector("body");
const header = document.querySelector("header");
const work = document.querySelector("#works");
const closeBtn = document.querySelector("span.close");
const modal = document.querySelector("div.modal");
const modalImg = modal.querySelector("img.gallary-img");
const topbtn = document.querySelector("button.top");
const navmenu = document.querySelector("ul.nav-menu");

init();

function init() {
    cardEvent();
    window.addEventListener("scroll", scrollEvent);
    body.addEventListener("click", ({ target }) => {
        if (target.className === "toggle-bar") {
            clickedToggleBar();
        } else if (target.closest("section") && target.closest("section").id === "works") {
            clickedImage(target);
        } else if (target.className.includes("top")) {
            window.scrollTo({top: 0});
        }
    });
}

function cardEvent() {

    const observer = new IntersectionObserver(entries => {
        let delay = 0;
        entries.forEach((entry) => {
            const next = entry.target;
            if (entry.isIntersecting) {
                if (next) {
                    setTimeout(() => {
                        next.classList.add("active");
                    }, delay);
                    delay += 200;
                }
            } else {
                next.classList.remove("active");
            }
        });
    });

    const cards = document.querySelectorAll(".fade-animate");
    cards.forEach(e => observer.observe(e));
}

function scrollEvent() {

    const modal = document.querySelector("#works > div > span");
    if (window.pageYOffset >= 70 && modal.className === "close") {
        header.classList.add("on");
        topbtn.classList.add("on");
    } else {
        header.classList.remove("on");
        topbtn.classList.remove("on");
    }
}

function clickedToggleBar() {
    navmenu.classList.toggle("show");
    header.classList.toggle("active");
}

function clickedImage(target) {
    if (target.classList.contains("gallary-item")) {
        $(modal).css({ "display": "flex", "align-items": "center", "flex-wrap": "wrap" })
            .hide().fadeIn();
        [header, topbtn, closeBtn].forEach((el, i) => {
            removeOrAdd((i === 2 ? "add" : "remove"), el, "on");
        });
        modalImg.src = target.children[0].src;
        modalImg.alt = target.children[0].alt;
        body.classList.add("stop-scroll");
    } else if (target.className === "close on") {
        [header, topbtn].forEach(el => removeOrAdd("add", el, "on"));
        [target, modalImg].forEach((el, i) => removeOrAdd("remove", el, (i === 0 ? "on" : "zoom")));
        $(modal).fadeOut();
    } else if (target.className.includes("gallary-img")) {
        target.classList.toggle("zoom");
    }
}

function removeOrAdd(type, target, classname) {
    if (type === "remove") {
        target.classList.remove(classname);
    } else {
        target.classList.add(classname);
    }
}