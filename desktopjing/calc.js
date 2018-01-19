//双击图标

function calcyun(){
    calc.style.display = 'block';
    setTimeout(function () {
        calc.style.opacity = 1;
    },30)
}
//事件委托
ulo.prevBtn = null;             //上一个按的是否为运算符
let num1 = null;                //数字1
let pSymbol = null;             //上一个运算符
let equal = null;               //上一次按的是什么
let dotOnoff = false;           //上次是否按了'.'
let isdb = [false,false];      //是否连续按运算符
let dbNum = 0;                 //记录按运算符
ulo.onclick = function (ev) {
    let tv = ev.target.innerText; //点击的哪个按钮
    let vv = result.innerText;   //结果 输入框 的值

    //上一次按的是否为运算符
    if(isCalc(tv)){
        ulo.prevBtn = true;
        isdbsy();     //把按的存在数组中
    }



    switch (tv){
        //按CE
        case 'CE':
            result.innerText = 0;
            if(equal=='='){    //上一次按的是=号的时候
                formula.innerText = '';
                num1 = null;
                // pSymbol = null;
                fontSize();
            }
            break;
        case 'C':
            result.innerText = 0;
            formula.innerText = '';
            num1 = null;
            pSymbol = null;
            fontSize();
            break;
        case '←':
            backspace(vv);
            fontSize();
            break;
        case '.':
            dot(vv,ulo.prevBtn);
            break;
        case '±':
            pOrm(vv);
            break;
        case '+':
            calcFn(tv,vv);
            fontSize();
            break;
        case '－':
            calcFn(tv,vv);
            fontSize();
            break;
        case '×':
            calcFn(tv,vv);
            fontSize();
            break;
        case '÷':
            calcFn(tv,vv);
            fontSize();
            break;
        case '=':
            formula.innerText = '';
            //num1不为空，不连续按'='号，运算符不能为空
            if(num1 && equal != tv && pSymbol != null){
                num1 = result.innerText = start(num1,pSymbol,vv);
            }else {
                result.innerText = vv;
            }
            fontSize();
            break;
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
    //数字
    if(isNum(tv)){
        if(vv=='0' || ulo.prevBtn){
            if(dotOnoff){
                result.innerText += tv;  //上一次按了运算符，接着按点，显示的是'0.'
            }else {
                result.innerText = tv;  //上一次按了运算符，输入的数字直接显示，不累加
            }
            dotOnoff = false;
            ulo.prevBtn = false;
            isdbsy();  //把按的存在数组中,这次ulo.prevBtn = false，代表不是连续按运算符
            fontSize(); //字体大小
        }else {
            //最多能输入14位数
            if(result.innerText.length<14){
                result.innerText += tv;  //否则就是连续输入数字。
            }
            fontSize(); //字体大小
        }
    }

    equal = tv; //上一次按的是什么

    return false;

}


//拖拽
move(calc);

//关闭
closeSpan.onclick = function () {
    calc.style.opacity = 0;
    setTimeout(function () {
        calc.style.display = 'none';
    },500)
}

//折叠按钮
fold.onOff = true;
fold.onclick = function () {
    fold.onOff = !fold.onOff;
    if(!fold.onOff){
        author.style.display = 'block';
        setTimeout(function () {
            author.style.opacity = 1;
        },30)
    }else {
        author.style.opacity = 0;
        setTimeout(function () {
            author.style.display = 'none';
        },500)
    }

}

//消除浏览器默认行为
calc.onmousemove = function () {
    return false;
}





