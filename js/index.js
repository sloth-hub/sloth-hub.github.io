const body = document.querySelector("body");
const header = document.querySelector("header");
const work = document.querySelector("#works");
const closeBtn = document.querySelector("span.close");
const modal = document.querySelector("div.modal");
const modalImg = modal.querySelector("img.gallary-img");
const topbtn = document.querySelector("a.top");
const navmenu = document.querySelector("ul.nav-menu");

init();

function init() {
    AOS.init();
    window.addEventListener("scroll", scrollEvent);
    body.addEventListener("click", ({ target }) => {
        if (target.className === "toggle-bar") {
            clickedToggleBar();
        } else if (target.closest("section").id === "works") {
            clickedImage(target);
        }
    });
}

function scrollEvent() {
    const skills = document.querySelectorAll("circle.skillbar");
    if (window.scrollY >= 1500 && window.scrollY <= 2650) {
        skills.forEach((e) => {
            e.classList.add("circle_animation");
        });
    } else {
        skills.forEach((e) => {
            e.classList.remove("circle_animation");
        });
    };
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
    } else if (target.className === "close on") {
        [header, topbtn].forEach(el => removeOrAdd("add", el, "on"));
        [target, modalImg].forEach((el, i) => removeOrAdd("remove", el, (i === 0 ? "on" : "zoom")));
        $(modal).fadeOut();
    } else if (target.className === "gallary-img" || "gallary-img zoom") {
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