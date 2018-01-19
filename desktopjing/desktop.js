// JavaScript Document
var data={
    logo: [
        {id:0,image:'date.png',font:'日历',name:'date',dong:'dN'},
        {id:1,image:'time.png',font:'时钟',name:'time',dong:'dN'},
        {id:2,image:'Pictures.png',font:'相册',name:'Pictures',dong:'dN'},
        {id:3,image:'game.png',font:'小游戏',name:'game',dong:'dN'},
        {id:4,image:'Music.png',font:'音乐播放器',name:'Music',dong:'dN'},
        {id:5,image:'Net.png',font:'浏览器',name:'Net',dong:'dN'},
        {id:6,image:'Notes.png',font:'便签',name:'Notes',dong:'dN'},
        {id:7,image:'Folder.png',font:'文件夹',name:'Folder',dong:'dN',pid:0},
        {id:8,image:'Smart.png',font:'设置',name:'Smart',dong:'dN'},
        {id:9,image:'calculator.png',font:'计算器',name:'calculator',dong:'dN'}
    ],
    bot:[
        {id:0,image:'date.png',font:'日历',name:'date'},
        {id:1,image:'time.png',font:'时钟',name:'time'},
        {id:2,image:'Pictures.png',font:'相册',name:'Pictures'},
        {id:3,image:'Music.png',font:'音乐播放器',name:'Music'},
        {id:4,image:'Net.png',font:'浏览器',name:'Net'},
        {id:5,image:'Notes.png',font:'便签',name:'Notes'},
        {id:6,image:'Smart.png',font:'设置',name:'Smart'}      
    ]
}
var logo=document.getElementById('logo');
var bot=document.getElementById('bot');
var start=0
var end=0
var arrPo=[]
var timer1=null
var timer3=null
var num=0;
var liHeight=120;
var liWidth=94
var li1=72
var li2=110
var li3=74
var li4=24
var zhuti=zhuti1
var body = document.querySelector("body");
var note = Array.from(document.querySelectorAll(".nb-note"));
var nbmenudiv = document.querySelector(".nb-menu");
var disbt=0
var disbl=0
var SnowMask=document.getElementById('snowMask')
var timerAll=null;
var PaneLi=document.querySelector('.paneLi')
    // 便签 ，随机位置 数量不限 ↓
