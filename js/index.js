const body = document.querySelector("body");
const header = body.querySelector("header");
const closeBtn = body.querySelector("span.close");
const topbtn = body.querySelector("button.top");

document.addEventListener("DOMContentLoaded", init);

function init() {
    cardEvent();
    changeNav();
    window.addEventListener("scroll", scrollEvent);
    body.addEventListener("click", ({ target }) => {
        if (target.className === "toggle-bar") {
            clickedToggleBar();
        } else if (target.closest("section") && target.closest("section").id === "works") {
            clickedImage(target);
        } else if (target.className.includes("top")) {
            window.scrollTo({ top: 0 });
        } else if (target.closest(".detail-btn")) {
            clickedDetail(target);
        } else if (target.tagName === "IMG" && target.parentNode.classList.contains("details")) {
            window.open(target.src);
        } else if (target.className === "close") {
            const offsetTop = target.closest(".card").offsetTop;
            target.parentNode.classList.remove("active");
            window.scrollTo({ top: offsetTop - 100 });
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
    const cards = body.querySelectorAll(".fade-animate");
    cards.forEach(e => observer.observe(e));
}

function scrollEvent() {
    if (window.scrollY >= 70 && closeBtn) {
        header.classList.add("on");
        topbtn.classList.add("on");
    } else {
        header.classList.remove("on");
        topbtn.classList.remove("on");
    }
}

function changeNav() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry) => {
            const navmenu = body.querySelector(".nav-menu");
            const id = entry.target.id;
            if (entry.isIntersecting && id !== "home") {
                if (navmenu.querySelector(".active")) {
                    navmenu.querySelector(".active").classList.remove("active");
                }
                navmenu.querySelector(`[href="#${id}"]`).classList.add('active');
            } else if (id === "home") {
                if (navmenu.querySelector(".active")) {
                    navmenu.querySelector(".active").classList.remove("active");
                }
            }
        });
    }, { threshold: 0.1 });
    const sections = body.querySelectorAll("section");
    sections.forEach(section => observer.observe(section));
}

function clickedToggleBar() {
    const navmenu = body.querySelector("ul.nav-menu");
    navmenu.classList.toggle("show");
    header.classList.toggle("active");
}

function clickedImage(target) {
    const modal = body.querySelector("div.modal");
    const modalImg = modal.querySelector("img.gallary-img");
    if (target.classList.contains("gallary-item")) {
        $(modal).css({ "display": "flex", "align-items": "center", "flex-wrap": "wrap" })
            .hide().fadeIn();
        [header, topbtn, closeBtn].forEach((el, i) => {
            removeOrAdd((i === 2 ? "add" : "remove"), el, "on");
        });
        modalImg.src = target.children[0].src;
        modalImg.alt = target.children[0].alt;
        body.classList.add("stop-scrolling");
    } else if (target.className === "close on") {
        [header, topbtn].forEach(el => removeOrAdd("add", el, "on"));
        [target, modalImg].forEach((el, i) => removeOrAdd("remove", el, (i === 0 ? "on" : "zoom")));
        $(modal).fadeOut();
        body.classList.remove("stop-scrolling");
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

function clickedDetail(e) {
    const target = e.closest(".detail-btn");
    const child = target.closest(".card").querySelector(".detail");
    child.classList.toggle("active");
}