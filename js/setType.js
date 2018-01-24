function setMain() {
    var main = document.querySelector(".main");
    var imgs = Array.from(main.querySelectorAll("img"));
    main.style.height = document.documentElement.clientHeight + "px";
    imgs.forEach(ea => ea.style.heigt = document.documentElement.clientHeight + "px");
    window.onresize = function () {
        main.style.height = document.documentElement.clientHeight + "px";
        imgs.forEach(eb => {
            eb.style.height = document.documentElement.clientHeight + "px";
        });
    }
}