// var count = 0;
// 便签 ，随机位置 数量不限 ↑
timerAll=setTimeout(function(){
    SnowMask.style.opacity=1
},5000)
document.addEventListener('mousemove',function(){
    clearTimeout(timerAll)
    SnowMask.style.opacity=0
    timerAll=setTimeout(function(){
        SnowMask.style.opacity=1
    },5000)
})
;
var newnote = note[note.length-1].cloneNode(true)
newnote.style.display= "block";
var zhuti2=[
    {image:'data1.png',font:'日历',name:'date'},
    {image:'time1.png',font:'时钟',name:'time'},
    {image:'pic1.png',font:'相册',name:'Pictures'},
    {image:'game1.png',font:'小游戏',name:'game'},
    {image:'bofangqi1.png',font:'音乐播放器',name:'Music'},
    {image:'e1.png',font:'浏览器',name:'Net'},
    {image:'bianqian1.png',font:'便签',name:'Notes'},
    {image:'wenjianjia1.png',font:'文件夹',name:'Folder'},
    {image:'20481.png',font:'设置',name:'Smart'},
    {image:'jisuanqi1.png',font:'计算器',name:'calculator'}
]
var zhuti1=[
    {image:'date.png',font:'日历',name:'date'},
    {image:'time.png',font:'时钟',name:'time'},
    {image:'Pictures.png',font:'相册',name:'Pictures'},
    {image:'game.png',font:'小游戏',name:'game'},
    {image:'Music.png',font:'音乐播放器',name:'Music'},
    {image:'Net.png',font:'浏览器',name:'Net'},
    {image:'Notes.png',font:'便签',name:'Notes'},
    {image:'Folder.png',font:'文件夹',name:'Folder'},
    {image:'Smart.png',font:'设置',name:'Smart'},
    {image:'calculator.png',font:'计算器',name:'calculator'}
] 
var zhuti3=[
    {image:'date3.png',font:'日历',name:'date'},
    {image:'time3.png',font:'时钟',name:'time'},
    {image:'pic3.png',font:'相册',name:'Pictures'},
    {image:'konglong3.png',font:'小游戏',name:'game'},
    {image:'music3.png',font:'音乐播放器',name:'Music'},
    {image:'e3.png',font:'浏览器',name:'Net'},
    {image:'bianqian3.png',font:'便签',name:'Notes'},
    {image:'wenjianjia3.png',font:'文件夹',name:'Folder'},
    {image:'game3.png',font:'设置',name:'Smart'},
    {image:'jisuanqi3.png',font:'计算器',name:'calculator'}
] 
render();
var flo=logo.querySelector('.Folder')
var flonew1=flo.cloneNode(true)
cxaidan()
//窗口
window.onresize = onresizem
function onresizem(){
    var Lis=Array.from(logo.querySelectorAll('li'))
    var scrollH=Math.floor((document.documentElement.clientHeight)/liHeight);
    Lis.forEach((e,i)=>{
        e.style.transition='0.5s'
        var j=Math.floor(i/scrollH)
        i=i%scrollH
        e.style.top=i*liHeight+'px'
        e.style.left=j*liWidth+'px'
        setTimeout(function(){
            e.style.transition=null
        },500)
    }) 
    bot.style.left=(document.documentElement.clientWidth-bot.scrollWidth)/2+'px'
}
function render(liHeight=120,liWidth=94){
    var x=document.documentElement.clientHeight;
    var num=Math.floor(x/liHeight);
    var Lis=Array.from(logo.querySelectorAll('li'))
    Lis=Lis.reverse()
    var datat=data.logo.map(e=>e)
    Lis.forEach(e=>{       
        if(e.getAttribute('namel')){
            datat.splice(e.getAttribute('namel')*1,1)
        }
    })
    liPo()
    var q=0;
    var qq=0;
    datat.forEach((e,i)=>{
        if(e.dong&&e.dong=='dN'){
            console.log(liHeight,liWidth)
            qq=pyon(e,arrPo,q,i,qq,num,liHeight,liWidth);
        }else{q++}
    })
    bot.innerHTML=''
    data.bot.forEach((e,i)=>{
        var str='<li><img src="img/'+ e.image+'" class='+e.name+' namel="'+e.id+'"><span></span></li>'
        bot.innerHTML+=str;
    })
    bot.style.left=(document.documentElement.clientWidth-bot.scrollWidth)/2+'px'
    var bot_lis=Array.from(bot.getElementsByTagName('li'));
    bot_lis.forEach((e,i)=>{
        e.onmouseenter=function(){
            img_change(e,'scale(1.2)','scale(1)','scale(0.9)',20,14,8)
            bot.style.left=(document.documentElement.clientWidth-bot.scrollWidth)/2+'px'

            return false
        }
        e.onmouseleave=function(){
            img_change(e,'scale(0.7)','scale(0.7)','scale(0.7)',0,0,0,70,60)
            bot.style.left=(document.documentElement.clientWidth-bot.scrollWidth)/2+'px'
        }
    })
    var fff=logo.querySelector('li')
    fff.setAttribute('tabindex',0)
    sk()
    clickLione()
    clEvent()
    // addlogo()
    rename()
    Libangbot()
    Libotremove()
    cxaidan()
    liyouji()
    // remove()
} 
//
function pyon(e,arrPo,q,i,qq,num,h1,w1){
    if(e.dong=='dN'){
        var ii=i
        i=i-q+qq;
        var j=Math.floor(i/num)
        i=i%num;
        console.log(h1,w1)
        var str='<li style="left:'+j*w1+'px;top:'+i*h1+'px" class="'+e.name+'"  index="'+e.dong+'" namel="'+e.id+'"><img src="img/'+ e.image+'"><span>'+ e.font+'</span><input type="text" class="editor"/></li>'
        logo.innerHTML+=str;
        var lc={y: Math.round(logo.lastElementChild.offsetTop/h1), x : Math.round(logo.lastElementChild.offsetLeft/w1)}
        arrPo.forEach(el=>{
            if(el.x==lc.x&&el.y==lc.y){
                logo.lastElementChild.remove()
                qq++;
                pyon(e,arrPo,q,ii,qq,num,h1,w1)
            }          
        })
        return qq
    }else{q++}
}  
//点击一次判断是否有加active，如果加了的话就可以拖动，如果没有的话把其他li的active去掉
function clickLione(bagl,bagt){
    var Lis_r=Array.from(logo.getElementsByTagName('li'));
    Lis_r.forEach((e,i)=>{
        e.onmousedown=function(ev){
            document.documentElement.focus()
            if(!e.classList.contains('active')){
                Lis_r.forEach(e=>{
                    e.classList.remove('active')
                })
                e.classList.add('active')  
            }
            var cSL=Array.from(logo.querySelectorAll('.active'))
            var disX=[]
            var disY=[]
            var this_Xx=[]
            var this_Yy=[]
            var minX=Infinity;
            var minY=Infinity;
            cSL.forEach(e=>{            
                disX.push(ev.pageX-e.offsetLeft)
                disY.push(ev.pageY-e.offsetTop)
                this_Xx.push(e.offsetLeft)  
                this_Yy.push(e.offsetTop) 
                if(e.offsetTop<minY) minY=e.offsetTop;
                if(e.offsetLeft<minX) minX=e.offsetLeft;         
            }) 
            var this_X=Math.max.apply(null,disX)
            var this_Y=Math.max.apply(null,disY)
            moveLi(cSL,disX,disY,this_X,this_Y,this_Xx,this_Yy,minX,minY,e.offsetTop,e.offsetLeft,Lis_r)          
            return false
        }
    })    
}
//桌面下方移入跳跃函数
function img_change(e,str1,str2,str3,num1,num2,num3,w,h){
    e.children[0].style.transform=str1;
    e.children[0].style.bottom=num1+'px'
    e.style.width=w?w+'px':e.children[0].scrollWidth+10+'px';
    e.style.height=h?h+'px':e.children[0].scrollWidth+'px';;
    pp('previousElementSibling')
    pp('nextElementSibling')
    function pp(pn){
        if(e[pn]){
            e[pn].children[0].style.transform=str2;
            e[pn].children[0].style.bottom=num2+'px'
            e[pn].style.width=w?w+'px':e[pn].children[0].scrollWidth+7+'px';
            e[pn].style.height=h?h+'px':e[pn].children[0].scrollWidth+'px';  
            if(e[pn][pn]){
                e[pn][pn].children[0].style.transform=str3;
                e[pn][pn].children[0].style.bottom=num3+'px'
                e[pn][pn].style.width=w?w+'px':e[pn][pn].children[0].scrollWidth+7+'px';
                e[pn][pn].style.height=h?h+'px':e[pn][pn].children[0].scrollWidth+'px';  
            }
        }
    }
}
//框选
function sk(){
    
    document.onmousedown=function(ev){
        var fff=logo.querySelector('li')
        fff.focus()
        // debugger
        if(ev.target.tagName!='HTML')return
        var kuang=document.createElement('div')       
        kuang.className='kuang';     
        var pX=ev.pageX;
        var pY=ev.pageY;

        document.addEventListener('mousemove',skmove)
        function skmove(ev){       
           var lis=Array.from(logo.children)
           lis.filter((e,i)=>{
               return e.parentNode==logo
           })    
           if(!box.querySelector('.kuang')){box.appendChild(kuang);console.log(111111111)}
           var iH=Math.abs(ev.pageY-pY);
           var iW=Math.abs(ev.pageX-pX);
           kuang.style.height=iH+'px';
           kuang.style.width=iW+'px';
           var iL=Math.min(ev.pageX,pX)
           var iT=Math.min(ev.pageY,pY)
           kuang.style.top=iT+'px';
           kuang.style.left=iL+'px';
           lis.forEach(e=>{
            if(bong(e,kuang)){
                console.log(e)
                e.classList.add('active');                    
            }
            if(!bong(e,kuang)){
                e.classList.remove('active');
            }
           })
       }
       document.addEventListener('mouseup',ckup)
       function ckup(){
            document.removeEventListener('mouseup',ckup)
            document.removeEventListener('mousemove',skmove)
            kuang.remove()
       }
       ev.preventDefault();
   }
}
//碰撞函数
function bong(a,b){
    /*
        B的四个方向
    */
    let bl = b.getBoundingClientRect().left;
    let bt = b.getBoundingClientRect().top;
    let br = bl + b.offsetWidth;
    let bb = bt + b.offsetHeight;
    /*
        A的四个方向
    */
    let al = a.getBoundingClientRect().left;
    let at = a.getBoundingClientRect().top;
    let ar = al + a.offsetWidth;
    let ab = at + a.offsetHeight;

    if(br < al || bb < at || bl > ar || bt > ab){
        //没碰到
        return false;
    }else{
        return true;
    }
}
//移动函数
function moveLi(a,disX,disY,this_X,this_Y,this_Xx,this_Yy,minX,minY,eT,eL,Lis_r){
    var iT=[]   
    var iL=[]
    Lis_r.forEach(e=>{
        e.style.zIndex = 0;
    })
    a.forEach(e=>{
        iT.push(e.offsetTop)
        iL.push(e.offsetLeft)
    })
    document.onmousemove=function(ev){
        changeP()
        a.forEach((e,i)=>{
            if(e.getAttribute('index')=='dN'){
                e.setAttribute('index','dY')
                var strname=e.getAttribute('namel')                
                        data.logo[strname*1].dong='dY'
            }
            e.style.zIndex = 1;            
            if(ev.pageY>=this_Y){
                e.style.top=ev.pageY-disY[i]+'px'
            }else{
                e.style.top=this_Yy[i]-minY+'px'
            }
            if(ev.pageX>=this_X){
                e.style.left=ev.pageX-disX[i]+'px'
            }else{
                e.style.left=this_Xx[i]-minX+'px'
            }           
        })       
    }
    document.onmouseup=function(){    
        clearTimeout(timer1)
        end=new Date().getTime()
        Lis_r.forEach(e=>{
            e.style.zIndex = 0;
        })
        if(start&&start!=0){  
            console.log(end-start)
            var B=logo.querySelector('.bang')
            if(!B){
                document.onmousemove= document.onmouseup=null;
                return
            }
            var A=logo.querySelector('.active')
            var Bt=B.offsetTop;
            var Bl=B.offsetLeft;
            var Bw=B.scrollWidth
            var bnamel=B.getAttribute('namel')
            var anamel=A.getAttribute('namel')
            if(end-start<1000){
                
                B.style.transition='0.3s'
                B.style.top=eT-10+'px';
                B.style.left=eL-10+'px';
                A.style.transition='0.3s'
                A.style.top=Bt-10+'px';
                A.style.left=Bl-10+'px';
                B.classList.remove('bang')
                setTimeout(function(){
                    A.style.transition=null
                    B.style.transition=null
                },300)
            }else{
              
            }
        }
        render()
        document.onmousemove= document.onmouseup=null;
    }
}
//两个li碰撞的时候判断松开鼠标的时间 小于1s就是换位置，大于1s就是合并
function changeP(){
    var Actives=Array.from(logo.querySelectorAll('.active'))
    var Lis=Array.from(logo.querySelectorAll('li'))
    if(Actives.length==0)return
    if(Actives.length>1){
        console.log('多选')
    }else{
        //判断是否碰撞到别多li，判断条件：两者之间的left小于li本身多宽度-10，两者之间的top小于li本身多高度-10
        if(Actives[0].parentNode!=logo){
            Lis=Array.from(Actives[0].parentNode.querySelectorAll('li'))
        }
        Lis.forEach(e=>{
            if(e!=Actives[0]){
                var leftP=Math.abs(Actives[0].offsetLeft-e.offsetLeft)
                var topP=Math.abs(Actives[0].offsetTop-e.offsetTop)
                
                if(leftP<47&&topP<60){
                    clearTimeout(timer1)
                    e.classList.add('bang')
                    start=new Date().getTime(); 
                    var B=logo.querySelector('.bang')
                    var A=logo.querySelector('.active')
                    var Bt=B.offsetTop;                 
                    var Bl=B.offsetLeft;
                    var Bw=B.scrollWidth
                    var bnamel=B.getAttribute('namel')
                    var anamel=A.getAttribute('namel')   
                                 
                    timer1=setTimeout(function(){
                        var B=logo.querySelector('.bang')
                        if(!B) return
                         //如果移动到的是bag那么就打开bag并且把A图标放到bag里  
                        if(B.className.includes('Zip')){
                            var bname=data.logo[B.getAttribute('namel')].name
                            var Bags=Array.from(document.querySelectorAll('.bag'))
                            Bags.forEach(ebb=>{
                                if(ebb.classList.contains(bname)){
                                    ebb.style.display='block'
                                    A.style.display='none'
                                    var len=ebb.querySelector('ul').querySelectorAll('li').length
                                    var lenj=Math.floor(len/3)
                                    len=len%3
                                    var str='<li style="left:'+len*100+'px;top:'+lenj*100+'px" class="'+data.logo[anamel].name+'"  index="'+data.logo[anamel].dong+'" namel="'+data.logo[anamel].id+'" ><img src="img/'+ data.logo[anamel].image+'"><span>'+data.logo[anamel].font+'</span><input type="text" class="editor"/></li>'
                                    ebb.querySelector('ul').innerHTML+=str
                                }
                            })
                            cxaidan()
                        }else{
                             //新建一个bag 把两个图标放进去  
                            var divv=document.createElement('div')
                            divv.className='bag';
                            logo.appendChild(divv)
                            var lastbag=logo.lastElementChild;
                            lastbag.innerHTML='<span class="feilei">图标包</span> <input type="text" class="editorq"/><button class="btn">X</button><ul></ul>'
                            var inb=lastbag.querySelector('.editorq')
                            inb.style.display='block'
                            inb.value=lastbag.querySelector('.feilei').innerText
                            lastbag.querySelector('.feilei').style.display='none';
                            inb.select()  
                            inb.onblur=function(){                          
                                var lll=rep(inb,lastbag.querySelector('.feilei'))
                                if(lll==1){
                                    inb.style.display='none'
                                    lastbag.querySelector('.feilei').style.display='block';
                                    lastbag.querySelector('.feilei').innerText=inb.value;      
                                }
                            }                     
                            var lastul=lastbag.querySelector('ul')
                            lastbag.style.transition='0.5s'                        
                            lastbag.style.display='block';                                             
                            if(Bt+350>document.documentElement.clientHeight){
                                Bt=document.documentElement.clientHeight-350
                            }
                            if(Bl+350>document.documentElement.clientWidth){
                                Bl=document.documentElement.clientWidth-350
                            }     
                            lastbag.style.height=lastbag.style.width='350px'          
                            lastbag.style.top=Bt+'px';
                            lastbag.style.left=Bl+B.scrollWidth+'px';                     
                            lastul.innerHTML+='<li style="left:0px;top:0px" class="'+data.logo[bnamel].name+'"  index="'+data.logo[bnamel].dong+'" namel="'+data.logo[bnamel].id+'" ><img src="img/'+ data.logo[bnamel].image+'"><span>'+data.logo[bnamel].font+'</span><input type="text" class="editor"/></li>'
                            lastul.innerHTML+='<li style="left:100px;top:0px" class="'+data.logo[anamel].name+'"  index="'+data.logo[anamel].dong+'" namel="'+data.logo[anamel].id+'" ><img src="img/'+ data.logo[anamel].image+'"><span>'+data.logo[anamel].font+'</span><input type="text" class="editor"/></li>'
                            closebag(Bt,Bl)
                            A.style.display='none'
                            B.style.display='none'                      
                        }   
                        render()
                        divmove()  
                        removebagli()
                        e.classList.remove('bang')                          
                    },1000)               
                }else{     
                    e.classList.remove('bang')
                }
            }
        })
    }
}
function refresh(){
    var Lis=Array.from(logo.querySelectorAll('li'))
    Lis.forEach(e=>{
        var iT=e.offsetTop;
        var iL=e.offsetLeft;
        var numT=Math.round(iT/liHeight);
        var numL=Math.round(iL/liWidth);
        e.style.transition='0.5s'
        e.style.top=numT*liHeight+'px';
        e.style.left=numL*liWidth+'px';
        liPo()
        setTimeout(function(){
            e.style.transition=null;
        },500)
    })
}
  //新建快捷方式
  function addlogo(){
      var Lis=Array.from(logo.querySelectorAll('li'))
      Lis.forEach((e)=>{
        console.log('o',e)
          e.ondblclick=function(ev){
              console.log('o')
              if(ev.target.tagName!='SPAN'){
                var namel=e.getAttribute('namel')*1
                data.logo.push({id:data.logo.length,image:data.logo[namel].image,font:data.logo[namel].font+'的替身',name:data.logo[namel].name,dong:"dN"})
                console.log(data)
                render()
              }
          }
      })
  }
  //查看目前桌面上li的每个的位置，返回数组
  function liPo(){
      arrPo=[]
      var Lis=Array.from(logo.querySelectorAll('li'))
      Lis.forEach(e=>{
          arrPo.push({y:Math.round(e.offsetTop/liHeight),x:Math.round(e.offsetLeft/liWidth)})        
      })
  }
  //双击li的span重命名
  function rename(Lis){
    if(!Lis){
    var Lis=Array.from(logo.querySelectorAll('li'))
    }
    Lis.forEach(e=>{
        e.ondblclick=function(ev){
            if(ev.target.tagName!='SPAN')return
            var folder_name=ev.target;
            var name1 =e.querySelector('.editor')
            console.log(name1,folder_name)
            name1.style.display='block';
            folder_name.style.display='none'
            name1.select();
            name1.value=folder_name.innerText;
            name1.onblur=function(){
                var lll=rep(name1,e,Lis)
                if(lll==1){
                    name1.style.display='none';
                    folder_name.style.display='block'
                    folder_name.innerText=name1.value;
                    data.logo[e.getAttribute('namel')*1].font=name1.value;  
                    if(e.className.includes('Zip')){
                        var zzz=e.className.split(' ');
                        zzz.forEach(eeeee=>{
                            if(eeeee.includes('Zip'))zzz=eeeee
                        })
                        var zzzb=logo.querySelectorAll('.'+zzz+'')
                        zzzb.forEach(z=>{
                            if(z.tagName=='DIV'){
                                z.querySelector('span').innerText=name1.value;
                            }
                        })
                    }   
                }
            }
        }
    })
}
//看名字是否重复
function rep(name1,chec,Lis){
    if(!Lis){
        var Lis=Array.from(logo.querySelectorAll('li'))
    }
    console.log(Lis)
    var onoff3=true
    Lis.forEach(e=>{
        if(name1.value==e.querySelector('span').innerText&&e!=chec){
            var l=0;
            if(name1.parentNode!=logo){
                var nameb=name1.parentNode.className.split(' ')
                    nameb.forEach(em=>{
                        console.log(em)
                        if(em.includes('Zip')){
                            console.log(em,logo.querySelectorAll('.'+em+''))
                            l=logo.querySelectorAll('.'+em+'')
                            l.forEach(eee=>{
                                if(eee.tagName=='LI')l=eee
                            })
                        }
                    })
            }
            if(e!=l){
                console.log('不能为重复名字')
                onoff3=false;
            }       
        }
    })
    if(!onoff3){
        name1.select();
    }else{
        if(name1.value==''){
            console.log('不能为空');
            name1.select();
        }else{
            return 1;
        }
    }
}
//删除图标
function remove(){
    Array.from(logo.querySelectorAll('li')).forEach(e=>{
        e.ondblclick=function(){
            data.logo.splice(e.getAttribute('namel')*1,1)
            e.remove();
            console.log(data.logo)
        }     
    })
}
//bag点击关闭按钮display：none；并且生成一个图标在原来的B的位置上
function closebag(Bt,Bl){
    var bags=Array.from(document.querySelectorAll('.bag'))
    console.log(bags)
    
    bags.forEach(e=>{
        e.querySelector('.btn').onclick=function(){
            e.style.display='none'
            if(e.className.includes('Zip'))return false
            e.classList.add('Zip'+num)
            var baglogo=document.createElement('li')
            logo.appendChild(baglogo)
            baglogo.className='Zip'+num;
            baglogo.setAttribute('index','dN')
            baglogo.setAttribute('namel',data.logo.length)
            baglogo.style.top=Bt+'px';
            baglogo.style.left=Bl+'px';
            data.logo.push({id:data.logo.length,image:'Zip.png',font:e.querySelector('span').innerText,name:'Zip'+num,dong:'dN'})
            baglogo.innerHTML='<img src="img/Zip.png"><span>'+ e.querySelector('span').innerText+'</span><input type="text" class="editor"/>'  
            baglogo.querySelector('img').style.height=li1+'px'
            baglogo.style.height=li2+'px'
            baglogo.style.width=li3+'px'
            baglogo.querySelector('span').style.width=li3+'px'
            baglogo.querySelector('span').style.fontSize=li4+'px'
            num++
            clEvent()
            clickLione()
            render()
            cxaidan()
            return false
        }
        e.querySelector('span').ondblclick=function(ev){
            this.style.display='none';
            e.querySelector('input').style.display='block';
            e.querySelector('input').value=this.innerText;
            e.querySelector('input').select()
            e.querySelector('input').onblur=function(){
                var lll=rep(e.querySelector('input'),e.querySelector('span'))
                if(lll){
                    e.querySelector('span').style.display='block';
                    e.querySelector('input').style.display='none';
                    e.querySelector('span').innerText=e.querySelector('input').value
                    var nameb=e.className.split(' ')
                    nameb.forEach(em=>{
                        console.log(em)
                        if(em.includes('Zip')){
                            console.log(em,logo.querySelectorAll('.'+em+''))
                            var l=logo.querySelectorAll('.'+em+'')
                            l.forEach(eee=>{
                                if(eee.tagName=='LI')l=eee
                            })
                            l.querySelector('span').innerText=e.querySelector('input').value
                            data.logo[l.getAttribute('namel')*1].font=e.querySelector('input').value
                            console.log(data.logo)
                        }
                    })
                }
            }
            return false
        }
    })
}
//各种点击事件
function clEvent(){
    var Liscl=Array.from(document.querySelectorAll('li'))
    var Lisc2=Array.from(bot.querySelectorAll('img'))
    Liscl=Liscl.concat(Lisc2)
    Liscl.forEach(e=>{    
            e.addEventListener('dblclick',function(haha){
                //点击zip应该弹出bag
                if(e.className.includes('Zip')){
                    console.log(haha.target.tagName)
                    // if(haha.target.tagName=='SPAN')return false;
                    console.log(1)
                    var Bags=Array.from(document.querySelectorAll('.bag'))
                    console.log(Bags)
                    var eclassN=e.className.split(' ')
                    console.log(eclassN)
                    
                    Bags.forEach(el=>{
                        eclassN.forEach(ee=>{
                            if(el.classList.contains(ee)){
                                el.style.display='block'
                                var Bl=e.offsetLeft;
                                var Bt=e.offsetTop;
                                if(e.offsetTop+350>document.documentElement.clientHeight){
                                    Bt=document.documentElement.clientHeight-350
                                }
                                if(e.offsetLeft+350>document.documentElement.clientWidth){
                                    Bl=document.documentElement.clientWidth-350
                                }   
                                el.style.top=Bt+'px';
                                el.style.left=Bl+e.scrollWidth+'px'; 
                                var bagslis=Array.from(el.querySelectorAll('li'))
                                bagslis.forEach((eb,i)=>{
                                    j=i%3
                                    i=Math.floor(i/3)
                                    eb.style.top=i*110+'px';
                                    eb.style.left=j*110+'px';                 
                                })
                            }
                        })                   
                    })
                }
                //cal
                if(e.className.includes('calculator')){
                    e.style.zIndex=102
                    calcyun()
                }
                //WeNet
                if(e.className.includes('Net')){
                    weNetyaya();
                }
                //Music
                if(e.className.includes('Music')){
                    var outLx=document.querySelector('.outLx');	
                    outLx.style.display='block';
                    var spanLx=document.querySelector('.spanLx');
                    //点击关闭按钮
                    spanLx.onclick=function(){
                        //音乐盒子隐藏
                        outLx.style.display='none';
                    }
                }
                //Note
                if(e.className.includes('Notes')){
                    note = Array.from(document.querySelectorAll(".nb-note"));
                    if(note.length<=1){
                        var nbx = Math.random()*document.documentElement.clientWidth;
                        var nby = Math.random()*document.documentElement.clientHeight;
                        var newnote = note[note.length-1].cloneNode(true)
                        newnote.style.display='block'
                        newnote.style.right = nbx > document.documentElement.clientWidth - 300 ? document.documentElement.clientWidth - 300 : nbx + "px";
                        newnote.style.top = nby > document.documentElement.clientHeight -300 ? document.documentElement.clientHeight -300 : nby + "px";  
                        body.insertBefore(newnote,note[note.length-1]);
                    }
                    note = Array.from(document.querySelectorAll(".nb-note"));
                    foeach();
                }
                //pic
                if(e.className.includes('Pictures')){
                    pholqw.style.display='block';
                    pholqw.style.zIndex='100'
                    pholqw.style.top=(document.documentElement.clientHeight-pholqw.scrollHeight)/2+'px'
                    pholqw.style.left=(document.documentElement.clientWidth-pholqw.scrollWidth)/2+'px'
                    headerlqw.querySelector('span').onclick=function(){
                        pholqw.style.display='none';
                    }
                }
                //game
                if(e.className.includes('game')){
                    xiaokongl()
                    PaneLi.style.display='block'
                    var closeLi=PaneLi.querySelector('.closeLi')
                    PaneLi.style.top=(document.documentElement.clientHeight-PaneLi.scrollHeight)/2+'px'
                    PaneLi.style.left=(document.documentElement.clientWidth-PaneLi.scrollWidth)/2+'px'
                    closeLi.onclick=function(){
                        PaneLi.style.display='none'                     
                    }
                }
                //date time
                if(e.className.includes('date')||e.className.includes('time')){
                    dat.style.display='block'
                    lyhtime()  
                    closs.onclick=function(){
                        dat.style.display='none' 
                                          
                    }
                }


            })
    })
}
//点击桌面上所有的div时提升层级，并且不松手的话是可以拖动走的
function divmove(){
    var Divs=document.querySelectorAll('div')
    Divs=Array.from(Divs)
    Divs.forEach(e=>{
        e.onclick=function(){
            Divs.forEach(el=>{
                el.style.zIndex='1'
            })
            e.style.zIndex='1000'
            e.onmousedown=function(ev){
                e.style.transition=null
                if(ev.target.tagName!='DIV')return false
                var ddisX=(ev.pageX-e.offsetLeft);
                var ddisY=(ev.pageY-e.offsetTop);
                document.onmousemove=function(evl){
                    if(evl.pageX<ddisX)evl.pageX=ddisX;
                    if(evl.pageY<ddisY)evl.pageY=ddisY;
                    e.style.top=evl.pageY-ddisY+'px'
                    e.style.left=evl.pageX-ddisX+'px'                                                                                                                           
                }
                document.onmouseup=function(){
                    document.onmousemove=document.onmouseup=null
                    e.style.transition='0.5s'
                }
                return false
            }
            return false
        }
    })
}
foeach();
//便签function
function foeach(){
    document.addEventListener('mousedown',function(){ 
        nbmenudiv.style.display="none";
    })
    nbmenudiv.onmousedown = function(ed){
        ed.stopPropagation ? ed.stopPropagation() : ed.cancelBubble = true;
    }
    note.forEach(e=>{
        note = Array.from(document.querySelectorAll(".nb-note"));
        var ntit = e.querySelector(".nb-note-title");
        var nmv = e.querySelector(".nb-move");
        var ntxt = e.querySelector("textarea");
        var newBtn = e.querySelector(".nb-new");
        var titname = e.querySelector(".nb-title-name");
        var nipt = e.querySelector(".nb-ipt");
        var ntop = e.querySelector(".nb-note-up");
        var nclose = e.querySelector(".nb-note-close");
        var nbmenu = e.querySelector(".nb-note-menu");
        
        newBtn.onclick = function(){
            var newNote = note[note.length-1].cloneNode(true);
            newNote.style.display= "block";
            // 便签 ，随机位置 数量不限 ↓
            // count++;
            // if(count>11)return;
            // newNote.style.right = parseInt(getComputedStyle(note[note.length-1]).right) + ( note[note.length-1].scrollWidth + 15) *(count%4) + "px";
            // newNote.style.top = parseInt(getComputedStyle(note[note.length-1]).top) + (note[note.length-1].scrollHeight + 15) * Math.floor(count/4) + "px";
            // 便签 ，随机位置 数量不限 ↑
            
            // 便签 ，随机位置 数量不限 ↓
            var nbx = Math.random()*window.innerWidth;
            var nby = Math.random()*window.innerHeight;
            // 便签 ，随机位置 数量不限 ↑
            newNote.style.left = nbx > window.innerWidth - 300 ? window.innerWidth - 300 : nbx + "px";
            newNote.style.top = nby > window.innerHeight -300 ? window.innerHeight -300 : nby + "px";
            body.insertBefore(newNote,e);
            note = Array.from(document.querySelectorAll(".nb-note"));
            foeach();//递归 
        }
        titname.ondblclick = function(){
            var str = this.innerText;
            this.style.display = "none";
            nipt.style.display = "inline-block";
            nipt.value = str;
            nipt.select();
        }
        nipt.onblur = function(){
            var str = this.value;
            this.style.display = "none";
            titname.style.display = "inline-block";
            titname.innerText = str;
        }
        e.onmousedown = function(){
            note.forEach(e=>e.style.zIndex = 0)
            this.style.zIndex = 10;
        }
        nmv.onmousedown = function(ev){
            moveNote(ev,this.parentElement.parentElement);
            return false;
        }
        nbmenu.onclick = function(){
            nbmenudiv.style.display="block";
            nbmenudiv.style.zIndex = 30;
            nbmenudiv.style.left = this.getBoundingClientRect().left+10+"px";
            nbmenudiv.style.top = this.getBoundingClientRect().top+30+"px";
            nbmenudiv.onclick = function(ec){
                if(ec.target.tagName == "LI"){
                    nbmenu.parentElement.parentElement.style.backgroundColor = ec.target.dataset.color;
                    nbmenu.parentElement.parentElement.nextElementSibling.style.backgroundColor = ec.target.dataset.color;
                    nbmenu.parentElement.parentElement.nextElementSibling.firstElementChild.style.backgroundColor = ec.target.dataset.color;
                }
                nbmenudiv.style.display="none";
            }
        }
        ntxt.onmousedown = function(){
            autosize(this,ntit,nmv)
        }
        ntxt.oninput = function(){
            this.style.height = this.scrollHeight+"px";
        }
        ntop.onclick = function(){
            this.classList.toggle("nb-top-btn");
            this.parentElement.parentElement.parentElement.classList.toggle("nb-top");
        }
        nclose.onclick = function(){
            this.parentElement.parentElement.parentElement.remove();
            note = Array.from(document.querySelectorAll(".nb-note"));
             // 便签 ，随机位置 数量不限 ↓
            // if(note.length <=1)count=0;
            // 便签 ，随机位置 数量不限 ↑
        }
    });
}
//Wenet浏览器打开
function weNetyaya(){
    var btn = document.getElementById('img');
    var webBox = document.querySelector('.webBox');
    var reduce = document.querySelector('.reduce');
    var magnify = document.querySelector('.magnify');
    var close = document.querySelector('.close');
    var shua = document.querySelector('.shuaxin');
    var ifra = document.querySelector('.ifra');
    shua.onclick = function(){
        ifra.src = 'index.html';
    }
    webBox.style.display = 'block';
    close.onclick = function(){
        webBox.style.display = 'none'
        onOff = false;
        fn1();
        ifra.src = 'index.html';
    }
    var	onOff = true;
    magnify.onclick = fn1;
    
    function fn1(){
    
        if(onOff){
            webBox.style.width = '100%';
            webBox.style.height = '100%';
            webBox.style.left = '0';
            webBox.style.top = '0';
            webBox.style.marginTop = 0;
            webBox.style.marginLeft = 0;
            magnify.style.backgroundPosition = 'left -60px';
            onOff = false;
        }else{
            webBox.style.width = '700px';
            webBox.style.height = '450px';
            webBox.style.left = '50%';
            webBox.style.top = '50%';
            webBox.style.marginTop = '-225px';
            webBox.style.marginLeft = '-350px';
            magnify.style.backgroundPosition = 'left -30px';
            onOff = true;
        }
    }
}
//移除bag中的li
function removebagli(){
    var Bags=Array.from(document.querySelectorAll('.bag'))
    Bags.forEach(e=>{
        var bagLis=Array.from(e.querySelectorAll('li'))
        bagLis.forEach(el=>{
            var timer2=null
            el.addEventListener('mousedown',function(ev){
                timer2=setTimeout(function(){
                    var elclone=el.cloneNode(true)               
                    elclone.style.opacity='0.7';
                    elclone.style.position='absoult'              
                    var ename=el.getAttribute('namel')
                    logo.appendChild(elclone)  
                    elclone.zIndex='101'             
                    var disX=ev.pageX-el.getBoundingClientRect().left
                    var disY=ev.pageY-el.getBoundingClientRect().top   
                    elclone.style.top=ev.pageY-disY+'px'
                    elclone.style.left=ev.pageX-disX+'px'             
                    document.onmousemove=function(evmove){
                        elclone.style.top=evmove.pageY-disY+'px'
                        elclone.style.left=evmove.pageX-disX+'px'
                    }
                    document.onmouseup=function(evup){
                        document.onmousemove=document.onmouseup=null;
                        elclone.remove();
                        if(evup.pageX>e.offsetLeft&&evup.pageX<(e.offsetLeft+e.scrollWidth)&&evup.pageY>e.offseTop&&evup.pageY<(e.offsetTop+e.scrollHeight)){
                            return
                        }                
                        el.remove()
                        var n=data.logo[ename*1].name
                        var samen=Array.from(logo.querySelectorAll('.'+n+''))
                        samen.forEach(en=>{
                            if(en.getAttribute('namel')==ename){
                                en.style.top=evup.pageY+'px'
                                en.style.left=evup.pageX+'px'
                                en.style.display='block'                            
                            }
                        })                 
                    }
                },1000)
                ev.preventDefault()
            })
            el.addEventListener('mouseup',function(){
                clearTimeout(timer2)
            })
            el.addEventListener('mousemove',function(){
                clearTimeout(timer2)
            })
            
        })
    })   
}
//终于来到底部啦!!!!!!!!!!!!!!!!

