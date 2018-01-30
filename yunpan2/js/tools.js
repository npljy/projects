/**
 *  碰撞事件
 */

  //框选碰撞事件
  function kiss(s, t) {
    // 移动源其余数据 ↓
    var sl = s.offsetLeft; // s 的offsetLeft
    var su = s.offsetTop;
    var sr = sl + s.offsetWidth;
    var sb = su + s.offsetHeight;
    // 移动源其余数据 ↑
    // 被撞目标数据 ↓
    var tl = t.offsetLeft; // t 的offsetLeft
    var tu = t.offsetTop; // T要大写
    var tr = tl + t.offsetWidth;
    var tb = tu + t.offsetHeight;
    // 被撞目标数据 ↑

    //碰撞开始 ↓
    if (sb < tu || su > tb || sr < tl || sl > tr) {
        return false;
    } else {
        return true;
    }
    // 碰撞开始 ↑
}

// 查找所有父级

function findParent(id){
    var arr = [];
    var _this = data[id];
    while(_this){
        arr.push(_this);
        _this = data[_this.pid]
    }
    return arr.reverse();
}

//查找子元素
function findChild(id){
    var arr = [];
    for(a in data){
        data[a].pid == id && arr.push(a);
    }
    return arr;
}

// 判断是否移动到 自身 或者 子目录中,判断 id元素 是否是obj的子元素
function isson(obj,id) {
    if (obj) {
        return obj.getAttribute("oid") == id || findChild(obj.getAttribute("oid")).some(el => el == id);
    }
    else {
        return false;
    }
}

//类型转换
function pn(n) {
    return parseInt(n);
}

//日期
function getToday(obj){
    var t = "";
    var day = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
    var date = new Date();
    var y = date.getFullYear();
    var m = todbl(date.getMonth()+1);
    var d = todbl(date.getDate());
    var h = todbl(date.getHours());
    var M = todbl(date.getMinutes());
    var s = todbl(date.getSeconds());
    var w = day[date.getDay()];
    t = ""+y+"年"+m+"月"+d+"日&nbsp;&nbsp;"+h+":"+M+":"+s+"&nbsp;&nbsp;"+w;
    obj.innerHTML = t ;
}

// 单位数添0
function todbl(n) {
    return n < 10 ? "0" + n : "" + n;
}