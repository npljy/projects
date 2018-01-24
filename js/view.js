window.onload = function(){
    setMain();

    var onoff = false;
    var papers = Array.from(document.querySelectorAll(".paper"));
    papers.forEach((e,i)=>{
        e.style.zIndex = papers.length-1-i;
        // if(i == papers.length-1)return;
        e.onclick = function(){
            turnPage(e,i);
        }
    });
   
    function turnPage(e,i){
        var timer = null;
        var timer2 = null;
        if(!onoff){
            onoff = true;
            if(!e.dataset.click || e.dataset.click == "no"){
                var numY = 0;
                var numZ = 0;
                papers.forEach(e =>e.style.left = "50%");
                if(i==papers.length-1)papers.forEach(e =>e.style.left = "67%");
                e.dataset.click = "yes";
                timer = setInterval(function(){
                    numY++;
                    numZ = parseFloat(numZ.toFixed(2)) + 0.1;
                    if(numY > 90){clearInterval(timer)};
                    e.style.transform = "rotateY("+ (-numY) +"deg) skewY("+ (-numZ) +"deg)";
                },10);
                setTimeout(function(){
                    numZ = parseFloat(numZ.toFixed(2)) - 0.1;
                    timer2 = setInterval(function(){
                        numZ = parseFloat(numZ.toFixed(2)) - 0.1;
                        e.style.transform = "rotateY("+ (-numY) +"deg) skewY("+ (-numZ) +"deg)";
                        numY++;
                        if(numY > 180 ){clearInterval(timer2)};
                    },10);
                    setTimeout(function(){
                        getComputedStyle(e).zIndex == i ? e.style.zIndex = papers.length-1-i : e.style.zIndex = i ;
                        e.querySelector(".leftPage").classList.toggle("act");
                    },10);
                    setTimeout(function(){
                        onoff = false;
                    },500);
                },1000)
            }
            else{
                var numY = 180;
                var numZ = 0;
                e.dataset.click = "no";
                papers.forEach(e =>e.style.left = "50%");
                if(i==0)papers.forEach(e =>e.style.left = "30%");
                timer = setInterval(function(){
                    numY--;
                    numZ = parseFloat(numZ.toFixed(2)) + 0.1;
                    if(numY < 90){clearInterval(timer)};
                    e.style.transform = "rotateY("+ (-numY) +"deg) skewY("+ (-numZ) +"deg)";
                },10);
                setTimeout(function(){
                    numZ = parseFloat(numZ.toFixed(2)) - 0.1;
                    timer2 = setInterval(function(){
                        numZ = parseFloat(numZ.toFixed(2)) - 0.1;
                        e.style.transform = "rotateY("+ (-numY) +"deg) skewY("+ (-numZ) +"deg)";
                        numY--;
                        if(numY < 0 ){clearInterval(timer2)};
                    },10);
                    setTimeout(function(){
                        getComputedStyle(e).zIndex == i ? e.style.zIndex = papers.length-i : e.style.zIndex = i ;
                        e.querySelector(".leftPage").classList.toggle("act");
                    },10);
                    setTimeout(function(){
                        onoff = false;
                    },500);
                },1000)

            }

        }
    }






}