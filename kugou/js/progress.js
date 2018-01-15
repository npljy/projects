window.onload = function(){
    var myaudio = document.getElementById("myaudio");
    // 播放按钮
    var toggle = document.getElementById("toggle");
    var dura = document.getElementById("duration");
    var barControl = document.querySelector(".barControl");
    var bar = document.getElementById("bar");
    var volume = document.querySelector(".volume");
    var volumePanel = document.querySelector(".volumePanel");
    var volumeDot = document.querySelector(".volumeDot");
    var volumeLong = document.querySelector(".volumeLong");
    var currentVol =  document.querySelector(".currentVol");
    var volumeClick = document.querySelector(".volumeClick");
    var songContainer = document.querySelector(".songContainer");
    var songPanel = document.querySelector(".songPanel");
    var barDot = document.querySelector(".barDot");
    var barCurTime = document.querySelector(".barCurTime");
    var barContainer = document.querySelector(".barContainer");
    var dragBar = document.querySelector(".dragBar");
    var songName = document.querySelector(".songName");
    var albumName = document.querySelector(".albumName");
    var singerName = document.querySelector(".singerName");
    var barName =  document.querySelector(".barName");
    var x = myaudio.duration;
    var songPs = null;
    var add = 60;//歌词调整，加快减少时间，默认60秒
    var scale = 0;
    var volscale = 0.5;
    var onoff = false;

    myaudio.volume = 0.5;//声音默认是 50%
    dura.lastElementChild.innerText = totime(x);
    toggle.onclick = function(){
        onoff = !onoff; //保存播放状态
        myaudio.paused ?  myaudio.play() : myaudio.pause();
        toggle.classList.toggle("play");
    }

    // var songName = document.querySelector(".songName");
    // var albumName = document.querySelector(".albumName");
    // var singerName = document.querySelector(".singerName");


    info();
    //  方法：写入歌曲信息
    function info(id=3){
        songName.innerHTML = "<span>"+data[id]["songName"]+"</span>";
        albumName.innerHTML = "<span>专辑：</span>"+ (data[id]["albumName"] ? data[id]["albumName"] : data[id]["songName"] ) ;
        singerName.innerHTML = "<span>歌手：</span>"+ data[id]["singer"] ;
        var songStr = "";
        var  lrc = data[id]["Lyric"];
        for(a in lrc){
            songStr += "<p data-time="+a+">"+lrc[a]+"</p>"
        }
        songPanel.innerHTML = songStr;
    }

// 歌词自定义滚动条
// barContainer  dragBar 
// dragBar.onmousedown = function(){}


// 监听timeupdate，计算播放进度
    myaudio.addEventListener("timeupdate",function(){
        barDot.style.left = this.currentTime/x*(bar.clientWidth - barDot.offsetWidth)+"px";
        barCurTime.style.width = this.currentTime/x * bar.clientWidth + "px";
        dura.firstElementChild.innerText = totime(this.currentTime);    
        (this.currentTime == x || myaudio.ended) && toggle.classList.remove("play");  

        // 获取到每个p的dataset.time
        songPs = Array.from(songPanel.querySelectorAll("p"));
        songPs.forEach((e,i) => {
            if(e.dataset.time == totime(this.currentTime)){
                songPs.forEach((es)=>es.style.color="");
                e.style.color = "blue";
                // 将当前歌词保持在中间
                songPanel.style.top = i < 5 ? 0 : - e.offsetHeight*(i-5) +"px";
            }
        });
    });
   
    // 拖动进度条
    barDot.onmousedown = function(){
        document.onmousemove =function(em){
            scale = (em.pageX - bar.getBoundingClientRect().left-10)/(bar.clientWidth - barDot.offsetWidth);
            scale <= 0 && (scale = 0);
            scale >= 1 && (scale = 1);
            barCurTime.style.width = scale * (bar.clientWidth - barDot.offsetWidth) + "px";
            barDot.style.left = scale * (bar.clientWidth - barDot.offsetWidth) + "px";
            myaudio.currentTime = scale * x;
            myaudio.pause();
            songPanel.style.top = scale * (songContainer.offsetHeight - songPanel.offsetHeight)>-260 ? songPanel.style.top = 0 : scale * (songContainer.offsetHeight - songPanel.offsetHeight) +"px";
            return false;
        }
        document.onmouseup = function(){
            onoff ? myaudio.play() : myaudio.pause() ;
            document.onmouseup = document.onmousemove = null;
            return false;
        }
        return false;
    }

    // 点击进度条
    barControl.onmousedown = function(ed){
        scale = (ed.pageX - this.getBoundingClientRect().left - 6)/(bar.clientWidth - barDot.offsetWidth);
        barDot.style.left = scale * (bar.clientWidth - barDot.offsetWidth) + "px";
        barCurTime.style.width = scale * (bar.clientWidth - barDot.offsetWidth) + "px";
        myaudio.currentTime = scale * x;
        songPanel.style.top = scale * (songContainer.offsetHeight - songPanel.offsetHeight)>-260 ? songPanel.style.top = 0 : scale * (songContainer.offsetHeight - songPanel.offsetHeight) +"px";
        return false;
    }

    // 控制声音
    volume.onclick = function(){
        myaudio.muted = myaudio.muted ? false : true;
        myaudio.muted ? this.firstElementChild.style.backgroundPosition = "-144px -195px" : this.firstElementChild.style.backgroundPosition = "-64px -195px";
    }
    volume.onmouseover = function(){
        volumePanel.style.display = "block";
    }
    volume.onmouseout = function(){
        volumePanel.style.display = "none";
    }
    volumePanel.onmouseover = function(){
        this.style.display = "block";
    }
    volumePanel.onmouseout = function(){
        this.style.display = "none";
    }
    volumeDot.onmousedown = function(){
        volumePanel.onmousemove = function(ev){
            volscale = (ev.pageY - volumeLong.getBoundingClientRect().top)/(volumeLong.offsetHeight-volumeDot.offsetHeight);
            volscale <= 0 && (volscale = 0);
            volscale >= 1 && (volscale = 1);
            console.log(volscale)
            volumeDot.style.top = volscale * (volumeLong.offsetHeight-volumeDot.offsetHeight) + "px";
            currentVol.style.height = volscale * (volumeLong.offsetHeight-volumeDot.offsetHeight) +5+ "px";
            myaudio.volume = (1-volscale).toFixed(1);
            return false;
        }
        document.onmouseup = function(){
            document.onmouseup = volumePanel.onmousemove = null;
            return false;
        }
        return false;
    }

    volumeClick.onmousedown = function(ev){
        volscale = (ev.pageY - volumeLong.getBoundingClientRect().top)/this.offsetHeight;
        volscale <= 0 && (volscale = 0);
        volscale >= 1 && (volscale = 1);
        volumeDot.style.top = volscale * this.offsetHeight + "px";
        currentVol.style.height = volscale * this.offsetHeight +5+ "px";
        myaudio.volume = (1-volscale).toFixed(1);
        return false; 
    }
    
}