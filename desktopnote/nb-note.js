function moveNote(ev,obj){
    var dx = ev.pageX-obj.offsetLeft;
    var dy = ev.pageY-obj.offsetTop;
    document.onmousemove = function(em){
        obj.style.left = em.pageX - dx +"px";
        obj.style.top = em.pageY - dy +"px";
        return false;
    }
    document.onmouseup = function(){
        document.onmousemove = null;
    }
}

function autosize(obj,tit,mv){
    document.onmousemove = function(){
        tit.style.width = obj.offsetWidth+"px";
        tit.nextElementSibling.style.width = obj.offsetWidth+"px";
        mv.style.width = obj.offsetWidth-200+"px"
    }
    document.onmouseup = function(){
        document.onmousemove = null;
    }
}