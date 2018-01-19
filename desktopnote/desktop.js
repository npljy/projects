// JavaScript Document

var data={
    logo: [
        {id:0,image:'date.png',font:'日历',name:'date',dong:'dN'},
        {id:1,image:'time.png',font:'时钟',name:'time',dong:'dN'},
        {id:2,image:'Pictures.png',font:'相册',name:'Pictures',dong:'dN'},
        {id:3,image:'game.png',font:'小游戏',name:'game',dong:'dN'},
        {id:4,image:'Music.png',font:'音乐播放器',name:'Music',dong:'dN'},
        {id:5,image:'Net.png',font:'浏览器',name:'Net',dong:'dN'},
        {id:6,image:'game_2048.png',font:'2048',name:'game_2048',dong:'dN'},
        {id:7,image:'snake.png',font:'贪吃蛇',name:'snake',dong:'dN'},
        {id:8,image:'Notes.png',font:'便签',name:'Notes',dong:'dN'},
        {id:9,image:'Folder.png',font:'文件夹',name:'Folder',dong:'dN'},
        {id:10,image:'Smart.png',font:'设置',name:'Smart',dong:'dN'},
        {id:11,image:'calculator.png',font:'计算器',name:'calculator',dong:'dN'}
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
render();
//窗口
window.onresize = function(){
    var Lis=Array.from(logo.querySelectorAll('li'))
    var scrollH=Math.floor((document.documentElement.clientHeight)/120);
    Lis.forEach((e,i)=>{
        e.style.transition='0.5s'
        var j=Math.floor(i/scrollH)
        i=i%scrollH
       
        e.style.top=i*120+'px'
        e.style.left=j*94+'px'
        setTimeout(function(){
            e.style.transition=null
        },500)
    }) 
    bot.style.left=(document.documentElement.clientWidth-bot.scrollWidth)/2+'px'
}

function render(){
    var x=document.documentElement.clientHeight;
    var num=Math.floor(x/120);
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
            qq=pyon(e,arrPo,q,i,qq,num);
        }else{q++}
    })
    bot.innerHTML=''
    data.bot.forEach((e,i)=>{
        var str='<li><img src="img/'+ e.image+'" class='+e.name+'><span></span></li>'
        bot.innerHTML+=str;
    })
    console.log(document.documentElement.clientWidth)
    bot.style.left=(document.documentElement.clientWidth-bot.scrollWidth)/2+'px'
    var bot_lis=Array.from(bot.getElementsByTagName('li'));
    bot_lis.forEach((e,i)=>{
        e.onmouseenter=function(){
            img_change(e,'scale(1.2)','scale(1)','scale(0.9)',20,14,8)
            return false
        }
        e.onmouseleave=function(){
            img_change(e,'scale(0.7)','scale(0.7)','scale(0.7)',0,0,0,70,60)
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
    // remove()
} 
//
function pyon(e,arrPo,q,i,qq,num,h1=120,w1=94){
    if(e.dong=='dN'){
        var ii=i
        i=i-q+qq;
        var j=Math.floor(i/num)
        i=i%num;
        var str='<li style="left:'+j*w1+'px;top:'+i*h1+'px" class="'+e.name+'"  index="'+e.dong+'" namel="'+e.id+'"><img src="img/'+ e.image+'"><span>'+ e.font+'</span><input type="text" class="editor"/></li>'
        logo.innerHTML+=str;
        var lc={y: Math.round(logo.lastElementChild.offsetTop/120), x : Math.round(logo.lastElementChild.offsetLeft/94)}
        arrPo.forEach(el=>{
            if(el.x==lc.x&&el.y==lc.y){
                logo.lastElementChild.remove()
                qq++;
                pyon(e,arrPo,q,ii,qq,num)
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

        if(ev.target.tagName!='HTML')return
        var kuang=document.createElement('div')       
        kuang.className='kuang';     
        var pX=ev.pageX;
        var pY=ev.pageY;
        document.onmousemove=function(ev){       
           var lis=logo.children
           if(!box.querySelector('.kuang'))box.appendChild(kuang)
           var iH=Math.abs(ev.pageY-pY);
           var iW=Math.abs(ev.pageX-pX);
           kuang.style.height=iH+'px';
           kuang.style.width=iW+'px';
           var iL=Math.min(ev.pageX,pX)
           var iT=Math.min(ev.pageY,pY)
           kuang.style.top=iT+'px';
           kuang.style.left=iL+'px';
            for(var i=0;i<lis.length;i++){
                if(bong(lis[i],kuang)){
                    lis[i].classList.add('active');
                }else{
                    lis[i].classList.remove('active');
                }
            }
       }
       document.onmouseup=function(){
            document.onmousemove=document.onmouseup=null
            kuang.remove()
       }
       return false
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
        e.style.zIndex = 1;
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
            e.style.zIndex = 100;            
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
                            console.log(divv.scrollHeight)            
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
//刷新
document.ondblclick=function(){
    refresh()
}
function refresh(){
    var Lis=Array.from(logo.querySelectorAll('li'))
    Lis.forEach(e=>{
        var iT=e.offsetTop;
        var iL=e.offsetLeft;
        var numT=Math.round(iT/120);
        var numL=Math.round(iL/94);
        e.style.transition='0.5s'
        e.style.top=numT*120+'px';
        e.style.left=numL*94+'px';
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
          arrPo.push({y:Math.round(e.offsetTop/120),x:Math.round(e.offsetLeft/94)})        
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
            num++
            clEvent()
            clickLione()
            render()
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
    Liscl.forEach(e=>{
        //点击zip应该弹出bag
        if(e.className.includes('Zip')){
            e.addEventListener('dblclick',function(haha){
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
            })
        }
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
            e.style.zIndex='100'
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
        e.addEventListener('click',clickbot(e))   
    })  
    function clickbot(_this){
        _this.addEventListener('mousemove',movebot)  
        _this.addEventListener('mouseup',upbot)
        var disbt=_this.offsetTop
        var disbl=_this.offsetLeft
        function movebot(){
            var Lis=Array.from(logo.querySelectorAll('.active'))
            if(Lis.length==0||Lis.length>1)return;
            var botlis=bot.querySelectorAll('li')
            var bl=bot.offsetLeft;         
            Lis.forEach(e=>{           
                botlis.forEach(eb=>{
                    if(bong(eb,e)){
                        eb.classList.add('bang')
                    }else{
                        eb.classList.remove('bang')  
                    }  
                })            
            })
            eb=bot.querySelector('.bang')
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
            document.removeEventListener('mousemove',movebot)
            document.removeEventListener('mouseup',upbot)    
            if(bot.querySelector('.newli')){
                var n=bot.querySelector('.newli').getAttribute('index')
                bot.querySelector('.newli').innerHTML='<img src="img/'+ data.logo[n*1].image+'" class='+data.logo[n*1].name+'><span></span>'
                bot.querySelector('.newli').className=data.logo[n*1].name;
                var botlis=Array.from(bot.querySelectorAll('li'))
                botlis.forEach((e,i)=>{
                    if((e==bot.querySelector('.'+data.logo[n*1].name+''))&&(bot.querySelectorAll('.'+data.logo[n*1].name+'').length==2)){                   
                        data.bot.splice(i,0,{id:botlis.length,image:e.querySelector('img').className+'.png',name:e.querySelector('img').className})
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
        }
    }
}
//长按删除
function Libotremove(){
    var bots=Array.from(bot.querySelectorAll('li'))
    console.log('qq')
    bots.forEach((e,i)=>{
        console.log(e) 
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
