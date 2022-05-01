const body = document.querySelector("body");
const header = document.querySelector("header");
const gallary = document.querySelector("div.gallary");
const closeBtn = document.querySelector("span.close");
const modal = document.querySelector("div.modal");
const modalImg = modal.querySelector("img.gallary-img");
const topbtn = document.querySelector("a.top");
const toggleBar = document.querySelector("div.toggle-bar");
const navmenu = document.querySelector("ul.nav-menu");

init();

function init() {
    window.addEventListener("scroll", scrollHeader);
    AOS.init();
    skillsScrollAnimate();
    clickedToggleBar();
    clickedImage();
}

function scrollHeader() {
    if (pageYOffset >= 70) {
        header.classList.add("on");
        topbtn.classList.add("on");
    } else {
        header.classList.remove("on");
        topbtn.classList.remove("on");
    }
}

function skillsScrollAnimate() {
    window.addEventListener('scroll', function () {
        const skills = document.querySelectorAll("circle.skillbar");
        if (window.scrollY >= 1500 && window.scrollY <= 2800) {
            skills.forEach((e) => {
                e.classList.add("circle_animation");
            });
        } else {
            skills.forEach((e) => {
                e.classList.remove("circle_animation");
            });
        };
    });
}

function clickedToggleBar() {
    toggleBar.addEventListener("click", ()=>{
        navmenu.classList.toggle("show");
        header.classList.toggle("active");
    });
}

function clickedImage() {

    gallary.addEventListener("click", ({ target }) => {
        if (target.classList.contains("gallary-item")) {
            $(modal).css({ "display": "flex", "align-items": "flex-start" })
            .hide()
            .fadeIn();
            header.classList.remove("on");
            topbtn.classList.remove("on");
            body.style.overflow = "hidden";
            modalImg.src = target.children[0].src;
            modalImg.alt = target.children[0].alt;
        }
    });
    zoomInImage();
    closedImage();

}

function zoomInImage() {

    modalImg.addEventListener("click", ({ target }) => {
        target.classList.toggle("zoom");
    });

}

function closedImage() {

    closeBtn.addEventListener("click", () => {
        modalImg.classList.remove("zoom");
        body.style.overflow = "overlay";
        header.classList.add("on");
        topbtn.classList.add("on");
        $(modal).fadeOut();
    });

}