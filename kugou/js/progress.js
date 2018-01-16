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
    var lists = document.querySelector(".playerList ul");
    var albumImg = document.querySelector(".albumImg img");
    var x = myaudio.duration;
    var listSong = null;
    var songPs = null;
    var add = 60;//歌词调整，加快减少时间，默认60秒
    var scale = 0;
    var volscale = 0.5;
    var onoff = false;
    var listStr = "";
    var curSong = 3;// 记录当前播放的歌曲，点击上一首下一首的时候使用
    // --徐晨 ↓--
    let listOpenBtn = document.querySelector('.download span');
	let list = document.querySelector('#list');
	let listClose = document.querySelector('.list-menu-icon-close');
	let listCount = document.querySelector('.count');
	let boxList = document.querySelector('.box-list');
	let zhuan = document.getElementById('zhuan');
	let btnPre = document.getElementById('prev');
	let btnNext = document.getElementById('next');
	let num = data.length;
    // --徐晨 ↑--
    myaudio.volume = 0.5;//声音默认是 50%
    dura.lastElementChild.innerText = totime(x);
    toggle.onclick = function(){
        onoff = !onoff; //保存播放状态
        myaudio.paused ?  myaudio.play() : myaudio.pause();
        toggle.classList.toggle("play");
    }

    info();
    //  方法：写入歌曲信息
    function info(id=3){
        albumImg.src = data[id]["songPicture"];
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
// --徐晨 ↓--

	//列表开关
	listOpenBtn.onclick = () => {
		list.style.display = "block";
		listClose.onclick = () => {
			list.style.display = "none";
		}
		renderList();
		boxList.onclick = function (ev) {
			if (ev.target.tagName === 'LI') {
				//大清洗
				let lis = Array.from(boxList.children);
				lis = lis.map(e => e.className = '');
				ev.target.className = 'active';
			}
		}
		//li双击播放
		let lis = document.querySelectorAll('li');
		for (var i = 0; i < lis.length; ++i) {
			lis[i].index = i;
			lis[i].ondblclick = function (e) {//双击播放该音乐
				e.preventDefault();
				myaudio.src = data[this.index].songUrl;
				console.log(myaudio.src);
				for (var j = 0; j < lis.length; ++j) {
					lis[j].className = '';
				}
				this.className = 'active';
				playMusic();
			}
		}
		keys();
		ge();
	}
	ge();
	function ge() {
		let index = 0;//初始化歌曲所在位置
		//下一首
		btnNext.onclick = function () {//下一首
			index++;
			if (index > data.length - 1) {//判断是否为最后一首，然后循环播放
				index = 0;
			}
			console.log(index);
			myaudio.src = data[index].songUrl;//切换到下一首
			playMusic()
		}
		//上一首
		btnPre.onclick = function () {//上一首
			index--;
			if (index < 0) {//判断是否为第一首首，然后循环播放
				index = data.length - 1;
			}
			console.log(index);
			myaudio.src = data[index].songUrl;//切换到上一首
			playMusic()
		}
	}

	//上移、下移、删除、全部删除
	function keys() {
		//处理上移
		var upBtn = document.querySelectorAll('.up');
		for (var i = 0; i < upBtn.length; i++) {
			upBtn[i].onclick = function () {
				var thisLi = this.parentNode.parentNode;
				var prevLi = thisLi.previousElementSibling;
				if (!prevLi) {
					//如果没有上一个兄弟节点了  直接跳出函数
					return;
				}
				//对换id
				var a = thisLi.children[0].children[0].innerHTML;
				var b = prevLi.children[0].children[0].innerHTML;
				thisLi.children[0].children[0].innerHTML = b;
				prevLi.children[0].children[0].innerHTML = a;
				boxList.insertBefore(thisLi, prevLi);
			}
		}
		//下移
		var downBtn = document.querySelectorAll('.down');
		for (var i = 0; i < downBtn.length; i++) {
			downBtn[i].onclick = function () {
				var thisLi = this.parentNode.parentNode;
				var nextLi = thisLi.nextElementSibling;
				if (!nextLi) {
					return;
				}
				//对换id
				var a = thisLi.children[0].children[0].innerHTML;
				var b = nextLi.children[0].children[0].innerHTML;
				thisLi.children[0].children[0].innerHTML = b;
				nextLi.children[0].children[0].innerHTML = a;
				boxList.insertBefore(thisLi, nextLi.nextElementSibling);
			}
		}
		//删除
		let delBtn = boxList.querySelectorAll('.delBtn');
		for (var i = 0; i < delBtn.length; i++) {
			delBtn[i].onclick = function () {
				this.parentNode.parentNode.remove();
				num--;
				listCount.innerHTML = num;
				//重置id
				let lis = document.querySelectorAll('li');
				let n = 0;
				for (var i = 0; i < lis.length; i++) {
					lis[i].children[0].children[0].innerHTML = ++n;
				}
				data[i].id = ++n;
			}
		}
		//批量删除
		let delAll = document.querySelector('.delAll');
		delAll.onclick = () => {
			if (!confirm("确定要全部删除吗？")) {
				return;
			}
			let lis = document.querySelectorAll('li');
			for (var i = 0; i < data.length; i++) {
				boxList.removeChild(lis[i]);
			}
			listCount.innerHTML = 0;
		}
	}
	//列表渲染
	function renderList() {
		let html = '';
		for (var i = 0; i < data.length; i++) {
			html += `
					<li index="1">
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
	//音乐开关
	toggle.onclick = function () {
		playMusic();
	}
	//音乐播放封装函数
	function playMusic() {
		if (myaudio !== null) {
			//检测播放是否已暂停.myaudio.paused 在播放器播放时返回false.
			//alert(myaudio.paused);
			if (myaudio.paused) {
				myaudio.play();//myaudio.play();// 这个就是播放  
				toggle.style.background = "url(imgs/btn.png) no-repeat 0px -60px";
				zhuan.classList.add("Rotation");
			} else {
				myaudio.pause();// 这个就是暂停
				toggle.style.background = "url(imgs/btn.png) no-repeat 0px 0px";
				zhuan.classList.remove("Rotation");
			}
		}
		myaudio.addEventListener("timeupdate", function () {
			if (myaudio.ended) {
				toggle.style.background = "url(imgs/btn.png) no-repeat 0px 0px";
				zhuan.classList.remove("Rotation");
			}
		})
	}
	function rbf() {
		// var audio = document.getElementById('myaudio');
		audio.currentTime = 0;
	}
// --徐晨 ↑--

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