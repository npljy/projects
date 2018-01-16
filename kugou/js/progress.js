window.onload = function () {
    var content = document.getElementById("content");
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
    var currentVol = document.querySelector(".currentVol");
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
    var barName = document.querySelector(".barName");
    var lists = document.querySelector(".playerList ul");
    var albumImg = document.querySelector(".albumImg img");
    var playerImg = document.querySelector(".playerImg img");
    var blurbg = document.querySelector(".blurbg");
    var albumDown = document.querySelector(".albumDown a");
    var listNum = document.querySelector(".share span");
    var mode = document.querySelector(".mode");
    var modePanel = document.querySelector(".modePanel");
    var modeLis = Array.from(document.querySelectorAll(".modePanel li"));

    var playMode = "sx";
    var x = myaudio.duration;
    var nowSong = 0;
    var listSong = null;
    var songPs = null;
    var add = 60;//歌词调整，加快减少时间，默认60秒
    var scale = 0;
    var volscale = 0.5;
    var onoff = false;
    var listStr = "";
    var curSong = 3;// 记录当前播放的歌曲，点击上一首下一首的时候使用
    // --xc ↓--
    let listOpenBtn = document.querySelector('.download span');
    let list = document.querySelector('#list');
    let listClose = document.querySelector('.list-menu-icon-close');
    let listCount = document.querySelector('.count');
    let boxList = document.querySelector('.box-list');
    let lis = null;
    let zhuan = document.getElementById('zhuan');
    let btnPre = document.getElementById('prev');
    let btnNext = document.getElementById('next');
    let num = data.length;
    // --xc ↑--
    myaudio.volume = 0.5;//声音默认是 50%
    set(content);
    window.onresize = function(){
        set(content);
    }
    renderList();
    lis = Array.from(boxList.querySelectorAll("li"));
    info(nowSong);
    //  方法：写入歌曲信息
    function info(idx) {
        document.title = "当前歌曲：" + data[idx]["songName"];
        myaudio.src = data[idx].songUrl;
        blurbg.style.background = 'url(' + data[idx]["songPicture"] + ')';
        albumImg.src = data[idx]["songPicture"];
        playerImg.src = data[idx]["songPicture"];
        barName.innerText = data[idx]["songName"];
        songName.innerHTML = "<span>" + data[idx]["songName"] + "</span>";
        albumName.innerHTML = "<span>专辑：</span>" + (data[idx]["albumName"] ? data[idx]["albumName"] : data[idx]["songName"]);
        singerName.innerHTML = "<span>歌手：</span>" + data[idx]["singer"];
        var songStr = "";
        var lrc = data[idx]["Lyric"];
        for (a in lrc) {
            songStr += "<p data-time=" + a + ">" + lrc[a] + "</p>"
        }
        songPanel.innerHTML = songStr;
        myaudio.addEventListener("canplay", function () {
            x = myaudio.duration;
            dura.lastElementChild.innerText = totime(x);
        })
        // 下载
        albumDown.onclick = function () {
            window.open(myaudio.src);
        }

        listNum.innerText = data.length;
        lis.forEach(e=>e.classList.remove("active"));
        lis[nowSong].classList.add("active");
    }

    // 播放暂停
    toggle.onclick = function () {
        onoff = !onoff; //保存播放状态
        myaudio.paused ? myaudio.play() : myaudio.pause();
        toggle.classList.toggle("play");
        zhuan.classList.toggle("Rotation");
    }

    // 监听timeupdate，计算播放进度
    myaudio.addEventListener("timeupdate", function () {
        barDot.style.left = this.currentTime / x * (bar.clientWidth - barDot.offsetWidth) + "px";
        barCurTime.style.width = this.currentTime / x * bar.clientWidth + "px";
        dura.firstElementChild.innerText = totime(this.currentTime);
        // 获取到每个p的dataset.time
        songPs = Array.from(songPanel.querySelectorAll("p"));
        songPs.forEach((e, i) => {
            if (e.dataset.time == totime(this.currentTime)) {
                songPs.forEach((es) => es.style.color = "");
                e.style.color = "blue";
                // 将当前歌词保持在中间
                songPanel.style.top = i < 5 ? 0 : - e.offsetHeight * (i - 5) + "px";
            }
        });
    });
    myaudio.addEventListener("ended", function () {
        toggle.classList.remove("play"); 
        zhuan.classList.remove("Rotation") ;
        // 播放模式
        playModeFn(playMode);
        onoff ? myaudio.play() : myaudio.pause();
        onoff ? toggle.classList.add("play") : toggle.classList.remove("play");
        onoff ? zhuan.classList.add("Rotation") : zhuan.classList.remove("Rotation");
    })

    // ----播放模式 控制 ↓
    // 播放模式控制
    function playModeFn(playMode){
        if(playMode == "sj"){ //随机
            nowSong = randNum(nowSong);
            info(nowSong);
        }
        else if(playMode == "loop"){ //单曲循环
        }
        else{//列表循环
            // nowSong 自加
            nowSong++;
            nowSong = nowSong > data.length - 1 ? 0 : nowSong;
            info(nowSong);
        }
    }   
    // ----播放模式控制 ↑
    // 阻止list冒泡
    list.onclick = function(el){
        el.stopPropagation ? el.stopPropagation() : el.cancelBubble = true;
    }
    // --xc ↓--
    //列表开关
    listOpenBtn.onclick = (ec) => {
        ec.stopPropagation ? ec.stopPropagation() : ec.cancelBubble = true;
        volumePanel.style.display = "none";
        modePanel.style.display = "none";
        list.style.display == "block" ? list.style.display = "none" : list.style.display = "block";
        listClose.onclick = () => {
            list.style.display = "none";
        }
        boxList.onclick = function (ev) {
            if (ev.target.tagName === 'LI') {
                //大清洗
                let lis = Array.from(boxList.children);
                lis = lis.map(e => e.className = '');
                ev.target.className = 'active';
            }
        }
        //li双击播放
        for (var i = 0; i < lis.length; ++i) {
            lis[i].dataset.idx = i;
            lis[i].ondblclick = function (e) {//双击播放该音乐
                e.preventDefault();
                onoff = true;
                nowSong = this.dataset.idx;
                for (var j = 0; j < lis.length; ++j) {
                    lis[j].className = '';
                }
                this.className = 'active';
                info(this.dataset.idx);
                myaudio.play();
                toggle.classList.add("play");
                zhuan.classList.add("Rotation");
            }
        }
        keys();
        ge();
    }
    ge();
    function ge() {
        //下一首
        btnNext.onclick = function () {//下一首
            if(playMode == "sx") nowSong++;
            if(playMode == "loop") nowSong = nowSong;
            if(playMode == "sj") nowSong = randNum(nowSong);
            nowSong = nowSong > data.length - 1 ? 0 : nowSong
            info(nowSong);
            onoff ? myaudio.play() : myaudio.pause();
            onoff ? toggle.classList.add("play") : toggle.classList.remove("play");
            onoff ? zhuan.classList.add("Rotation") : zhuan.classList.remove("Rotation");
        }
        //上一首
        btnPre.onclick = function () {//上一首
            if(playMode == "sx") nowSong--;
            if(playMode == "loop") nowSong = nowSong;
            if(playMode == "sj") nowSong = randNum(nowSong);
            nowSong = nowSong < 0 ? data.length - 1 : nowSong
            info(nowSong);
            onoff ? myaudio.play() : myaudio.pause();
            toggle.classList.add("play");
            zhuan.classList.add("Rotation");
        }
    }

    //上移、下移、删除、全部删除
    function keys() {
        //批量删除
        let delAll = document.querySelector('.delAll');
        delAll.onclick = () => {
            if (!confirm("确定要全部删除吗？")) {
                return;
            }
            boxList.innerHTML = "";
            listCount.innerHTML = 0;
            clearAll();
        }
    }
    //列表渲染
    function renderList() {
        let html = '';
        for (var i = 0; i < data.length; i++) {
            if (data[i].inlist == 1)
                html += `
					<li >
		        		<div class="fl clear" style="width: 200px;">
		        			<span>${data[i].id + 1}</span>
		    				<span>${data[i].songName}</span>
		        		</div>
		        		<div class="list-btn">
		        			<span class="up fl" >▲</span>
							<span class="down fl">▼</span>
							<span class="icon del delBtn"></span>
		        		</div>
		    			<div class="fr clear">
		    				<span class="fl">${data[i].singer}</span>
		    				<span class="fl">${data[i].songTime}</span>
		    			</div>
		        	</li>	
			`;
        }
        boxList.innerHTML = html;
        listCount.innerHTML = num;
    }

    // 添加清空方法
    function clearAll() {
        data.length = 0;
        myaudio.src = "";
        blurbg.style.css = "background:url('')";
        albumImg.src = "";
        playerImg.src = "";
        songName.innerHTML = "";
        albumName.innerHTML = "";
        singerName.innerHTML = "";
        songPanel.innerHTML = "";
        listNum.innerText = 0;
    }
    // --xc ↑--

    // 拖动进度条
    barDot.onmousedown = function () {
        document.onmousemove = function (em) {
            scale = (em.pageX - bar.getBoundingClientRect().left - 10) / (bar.clientWidth - barDot.offsetWidth);
            scale <= 0 && (scale = 0);
            scale >= 1 && (scale = 1);
            barCurTime.style.width = scale * (bar.clientWidth - barDot.offsetWidth) + "px";
            barDot.style.left = scale * (bar.clientWidth - barDot.offsetWidth) + "px";
            myaudio.currentTime = scale * x;
            myaudio.pause();
            songPanel.style.top = scale * (songContainer.offsetHeight - songPanel.offsetHeight) > -260 ? songPanel.style.top = 0 : scale * (songContainer.offsetHeight - songPanel.offsetHeight) + "px";
            return false;
        }
        document.onmouseup = function () {
            onoff ? myaudio.play() : myaudio.pause();
            document.onmouseup = document.onmousemove = null;
            return false;
        }
        return false;
    }

    // 点击进度条
    barControl.onmousedown = function (ed) {
        scale = (ed.pageX - this.getBoundingClientRect().left - 6) / (bar.clientWidth - barDot.offsetWidth);
        barDot.style.left = scale * (bar.clientWidth - barDot.offsetWidth) + "px";
        barCurTime.style.width = scale * (bar.clientWidth - barDot.offsetWidth) + "px";
        myaudio.currentTime = scale * x;
        songPanel.style.top = scale * (songContainer.offsetHeight - songPanel.offsetHeight) > -260 ? songPanel.style.top = 0 : scale * (songContainer.offsetHeight - songPanel.offsetHeight) + "px";
        return false;
    }

    // 控制声音
    volume.onclick = function (ev) {
        ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
        myaudio.muted = myaudio.muted ? false : true;
        myaudio.muted ? this.firstElementChild.style.backgroundPosition = "-144px -195px" : this.firstElementChild.style.backgroundPosition = "-64px -195px";
    }
    volume.onmouseover = function () {
        list.style.display = "none";
        modePanel.style.display = "none";
        volumePanel.style.display = "block";
    }
    volume.onmouseout = function () {
        volumePanel.style.display = "none";
    }
    volumePanel.onmouseover = function () {
        this.style.display = "block";
    }
    volumePanel.onmouseout = function () {
        this.style.display = "none";
    }
    volumeDot.onmousedown = function () {
        volumePanel.onmousemove = function (ev) {
            volscale = (ev.pageY - volumeLong.getBoundingClientRect().top) / (volumeLong.offsetHeight - volumeDot.offsetHeight);
            volscale <= 0 && (volscale = 0);
            volscale >= 1 && (volscale = 1);
            volumeDot.style.top = volscale * (volumeLong.offsetHeight - volumeDot.offsetHeight) + "px";
            currentVol.style.height = volscale * (volumeLong.offsetHeight - volumeDot.offsetHeight) + 5 + "px";
            myaudio.volume = (1 - volscale).toFixed(1);
            return false;
        }
        document.onmouseup = function () {
            document.onmouseup = volumePanel.onmousemove = null;
            return false;
        }
        return false;
    }

    volumeClick.onmousedown = function (ev) {
        volscale = (ev.pageY - volumeLong.getBoundingClientRect().top) / this.offsetHeight;
        volscale <= 0 && (volscale = 0);
        volscale >= 1 && (volscale = 1);
        volumeDot.style.top = volscale * this.offsetHeight + "px";
        currentVol.style.height = volscale * this.offsetHeight + 5 + "px";
        myaudio.volume = (1 - volscale).toFixed(1);
        return false;
    }
    // 播放模式菜单
    document.onclick = function(){
        modePanel.style.display = "none";
        list.style.display = "none";
        volumePanel.style.display = "none";
    }
    mode.onclick = function(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        volumePanel.style.display = "none";
        list.style.display = "none";
        modePanel.style.display == "block" ? modePanel.style.display = "none" : modePanel.style.display = "block";
    }
   
    modePanel.onmouseover = function () {
        this.style.display = "block";
    }
    modePanel.onmouseout = function () {
        this.style.display = "none";
    }

    /**
     *  播放模式 playMode赋值，
     *  点击html中的循环模式，给playMode 赋相对应的值 ， 
     *  列表循环  sx   ， 随机  sj  ， 单曲循环 loop
     */
    modeLis.forEach(e=>{
        e.onclick = function(){
            myaudio.loop = false;
            modeLis.forEach(el=>{
                el.classList.remove("act");
                el.firstElementChild.classList.remove("act");
            });
            playMode = this.dataset.mode;
            this.classList.add("act");
            this.firstElementChild.classList.add("act");
            mode.firstElementChild.style.background = getComputedStyle(this.firstElementChild).background;
            modePanel.style.display = "none";
        }
    });

}   