//当li触碰到底部功能栏的时候,增加一个图标
function Libangbot(){      
    var LisLis=Array.from(logo.querySelectorAll('li'))
    LisLis.forEach(e=>{       
        e.addEventListener('mousedown',function(){
            var _this=e
            _this.addEventListener('mousemove',movebot)  
            _this.addEventListener('mouseup',upbot)
            disbt=_this.offsetTop
            disbl=_this.offsetLeft
            console.log(disbt)
            function movebot(){
                var Lis=Array.from(logo.querySelectorAll('.active'))
                if(Lis.length==0||Lis.length>1)return;
                var botlis=bot.querySelectorAll('li')
                var bl=bot.offsetLeft;         
                Lis.forEach(e=>{           
                    botlis.forEach(eb=>{
                        if(bong(eb,e)){
                            eb.classList.add('yayaya')
                        }else{
                            eb.classList.remove('yayaya')  
                        }  
                    })            
                })
                eb=bot.querySelector('.yayaya')
                var newli=bot.querySelector('.newli')
                if(newli)newli.remove(); 
                var fec=bot.firstElementChild 
                newli=document.createElement('li')
                newli.classList.add('newli')
                if(eb){  
                    bot.insertBefore(newli,eb.nextElementSibling)    
                    newli.setAttribute('index',Lis[0].getAttribute('namel'))                                                
                }
                bot.style.left=(document.documentElement.clientWidth-bot.scrollWidth)/2+'px'       
            }
            function upbot(){  
                // debugger         
                if(bot.querySelector('.newli')){
                    var n=bot.querySelector('.newli').getAttribute('index')
                    bot.querySelector('.newli').innerHTML='<img src="img/'+ data.logo[n*1].image+'" class='+data.logo[n*1].name+'><span></span>'
                    bot.querySelector('.newli').className=data.logo[n*1].name;
                    var botlis=Array.from(bot.querySelectorAll('li'))
                    botlis.forEach((e,i)=>{
                        if((e==bot.querySelector('.'+data.logo[n*1].name+''))&&(bot.querySelectorAll('.'+data.logo[n*1].name+'').length==2)){                   
                            data.bot.splice(i,0,{id:botlis.length,image:data.logo[n*1].image,name:e.querySelector('img').className})
                        }
                    })                    
                    render()
                    _this.style.transition='0.5s'
                    _this.style.top=disbt+'px'
                    _this.style.left=disbl+'px'                 
                    setTimeout(function(){
                        _this.style.transition=null
                    },500)
                }
                document.removeEventListener('mousemove',movebot)
                document.removeEventListener('mouseup',upbot)        
            }
        })       
    })  
}

