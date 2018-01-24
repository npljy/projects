window.onload = function(){
    var papers = document.querySelectorAll(".paper");
    document.onclick = function(){
        console.log(papers[0].style.transform) 
        papers[0].style.transform = "rotateY(180deg)";
        setTimeout(function(){
            papers[0].querySelector(".leftPage").style.zIndex = "10";
            papers[0].querySelector(".rightPage").style.zIndex = "20";
        },250);
    }


}