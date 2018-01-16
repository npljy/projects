// 将秒数转换为分钟数
function totime(num){
    num = parseInt(num);
    var m = Math.floor(num / 60);
    m <10 ? m = "0"+m : m;
    var s = num % 60;
    s <10 ? s = "0"+s : s;
    return m+":"+s;
}

// 获取一个不等于 num 的随机数
function randNum(nu){
    var num = parseInt(Math.random()*4);
    if( !isNaN(nu) && num != nu ){
        return num;
    }
    else{
        return randNum(nu);
    }
    
}