//长按删除
function Libotremove(){
    var bots=Array.from(bot.querySelectorAll('li'))
    console.log('qq')
    bots.forEach((e,i)=>{
        e.addEventListener('mousedown',function(ev){ 
            document.addEventListener('mouseup',function(){
                clearTimeout(timer3)
                console.log(000)
            }) 
            console.log(1)     
            clearTimeout(timer3)
            var disT=ev.pageY-e.getBoundingClientRect().top
            var disL=ev.pageX-e.getBoundingClientRect().left
            timer3=setTimeout(function(){
                e.style.position='fixed';
                e.style.top=ev.pageY-disT+'px'
                e.style.left=ev.pageX-disL+'px'
                document.addEventListener('mousemove',mmli)  
                document.addEventListener('mouseup',upupli)
                function mmli(el){
                    console.log(el.pageY-disT)
                    e.style.top=el.pageY-disT+'px'
                    e.style.left=el.pageX-disL+'px'
                }
                function upupli(){
                    clearTimeout(timer3)
                    document.removeEventListener('mousemove',mmli)  
                    document.removeEventListener('mouseup',upupli)
                    e.remove();
                    data.bot.splice(i,1)
                    render();
                }
            },1000)           
            ev.preventDefault()
        })

    })

}
/*
oncontextmenu：
        弹出右键菜单
*/
function cxaidan(){
    const maindiv = document.getElementById("boxr");
    const onoff = maindiv.querySelector(".onoff");
    const item2 = maindiv.querySelector('.item2');
    let a = maindiv.children;
    let delyes ="";
    let arr  = [];
    for (let i=0;i<a.length;i++){
        let lis = a[i].children;
        arr.push(lis);
    }

    //右键弹出菜单
    document.oncontextmenu = function(ev){
        if(ev.target.tagName=='HTML'){
            maindiv.style.display = 'block';
            maindiv.style.left = ev.pageX + 'px';
            maindiv.style.top = ev.pageY + 'px';
               //循环所有元素
            for(let i=0;i<arr.length;i++){
                for(let j=0;j<arr[i].length;j++){
                    arr[i][j].onclick = function(ev){
                        //大清洗带对勾的元素
                        for(let i=0;i<arr.length;i++){
                            for(let j=0;j<arr[i].length;j++){
                                if(arr[i][j].className.includes('yes')){
                                    delyes = arr[i][j];
                                }
                            }
                        }
                        if(delyes)delyes.classList.remove('yes')
                        if (ev.target.className.includes("crrowdown")|| ev.target.className.includes("crrowup")){                
                            if(onoff.style.display == "block"){
                                onoff.style.display = "none"; 
                                item2.style.display = "block"; 
                                ev.target.classList.remove('crrowup');
                                ev.target.classList.add('crrowdown');
                            }else{
                                onoff.style.display = "block"; 
                                item2.style.display = "none"; 
                                ev.target.classList.remove('crrowdown');
                                ev.target.classList.add('crrowup');
                            }
                        }
                        else if (!arr[i][j].className.includes("crrow")){
                            arr[i][j].classList.add('yes');
                            arr[4][3].classList.remove("yes");
                        } 
                        var clickvalue=ev.target.innerText
                        console.log(ev.target.innerText)
                        if(clickvalue!='其他'){
                            boxr.style.display = 'none';
                        }
                        //刷新
                        if(clickvalue=='刷新')refresh()  
                        
                        //大图标
                        if(clickvalue=='大图标'){
                            Array.from(logo.querySelectorAll('img')).forEach(e=>{
                                e.style.height='100px'
                                e.parentNode.style.height='140px'
                                e.parentNode.style.width='120px'
                                e.parentNode.querySelector('span').style.width='120px'
                                e.parentNode.querySelector('span').style.fontSize='26px'
                                liHeight=150;
                                liWidth=130;  
                                li1=100
                                li2=140
                                li3=120
                                li4=26                    
                            })
                            onresizem()
                        }
                        //中等图标
                        if(clickvalue=='中等图标'){
                            Array.from(logo.querySelectorAll('img')).forEach(e=>{
                                e.style.height='72px'
                                e.parentNode.style.height='110px'
                                e.parentNode.style.width='74px'
                                e.parentNode.querySelector('span').style.width='74px'
                                e.parentNode.querySelector('span').style.fontSize='24px'
                                liHeight=120;
                                liWidth=94;   
                                li1=72
                                li2=110
                                li3=74
                                li4=24                       
                            })
                            onresizem()
                        }
                        //大图标
                        if(clickvalue=='小图标'){
                            Array.from(logo.querySelectorAll('img')).forEach(e=>{
                                e.style.height='50px'
                                e.parentNode.style.height='75px'
                                e.parentNode.style.width='60px'
                                e.parentNode.querySelector('span').style.width='60px'
                                e.parentNode.querySelector('span').style.fontSize='18px'
                                liHeight=80;
                                liWidth=66;    
                                li1=50
                                li2=75
                                li3=60
                                li4=18                      
                            })
                            onresizem()
                        }
                        //横向排列图标
                        if(clickvalue=='横向排列图标'){
                            var Lis=Array.from(logo.querySelectorAll('li'))
                            Lis.forEach((e,i)=>{
                                e.style.transition='0.5s'
                                var heng=Math.floor(document.documentElement.clientWidth/liWidth)
                                var j=Math.floor(i/heng)
                                i=i%heng
                                e.style.top=j*liHeight+'px'
                                e.style.left=i*liWidth+'px'
                                setTimeout(function(){
                                    e.style.transition=null
                                },500)
                            })
                        }
                        //纵向排列图标
                        if(clickvalue=='纵向排列图标'){
                            var Lis=Array.from(logo.querySelectorAll('li'))
                            Lis.forEach((e,i)=>{
                                e.style.transition='0.5s'
                                var heng=Math.floor(document.documentElement.clientHeight/liHeight)
                                var j=Math.floor(i/heng)
                                i=i%heng
                                e.style.top=i*liHeight+'px'
                                e.style.left=j*liWidth+'px'
                                setTimeout(function(){
                                    e.style.transition=null
                                },500)
                            })
                        }
                        //显示桌面
                        if(clickvalue=='显示桌面'){
                            var Divs=Array.from(document.querySelectorAll('div'))
                            Divs.forEach((e,i)=>{
                                if(e.parentNode.tagName!='DIV'){e.style.display='none'}                                         
                            })
                            note = Array.from(document.querySelectorAll(".nb-note"));
                                note.forEach((e,i)=>{
                                    if(i>0){
                                        e.remove()
                                    }else{
                                        e.style.display='none'
                                    }                                 
                                })
                        }
                        //新建文件夹
                        if(clickvalue=='新建文件夹'){
                            var flonew=flonew1.cloneNode(true)
                            logo.appendChild(flonew)
                            flonew.querySelector('input').style.display='block';
                            flonew.querySelector('span').style.display='none';
                            flonew.querySelector('input').select();
                            flonew.style.top=ev.pageY+'px'
                            flonew.style.left=ev.pageX+'px'
                            flonew.querySelector('img').style.height=li1+'px'
                            flonew.style.height=li2+'px'
                            flonew.style.width=li3+'px'
                            flonew.querySelector('span').style.width=li3+'px'
                            flonew.querySelector('span').style.fontSize=li4+'px'
                            flonew.querySelector('input').onblur=function(){
                                var lll=rep(flonew.querySelector('input'),flonew.querySelector('span'))
                                if(lll){
                                    flonew.querySelector('input').style.display='none';
                                    flonew.querySelector('span').style.display='block';
                                    flonew.querySelector('span').innerText=flonew.querySelector('input').value
                                    flonew.setAttribute('namel',data.logo.length)
                                    data.logo.push({id:data.logo.length,image:'Folder.png',font:flonew.querySelector('input').value,name:'Folder',dong:'dN',pid:0})
                                    render()
                                }                 
                            }                  
                        }
                        //主题-1
                        if(clickvalue=='主题-1'){
                            zhuti=zhuti1
                            zhuti1.forEach(e=>{
                                var Lis=Array.from(document.querySelectorAll('.'+e.name +''))
                                Lis.forEach(el=>{
                                    if(el.querySelector('img')){
                                        el.querySelector('img').src='img/'+e.image+''
                                        data.logo.forEach(ez=>{
                                            if(ez.id==el.getAttribute('namel')){
                                                ez.image=e.image
                                            }
                                        })
                                    }else{
                                        el.src='img/'+e.image+''
                                        data.bot.forEach(ez=>{
                                            if(ez.id==el.getAttribute('namel')){
                                                ez.image=e.image
                                            }
                                        })
                                    }
                                    
                                })
                                console.log(data)
                            })
                            box.style.background='url(img/d.jpg)'
                            box.style.backgroundSize=''+ document.documentElement.clientWidth+'px '+ document.documentElement.clientHeight+'px'
                        }
                        //主题-2
                        if(clickvalue=='主题-2'){
                        zhuti=zhuti2              
                        zhuti2.forEach(e=>{
                            var Lis=Array.from(document.querySelectorAll('.'+e.name +''))
                            Lis.forEach(el=>{
                                if(el.querySelector('img')){
                                    el.querySelector('img').src='img/'+e.image+''
                                    data.logo.forEach(ez=>{
                                        if(ez.id==el.getAttribute('namel')){
                                            ez.image=e.image
                                        }
                                    })
                                }else{
                                    el.src='img/'+e.image+''
                                    data.bot.forEach(ez=>{
                                        if(ez.id==el.getAttribute('namel')){
                                            ez.image=e.image
                                        }
                                    })
                                }                               
                            })
                            console.log(data)
                        })
                        box.style.background='url(img/bg4.jpg)'
                        box.style.backgroundSize=''+ document.documentElement.clientWidth+'px '+ document.documentElement.clientHeight+'px'
                    }
                    //主题-3
                    if(clickvalue=='主题-3'){
                        zhuti=zhuti3             
                        zhuti3.forEach(e=>{
                            var Lis=Array.from(document.querySelectorAll('.'+e.name +''))
                            Lis.forEach(el=>{
                                if(el.querySelector('img')){
                                    el.querySelector('img').src='img/'+e.image+''
                                    data.logo.forEach(ez=>{
                                        if(ez.id==el.getAttribute('namel')){
                                            ez.image=e.image
                                        }
                                    })
                                }else{
                                    el.src='img/'+e.image+''
                                    data.bot.forEach(ez=>{
                                        if(ez.id==el.getAttribute('namel')){
                                            ez.image=e.image
                                        }
                                    })
                                }
                                
                            })
                            console.log(data)
                        })
                        box.style.background='url(img/bg3.jpg)'
                        box.style.backgroundSize=''+ document.documentElement.clientWidth+'px '+ document.documentElement.clientHeight+'px'
                    }
                    ev.cancelBubble = true;
                    }      
                }           
            }
            return false;
        }        
    };
    document.onclick = function(){
        boxr.style.display = 'none';
    } 
}

