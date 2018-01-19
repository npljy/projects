let calc_logo = document.getElementById('calc_logo');
let calc = document.getElementById('calc');
let calcHead = document.getElementById('calc_head');
let closeSpan = calcHead.getElementsByClassName('head_r')[0].getElementsByTagName('span')[0];
let author = document.getElementById('author');
let fold = document.getElementById('folding').getElementsByTagName('span')[0];    //折叠按钮
let result = document.getElementById('results_b').getElementsByTagName('span')[0]; //输入和显示结果
let formula = document.getElementById('results_t').getElementsByTagName('span')[0]; //算式
let ulo = document.getElementById('enter');

//按 ← 函数
function backspace(vv) {
    if(vv!=0 && vv.length==1){
        result.innerText = 0;                       //没有的时候显示0
    }else if(vv.length>1){
        result.innerText = vv.slice(0,vv.length-1); //每按一次减最后一个
    }
}

//按 . 函数
function dot(vv,prevBtn) {
    if(prevBtn){
        num1 = result.innerText;     //把结果存在num1中
        result.innerText = '0.';    //如果上一次按的是运算符内容 = '0.'
        dotOnoff = true;
    }else if(!iDot(vv)){
        result.innerText += '.';
    }

    //检测数值有没有包含 .
    function iDot(str) {
        if(str.includes('.')){
            return true;
        }else {
            return false;
        }
    }
}

//按 ±
function pOrm(vv) {
    if(vv[0] != '-'){
        result.innerText = '-' + vv;
    }else {
        result.innerText = vv.slice(1);
    }
}

// + - * / 函数
function calcFn(symbol,vv) {

    let fv = formula.innerText;  //算式显示
    let dbs = isdb.every(e=>e);  //检测是否连续按运算符

    //***初始num1为空。判断num1是否为空,检测是否连续按运算符
    if(num1 && ulo.prevBtn && !dbs){
        num1 = result.innerText = start(num1,pSymbol,vv);
        pSymbol = symbol
    }else {
        num1 = vv;        //num1为空。先走这里
        pSymbol = symbol;
    }

    //显示算式
    if(vv!='0' && dbs && equal!='=') {
        //并且上次按不是 = 号
        //连续按运算符,前边的内容不变，后面的运算符可以修改
        formula.innerText = ' ' + fv.slice(0, fv.length - 1) + ' ' + symbol + ' ';
    }else {
        formula.innerText += ' ' +  vv + ' '  + symbol + ' '; //正常运算
    }

    fontSize();
}

//运算
function start(num1,symbol,num2) {
    if(symbol=='+') {
        let val = parseFloat(num1) + parseFloat(num2);
        return isFloat(val)? clearZero(val.toFixed(12)):val; //如果是小数就保留12位
    }
    if(symbol=='－') {
        let val = parseFloat(num1) - parseFloat(num2);
        return isFloat(val)? clearZero(val.toFixed(12)):val;
    }
    if(symbol=='×') {
        let val = parseFloat(num1) * parseFloat(num2);
        return isFloat(val)? clearZero(val.toFixed(12)):val;
    }
    if(symbol=='÷') {
        let val = parseFloat(num1) / parseFloat(num2);
        return isFloat(val)? clearZero(val.toFixed(12)):val;
    }
}

//点击的按钮是否为数字。 返回布尔值
function isNum(str) {
    return isNaN(str)? false : true;
}

//判断按是不是 + - * /。返回布尔值
function isCalc(tv) {
    if(tv=='+' || tv=='－' || tv=='×' || tv=='÷' || tv=='='){
        return true;
    }else {
        return false;
    }
}

//判断是否连续按运算符
function isdbsy() {
    dbNum++;
    dbNum %=2;
    isdb[dbNum] = ulo.prevBtn;
}

//拖拽函数
function move(obj) {
    calcHead.onmousedown = function (ev) {
        calc.style.transition = 'none';
        //box点击时获取鼠标至box外边框的距离
        let pageX = ev.pageX - obj.offsetLeft;
        let pageY = ev.pageY - obj.offsetTop;

        //移动的距离 = 当前鼠标的距离 - 鼠标至box外边框的距离
        //move、up的时候绑在document身上就能解决快速移动和没在元素本身释放的bug
        document.onmousemove = function (eve) {
            obj.style.top = (eve.pageY - pageY) + 'px';
            obj.style.left = (eve.pageX - pageX) + 'px';
        };

        //document 抬起的时候
        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
            calc.style.transition = '0.5s';
        };

        return false;
    }
}

//如果span的长度超出就减小字体大小
function fontSize() {
    if(result.scrollWidth>320 || result.innerText.length>14){
        result.style.fontSize = '20px';
    }else {
        result.style.fontSize = '32px';
    }
}

//判断是否为小数
function isFloat(obj){return Math.floor(obj)!==obj}

//把后面的0去除
function clearZero(str) {
    while(str.endsWith('0')){
        str = str.substring(0,str.length-1);
    }
    return str;
}
