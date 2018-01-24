function setMain() {
    var main = document.querySelector(".main");
    var nav = document.querySelector(".nav");
    var imgs = Array.from(main.querySelectorAll("img"));
    var rightPage = Array.from(main.querySelectorAll(".rightPage"));
    var leftPage = Array.from(main.querySelectorAll(".leftPage"));
    var reheight = document.documentElement.clientHeight;
    var rewidth = document.documentElement.clientWidth;
    main.style.height = reheight < 600 ? 600 : reheight + "px";
    main.style.width = rewidth < 600 ? 600 : rewidth + "px";
   
    imgs.forEach(ea => {
        ea.onmousemove = function(){
            return false;
        }
        ea.style.height = reheight < 600 ? 600-102 : reheight-102 + "px";
        ea.style.width = reheight < 600 ? (600-100)*5/7-2 : (reheight-100)*5/7-2 + "px";
    });
    leftPage.forEach(ea=>{
        ea.style.height = reheight < 600 ? 600-100 : reheight-100 + "px";
        ea.style.width = reheight < 600 ? (600-100)*5/7 : (reheight-100)*5/7 + "px";
        ea.parentElement.style.left = "33%";
        ea.parentElement.style.height = reheight < 600 ? 600-100 : reheight-100 + "px";
        ea.parentElement.style.width = reheight < 600 ? (600-100)*5/7 : (reheight-100)*5/7 + "px";
    });
    rightPage.forEach(ea=>{
        ea.style.height = reheight < 600 ? 600-100 : reheight-100 + "px";
        ea.style.width = reheight < 600 ? (600-100)*5/7 : (reheight-100)*5/7 + "px";
        ea.parentElement.style.left = "33%";
        ea.parentElement.style.height = reheight < 600 ? 600-100 : reheight-100 + "px";
        ea.parentElement.style.width = reheight < 600 ? (600-100)*5/7 : (reheight-100)*5/7 + "px";
    });
    window.onresize = function () {
        reheight = document.documentElement.clientHeight;
        rewidth = document.documentElement.clientWidth;
        main.style.height = reheight < 600 ? 600 : reheight + "px";
        main.style.width = rewidth < 600 ? 600 : rewidth + "px";
        
        imgs.forEach(eb =>{
            eb.style.height = reheight < 600 ? 600-102 : reheight-102 + "px";
            eb.style.width = reheight < 600 ? (600-100)*5/7-2 : (reheight-100)*5/7-2 + "px";
        });
        leftPage.forEach(eb=>{
            eb.style.height = reheight < 600 ? 600-100 : reheight-100 + "px";
            eb.style.width = reheight < 600 ? (600-100)*5/7 : (reheight-100)*5/7 + "px";

            eb.parentElement.style.height = reheight < 600 ? 600-100 : reheight-100 + "px";
            eb.parentElement.style.width = reheight < 600 ? (600-100)*5/7 : (reheight-100)*5/7 + "px";
        });
        rightPage.forEach(eb=>{
            eb.style.height = reheight < 600 ? 600-100 : reheight-100 + "px";
            eb.style.width = reheight < 600 ? (600-100)*5/7 : (reheight-100)*5/7 + "px";

            eb.parentElement.style.height = reheight < 600 ? 600-100 : reheight-100 + "px";
            eb.parentElement.style.width = reheight < 600 ? (600-100)*5/7 : (reheight-100)*5/7 + "px";
        });
    }
}