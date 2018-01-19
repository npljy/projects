var boxPane = document.getElementById("boxpane");

//生成图片
let ul = "<ul accessKey='0'>";
let uli = 0;
let lii = 0;

for(var i=0;i<20;i++){
	ul+=`<li accessKey='${lii}' class="ico_pic" style="background-image:url(images/${i+1}.jpg)"></li>`;
	if((i+1)%5==0){
		ul+="</ul>";
		boxPane.innerHTML += ul;
		uli++;
		ul= `<ul accessKey=${uli}>`;
        lii = 0;
        continue;
	}
	lii++;
}


var lisLi = document.querySelectorAll('.ico_pic');
for(var i=0;i<lisLi.length;i++){
	lisLi[i].onmouseover = function(ev){
		for(var j=0;j<lisLi.length;j++){
			if(ev.target.parentNode.accessKey == lisLi[j].parentNode.accessKey){
				animate(lisLi[j],{"width": 133,"height":451})
			}else if(ev.target.accessKey == lisLi[j].accessKey){
				animate(lisLi[j],{"width": 422,"height":68})
			}else{
				animate(lisLi[j],{"width": 133,"height":68})
			}
			animate(ev.target,{"width": 422,"height":451})

		}
		
	}
	lisLi[i].onmouseout = function(){
		for(var j=0;j<lisLi.length;j++){
			animate(lisLi[j],{"width": 190,"height":164})
		}
	}
}

//运动函数
function animate(obj, json,endFn) {
	//关闭定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
    	//定时器开关
		var flag = true;
        for (var k in json) {
			var gk = parseInt(getStyle(obj, k));
        	//计算步长 步长 = 目标位置 - 当前位置
			// var step = (json[k] - gk) / 5;
			var step = json[k] - gk;
			//步长取整
            // step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //盒子移动: 盒子现在的位置 + 步长取整
            obj.style[k] = gk + step + 'px';
   			//只要其中一个不满足条件，就不停止定时器
			if(gk != json[k]) {
				flag = false;
			}
        }
        
		//如果此时仍然为true 就说明真的都到达了
		if (flag) {
            clearInterval(obj.timer);
            //2秒后执行回调函数
          	setTimeout(function() {
				//判断是否有回调函数，有endFn 再执行回调函数
				endFn && endFn();
			}, 200)
        }
    }, 300);
}
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

