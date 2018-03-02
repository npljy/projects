window.onload=function(){
	
	let listOpenBtn=document.querySelector('.download span');
	let list=document.querySelector('#list');
	let listClose=document.querySelector('.list-menu-icon-close');
	let listCount=document.querySelector('.count');
	let boxList=document.querySelector('.box-list');
	let audio = document.getElementById('music1');
	let toggle = document.getElementById('toggle');
	let zhuan = document.getElementById('zhuan');
	let btnPre = document.getElementById('prev');
    let btnNext = document.getElementById('next');
    let mode=document.querySelector('.mode span');
	let num=data.length;

	//列表开关
	listOpenBtn.onclick=()=>{	
		list.style.display="block";
		
		listClose.onclick=()=>{
			list.style.display="none";
		}
		
		renderList();
		

		
		boxList.onclick=function(ev){
			if(ev.target.tagName === 'LI'){
                //打清洗
                let lis = Array.from(boxList.children);
                lis = lis.map(e=>e.className='');
                ev.target.className = 'active';
                
			}
		}
		
		
		//li双击播放
		let lis=document.querySelectorAll('li');
		for(var i = 0 ; i < lis.length ; ++i){
			lis[i].index=i;
            lis[i].ondblclick = function(e){//双击播放该音乐
                e.preventDefault();
                music1.src = data[this.index].songUrl;
                console.log(music1.src);
                for(var j = 0 ; j < lis.length ; ++j){
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
	
	function ge(){
		
		let index=0;//初始化歌曲所在位置
		//下一首
		btnNext.onclick = function(){//下一首
			index++;
	        if(index >data.length-1){//判断是否为最后一首，然后循环播放
	            index = 0;
	        }
	        
	        console.log(index);
	        audio.src = data[index].songUrl;//切换到下一首
	        playMusic()
	    }
		
		//上一首
	    btnPre.onclick = function(){//上一首
	    	index--;
	        if(index < 0){//判断是否为第一首首，然后循环播放
	            index = data.length-1;
	        }
	        
	        console.log(index);
	        audio.src = data[index].songUrl;//切换到上一首
	        playMusic()
	    }
	}
	
	//上移、下移、删除、全部删除
	function keys(){
		
		//处理上移
		var upBtn=document.querySelectorAll('.up');
		for (var i=0;i<upBtn.length;i++) {
			upBtn[i].onclick=function(){
			
				var thisLi = this.parentNode.parentNode;
		        var prevLi = thisLi.previousElementSibling;
		
		        if(!prevLi){
		            //如果没有上一个兄弟节点了  直接跳出函数
		            return;
		        }
		
		        //对换id
		        var a = thisLi.children[0].children[0].innerHTML;
		        var b = prevLi.children[0].children[0].innerHTML;
		
		        thisLi.children[0].children[0].innerHTML = b;
		        prevLi.children[0].children[0].innerHTML = a;
		
		      boxList.insertBefore(thisLi,prevLi);
		
			}
		}
		
		//下移
		var downBtn=document.querySelectorAll('.down');
		for (var i=0;i<downBtn.length;i++) {
			downBtn[i].onclick=function(){
			
				var thisLi=this.parentNode.parentNode;
				var nextLi=thisLi.nextElementSibling;
				
				if(!nextLi){
					return;
				}
				
				//对换id
				var a=thisLi.children[0].children[0].innerHTML;
				var b=nextLi.children[0].children[0].innerHTML;
				
				thisLi.children[0].children[0].innerHTML=b;
				nextLi.children[0].children[0].innerHTML=a;
				
				boxList.insertBefore(thisLi,nextLi.nextElementSibling);
				
			}
		}
		
		//删除
        let delBtn = boxList.querySelectorAll('.delBtn');
        for (var i=0;i<delBtn.length;i++) {
        	delBtn[i].onclick=function(){
        		this.parentNode.parentNode.remove();
        		 num--;
        		 listCount.innerHTML=num;
        		 
        		 //重置id
		          let lis = document.querySelectorAll('li');
		
		          let n = 0;
		          for(var i=0;i<lis.length;i++){
		              lis[i].children[0].children[0].innerHTML = ++n;
		          }
		          data[i].id = ++n;
        	}	
        	
        	
        }
        
        
        //批量删除
    	let	delAll=document.querySelector('.delAll'); 
	    delAll.onclick=()=>{
	    	if(!confirm("确定要全部删除吗？")){
			 	return ;
			}  
			let lis=document.querySelectorAll('li');
			for (var i=0;i<data.length;i++) {
				boxList.removeChild(lis[i]); 
			}	
			listCount.innerHTML=0;
	    }
	    
    }    
	
	//列表渲染
	function renderList () {
		
		let html='';
		for (var i=0;i<data.length;i++) {
			html+=`
					<li index="1">
		        		<div class="fl clear" style="width: 200px;">
		        			<span>${data[i].id+1}</span>
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
		        	
			`
		}
		
		boxList.innerHTML=html;
		
		listCount.innerHTML=num;
	}
	
	//音乐开关
	toggle.onclick = function(){
		playMusic();
	}
	//音乐播放封装函数
	function playMusic(){
		if(audio!==null){             
	    //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
	     //alert(audio.paused);
			if(audio.paused)                     {                 
	        	audio.play();//audio.play();// 这个就是播放  
	        	toggle.style.background = "url(imgs/btn.png) no-repeat 0px -60px";
	        	zhuan.classList.add ("Rotation");
			}else{
				audio.pause();// 这个就是暂停
				toggle.style.background = "url(imgs/btn.png) no-repeat 0px 0px";
				zhuan.classList.remove("Rotation");
			}
			
		} 
		
		
		music1.addEventListener("timeupdate",function(){
			if(music1.ended){
				toggle.style.background = "url(imgs/btn.png) no-repeat 0px 0px";
				zhuan.classList.remove("Rotation");
			}
		}	
		)
	}
		
	function rbf(){
		var audio = document.getElementById('music1'); 
		audio.currentTime = 0;
	}


	// 列表循环
	var indexs = 0;
	mode.onclick = function(){
		indexs++;
		if(indexs == 1){
			mode.style.background = "url(imgs/btn.png) no-repeat 0px -179px";
		}else if(indexs == 2){
			mode.style.background = "url(imgs/btn.png) no-repeat -128px -179px";
		}else if(indexs >= 3){
			mode.style.background = "url(imgs/btn.png) no-repeat -64px -179px";
			var indexs = 0;
			//indexs++;
		}
	}
}
