var songbar = document.querySelector('.songBar');
var bar = document.querySelector('.dragBar');
var barfather = document.querySelector('.barContainer');
var songContainer = document.querySelector('.songContainer')	;
var songPanel = document.querySelector('.songPanel');
 bar.onmousedown = function(ev){
        let disY = ev.pageY - bar.offsetTop;

        document.onmousemove = function(ev){
            let t = ev.pageY - disY;

            if(t < 0){
                t = 0;
            }else if(t > barfather.clientHeight - bar.clientHeight){
                t = barfather.clientHeight - bar.clientHeight;
            }

            let scale = t /  (barfather.clientHeight - bar.clientHeight);
            
            songPanel.style.top =  scale *  (songContainer.offsetHeight - songPanel.scrollHeight) + 'px';
            bar.style.top = t + 'px';
        }
        document.onmouseup = function(){
            document.onmousemove = document.onmouseup = null;
        }
        return false;
    }

    addWheel(barfather,function(o){
        let t = bar.offsetTop;
        if(o){
            t -= 5;
        }else{
            t += 5;
        }

        if(t < 0){
            t = 0;
        }else if(t > barfather.clientHeight - bar.clientHeight){
            t = barfather.clientHeight - bar.clientHeight;
        }

        let scale = t /  (barfather.clientHeight - bar.clientHeight);
            
        songPanel.style.top =  scale *  (songContainer.offsetHeight - songPanel.scrollHeight) + 'px';


        bar.style.top = t + 'px';
    });


    function addWheel(obj,fn){
        obj.addEventListener('mousewheel',callback);
        obj.addEventListener('DOMMouseScroll',callback);

        function callback(ev){
            let o = true; //向上
            if(ev.wheelDelta){
                o = ev.wheelDelta > 0?true:false;
            }else{
                o = ev.detail < 0? true:false;
            }
            fn && fn(o);
            ev.preventDefault();
        }
    }