//图标上右键菜单
function liyouji(){
    const logolis = Array.from(logo.getElementsByTagName('li'));
    const logocaidan = document.getElementById("logocaidan");
    const logocaidanS = Array.from(logocaidan.querySelectorAll(".logocaidanS"));
    logolis.forEach(e=>{
        e.oncontextmenu = function (ev){
            logocaidan.style.zIndex='101'
            logocaidan.style.display = "block";
            logocaidan.style.left = ev.pageX +"px";
            logocaidan.style.top = ev.pageY +"px";
            logocaidanS.forEach(el=> {
                el.onclick = function (eve) {
                    logocaidan.style.display = "none";
                    var vvv=eve.target.innerText
                    if(vvv=='打开'){
                        //Zip
                        if(e.className.includes('Zip')){                  
                                var Bags=Array.from(document.querySelectorAll('.bag'))
                                console.log(Bags)
                                var eclassN=e.className.split(' ')
                                console.log(eclassN)                                
                                Bags.forEach(el=>{
                                    eclassN.forEach(ee=>{
                                        if(el.classList.contains(ee)){
                                            el.style.display='block'
                                            var Bl=e.offsetLeft;
                                            var Bt=e.offsetTop;
                                            if(e.offsetTop+350>document.documentElement.clientHeight){
                                                Bt=document.documentElement.clientHeight-350
                                            }
                                            if(e.offsetLeft+350>document.documentElement.clientWidth){
                                                Bl=document.documentElement.clientWidth-350
                                            }   
                                            el.style.top=Bt+'px';
                                            el.style.left=Bl+e.scrollWidth+'px'; 
                                            var bagslis=Array.from(el.querySelectorAll('li'))
                                            bagslis.forEach((eb,i)=>{
                                                j=i%3
                                                i=Math.floor(i/3)
                                                eb.style.top=i*110+'px';
                                                eb.style.left=j*110+'px';                 
                                            })
                                        }
                                    })                   
                                })
                            }
                        //cal
                        if(e.className.includes('calculator')){
                            e.style.zIndex=102
                            calcyun()
                        }
                        //WeNet
                        if(e.className.includes('Net')){
                            weNetyaya();
                        }
                          //Music
                        if(e.className.includes('Music')){
                            var outLx=document.querySelector('.outLx');	
                            outLx.style.display='block';
                            var spanLx=document.querySelector('.spanLx');
                            //点击关闭按钮
                            spanLx.onclick=function(){
                                //音乐盒子隐藏
                                outLx.style.display='none';
                            }
                        }
                        //Notes
                        if(e.className.includes('Notes')){
                            note = Array.from(document.querySelectorAll(".nb-note"));
                            if(note.length<=1){
                                var nbx = Math.random()*document.documentElement.clientWidth;
                                var nby = Math.random()*document.documentElement.clientHeight;
                                var newnote = note[note.length-1].cloneNode(true)
                                newnote.style.display='block'
                                newnote.style.right = nbx > document.documentElement.clientWidth - 300 ? document.documentElement.clientWidth - 300 : nbx + "px";
                                newnote.style.top = nby > document.documentElement.clientHeight -300 ? document.documentElement.clientHeight -300 : nby + "px";  
                                body.insertBefore(newnote,note[note.length-1]);
                            }
                            note = Array.from(document.querySelectorAll(".nb-note"));
                            foeach();
                        }
                        //pic
                        if(e.className.includes('Pictures')){
                            pholqw.style.display='block';
                            pholqw.style.zIndex='100'
                            pholqw.style.top=(document.documentElement.clientHeight-pholqw.scrollHeight)/2+'px'
                            pholqw.style.left=(document.documentElement.clientWidth-pholqw.scrollWidth)/2+'px'
                            headerlqw.querySelector('span').onclick=function(){
                                pholqw.style.display='none';
                            }
                        }
                        //game
                        if(e.className.includes('game')){
                            xiaokongl()
                            PaneLi.style.display='block'
                            var closeLi=PaneLi.querySelector('.closeLi')
                            PaneLi.style.top=(document.documentElement.clientHeight-PaneLi.scrollHeight)/2+'px'
                            PaneLi.style.left=(document.documentElement.clientWidth-PaneLi.scrollWidth)/2+'px'
                            closeLi.onclick=function(){
                                PaneLi.style.display='none'                     
                            }
                        }
                        //date time
                        if(e.className.includes('date')||e.className.includes('time')){
                            dat.style.display='block'
                            lyhtime()
                            closs.onclick=function(){
                                dat.style.display='none'                     
                            }
                        } 

                        }
                        if(vvv=='关闭'){
                            //Zip
                            if(e.className.includes('Zip')){                  
                                var Bags=Array.from(document.querySelectorAll('.bag'))
                                console.log(Bags)
                                var eclassN=e.className.split(' ')
                                console.log(eclassN)                                
                                Bags.forEach(el=>{
                                    eclassN.forEach(ee=>{
                                        if(el.classList.contains(ee)){
                                            el.style.display='none'
                                        }
                                    })                   
                                })
                            }
                            //cal
                            if(e.className.includes('calculator')){
                                calc.style.display = 'none';
                            }
                            //WeNet
                            if(e.className.includes('Net')){
                                document.querySelector('.webBox').style.display='none'
                            }
                            //Music
                            if(e.className.includes('Music')){
                                var outLx=document.querySelector('.outLx');	
                                outLx.style.display='none';
                            }
                            //Notes
                            if(e.className.includes('Notes')){
                                note = Array.from(document.querySelectorAll(".nb-note"));
                                note.forEach((e,i)=>{
                                    if(i>0){
                                        e.remove()
                                    }else{
                                        e.style.display='none'
                                    }                                 
                                })
                            }
                            //pic
                            if(e.className.includes('Pictures')){
                                pholqw.style.display='none';
                            } 
                            //game
                            if(e.className.includes('game')){
                                    PaneLi.style.display='none'                     
                            }
                            //date time
                            if(e.className.includes('date')||e.className.includes('time')){
                                    dat.style.display='none'                     
                            }                                                                          

                        }
                        if(vvv=='删除'){
                            data.logo.splice(e.getAttribute('namel')*1,1)
                            e.remove();                       
                            data.logo.forEach((e,i)=>{
                                Array.from(document.querySelectorAll('.'+e.name+'')).forEach(el=>{
                                    el.setAttribute('namel',i)
                                })
                                e.id=i
                            })
                            console.log(data.logo)
                        }
                        if(vvv=='新建快捷方式'){
                            var namel=e.getAttribute('namel')*1
                            data.logo.push({id:data.logo.length,image:data.logo[namel].image,font:data.logo[namel].font+'的替身',name:data.logo[namel].name,dong:"dN"})
                            console.log(data)
                            render()
                            logo.lastElementChild.querySelector('span').style.display='none';
                            logo.lastElementChild.querySelector('input').style.display='block';  
                            logo.lastElementChild.querySelector('input').select();
                            logo.lastElementChild.querySelector('input').value=logo.lastElementChild.querySelector('span').innerText
                            logo.lastElementChild.querySelector('input').onblur=function(){
                                var lll=rep(logo.lastElementChild.querySelector('input'),logo.lastElementChild.querySelector('span'))
                                if(lll){
                                    console.log(1111)
                                    logo.lastElementChild.querySelector('input').style.display='none';
                                    logo.lastElementChild.querySelector('span').style.display='block';
                                    logo.lastElementChild.querySelector('span').innerText=logo.lastElementChild.querySelector('input').value
                                }  
                            }
                        }
                    }             
            })
            return false;
        }
    })
    document.addEventListener('click',function(){
        logocaidan.style.display = "none";
    })
}
