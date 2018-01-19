function lyhtime(){
    //获取元素
var oRl = document.getElementById('dat');
var oDate = document.getElementById('dat');
var oC = document.getElementById('closs');

var box = document.getElementsByClassName('left')[0];
var week = document.getElementById('week');
var date = document.getElementById('day');

var tops = document.getElementById('ymd');
var bottom = document.getElementById('hms');

var oInp = document.getElementById('inp');
var oA = document.getElementById('a');
var oSt = document.getElementById('st')
//console.log(oSt);

//点击关闭日历
oC.onclick = function (){
    oDate.style.display = 'none';
};

//日历拖拽
oRl.onmousedown = function (ev){
	let disX = ev.pageX - oRl.offsetLeft;
	let disY = ev.pageY - oRl.offsetTop;

    document.addEventListener('mousemove',movelyh)
    
    function movelyh(e){
		oRl.style.left = e.pageX - disX + 'px';
		oRl.style.top = e.pageY - disY + 'px';
	}

    document.addEventListener('mouseup', uplyh)
    
    function uplyh(){
        document.removeEventListener('mousemove',movelyh)
         document.removeEventListener('mouseup', uplyh);
	}
	return false;
};

//日历
let arr = ['一','二','三','四','五','六','日'];
let html = '';
arr.forEach(function(e,i){
    html += '<li>'+ e +'</li>';
});
week.innerHTML = html;

let date1 = new Date();
var curMonth = date1.getMonth(); 
date1.setMonth(curMonth + 1); 
date1.setDate(0); 
let d = date1.getDate(); 

let nowDate = new Date();
let nowd = nowDate.getDate();

let dHtml = '';
for(let i=0;i<d;i++){
    dHtml += `<li class="${i==nowd-1?'show':''}">${(i+1)}</li>`;
}
date.innerHTML = dHtml;

let nDate = new Date();
nDate.setDate(1);
let d2 = nDate.getDay();
d2==0 && (d2=7);

let oDa = new Date();
oDa.setMonth(oDa.getMonth());
oDa.setDate(0);
let od = oDa.getDate();

for(let i=1;i<d2;i++){
    date.innerHTML = `<li class="oldt">${od--}</li>` + date.innerHTML;
}

//时钟
myTime ();
setInterval(myTime,1000);

function myTime (){
    let d = new Date();
    let iY = d.getFullYear();
    let iMou = d.getMonth() + 1;
    let iDate = d.getDate();
    let iH = d.getHours();
    let iM = d.getMinutes();
    let Se = d.getSeconds();

    tops.innerText = `${iY}年${toDou(iMou)}月${toDou(iDate)}日`;
    bottom.innerText = `${toDou(iH)}:${toDou(iM)}:${toDou(Se)}`;
}

//闹钟
let onOff = true;
oA.onclick = function(){
   if(!onOff)return;
   onOff = false;
    let val = oInp.value;
    console.log(val)
    let timer = null;
    if(!val){
        return
    };

// let newDate = new Date(val);

    myTime();
    timer = setInterval(myTime,1000);
    function myTime(){
        var nH=val.split(':')[0]*1
        var nM=val.split(':')[1]*1
        let nowDate = new Date();
        let t = 60 - nowDate.getSeconds();
        let H = nowDate.getHours();
        let M = nowDate.getMinutes();
        if(H>=nH){
            H=24-H+nH; 
            if(M>nM){
                M=60-M+nM
                H=H-1
            }else{
                M=nM-M
            }        
        }else{
            H=nH-H
            if(M>nM){
                M=60-M+nM
                H=H-1
            }else{
                M=nM-M
            } 
        }

        if(Math.floor(t) <= -1){
            t = 0;
            clearInterval(timer);
            alert('起床啦!!!');
            onOff = true;
        }else{
            oSt.innerText = '离起床还剩下'+toDou(H)+'小时'+toDou(M)+'分'+toDou(Math.floor(t))+'秒';
        }
        console.log(oSt.innerText);
    }    
};

oInp.onclick = function (ev){
    oInp.select();
};

//补零函数
function toDou(n){
    return n<10?'0'+n:''+n;
};
}

