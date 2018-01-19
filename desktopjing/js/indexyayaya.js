function xiaokongl(){

//获取元素

const floorOne = t.$('.floorOne')[0], //地面第一条线
	floorTwo = t.$('.floorTwo')[0], //地面第二条线
	floorImg = t.$('.floorImg')[0], //地面盒子
	dg = t.$('#dragon')[0], //恐龙
	wrapLi = t.$('.wrapLi')[0], //总盒子
	over = t.$('.over')[0], //游戏结束页面
	open = t.$('.open')[0], //继续游戏开关
	clouds = t.$('.clouds')[0], //云朵
	singleTime = t.$('.single_time')[0], //单次时间
	allTime = t.$('.all_time')[0], //总时间
	flaky = t.$('.flaky')[0]; //初始化恐龙
	
	
//定时器开关	
let timerl = timer1l =timer2l = timer3l = timer4l = timer5l = timer6l = null;


let speed = 5; //速度
let Scurrent = 2;
let type = 0; //状态
let Dcurrent = 1;
let state = 0;
let time = 0;
let onoff = false;//开关

function TimeStart() {
	if(timer6l != null) return;
	timer6l = setInterval(function(ev) {
		time++;
		singleTime.innerHTML = time;
	}, 100)
}

//地面运动	
function floorMove() {
	timer1l = setInterval(function(){
		let left = parseInt(floorOne.style.left == "" ? 0 : floorOne.style.left) - 20;
		if(Math.abs(left) > parseInt(floorOne.offsetWidth)) left = floorOne.offsetWidth;
		floorOne.style.left = left + 'px';
		if(left > 0) floorTwo.style.left = -(parseInt(floorOne.offsetWidth) - left) + "px";
		else floorTwo.style.left = parseInt(floorOne.offsetWidth) + left + "px";
		let hit = t.$('.bar');
		hit.forEach((item) => {
			let l = parseInt(item.style.left);
			if(l < 0) {
				wrapLi.removeChild(item);
			} else {
				item.style.left = l - 20 + "px";
				if(t.bong1(dg, item)) {
					state = 2;
					clearInterval(timer1l);
					clearInterval(timer2l);
					clearInterval(timer3l);
					clearInterval(timer4l);
					clearInterval(timerl);
					clearInterval(timer6l);
					over.style.display = 'block';
					dg.className = 'dinosaur picLi Loong5';
				}
			}
		});
	}, 80);

}

//云朵
function creatCloud() {         // 创建元素
	let cloud = document.createElement('div');        
	cloud.className = "clouds picLi";        
	wrapLi.appendChild(cloud);
	let clouds = t.$('.clouds')[0];         // 定义位置
	cloud.style.top = Math.ceil(Math.random() * 40) + 'px';         // 移动
	timerl = setInterval(function() {            
		cloud.style.left = cloud.offsetLeft - speed + 'px';            
		if(cloud.offsetLeft == 0) {                
			clouds.remove();            
		}        
	}, 50);
	// 递归
    timerl = setTimeout(()=>{
          creatCloud();
     },Math.ceil(Math.random()*5000));

}


//行走的恐龙,恐龙的变化
function dgChange(){
//	if(timer2 != null) return;
	timer2l = setInterval(function(ev) {
		if(type != 0) return;
		dg.className = "dinosaur picLi Loong" + Scurrent;
		dg.style.top = wrapLi.offsetHeight - dg.offsetHeight + "px";
		Scurrent++;
		if(Scurrent > 3) Scurrent = 1;
	}, 80)
	
}

//蹲下的恐龙
function down() {
	if(timer3l != null) return;
	timer3l = setInterval(function() {
		if(type != 1) return;
		dg.className = "dgDown picLi LoongDown" + Dcurrent;
		dg.style.top = wrapLi.offsetHeight - dg.offsetHeight + "px";
		Dcurrent++;
		if(Dcurrent > 2) Dcurrent = 1;
	}, 80)
}

//跳起的恐龙
function jump(cdg, cb) {
	let top = cdg.offsetTop;
	t.move({
		obj: cdg,
		attrs: {
			top: 0
		},
		d: 300,
		fx: 'linear',
		cb: function() {
			t.move({
				obj: cdg,
				attrs: {
					top: top
				},
				d: 500,
				fx: 'linear',
				cb: function() {
					cb();
				}
			})
		}
	});
	cdg.className = 'dinosaur picLi Loong1';
}
keyboard();
//键盘事件
function keyboard(){
document.onkeydown = function(e) {
	e = window.event || e;
	if(state==2) return;
	switch(e.keyCode) {
		case 38: //向上键
			if(state!=1&&type == 2) return;
			type = 2;
			jump(dg,()=>{
				type=0;
			});
			break;
		case 40: //向下键
			if(state!=1&&type == 1) return;
			type = 1;
			down();
			break;
		case 32: //空格
			if(type == 3||state!=0) return;
			onoff=true;
			type = 3;
			floorImg.style.display ='block';
			jump(flaky, () => {
				flaky.classList.add('activelqw');
				dg.style.display = singleTime.style.display ='block';
				floorMove();
				dgChange();
				TimeStart();
				creatCloud();
				createDar();
				dg.style.left = '10px';
				type = 0;
				state =1;
			});
			break;
	}
}
document.onkeyup = function(e) {
	e = window.event || e;
	switch(e.keyCode) {
		case 40: //向下键
			if(state!=1) return;
			type = 0;
			break;
	}
}
}	

//生成障碍物
function createDar() {
	timer4l = setInterval(function() {
		let left = 600;
		let n = Math.round(Math.random() * 5 + 1);
		let hit = t.$('.bar');
		if(hit.length > 0) {
			let l = parseInt(hit[hit.length - 1].style.left);
			let r = parseInt(Math.random() * (500 - 250 + 1) + 250);
			left = l + r;
			if(left < 600) left = 600;
		}
		let div = document.createElement("div");
		div.setAttribute("class", "bar picLi bar" + n);
		div.style.left = left + "px";
		wrapLi.appendChild(div);
	}, 500);
}
//createDar();

//重新开始
open.onclick = function(){
	let hit = t.$('.bar')[0];
	hit.classList.remove('bar');
	dgChange();
	floorMove();
	createDar();
	document.onkeydown = function(ev) {
		if(ev.keyCode == 38){
			if(state!=1&&type == 2) return;
			type = 2;
			jump(dg,()=>{
				type=0;
			});
		}
	}
	over.style.display = 'none';
	TimeStart();
}




}
