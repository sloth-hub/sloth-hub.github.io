const body = document.querySelector("body");
const header = document.querySelector("header");
const gallary = document.querySelector("div.gallary");
const closeBtn = document.querySelector("span.close");
const modal = document.querySelector("div.modal");
const modalImg = modal.querySelector("img.gallary-img");

init();

function init() {
    clickedImage();
    window.addEventListener("scroll", scrollHeader);
}

function scrollHeader() {
    if (pageYOffset >= 70) {
        header.classList.add("on");
    } else {
        header.classList.remove("on");
    }
}

function clickedImage() {

    gallary.addEventListener("click", ({ target }) => {
        if (target.className == "gallary-item") {
            $(modal).css({ "display": "flex", "align-items": "flex-start" })
                .hide()
                .fadeIn();
            header.classList.remove("on");
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
        $(modal).fadeOut();
    });

}