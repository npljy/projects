// 将秒数转换为分钟数
function totime(num){
    num = parseInt(num);
    var m = Math.floor(num / 60);
    m <10 ? m = "0"+m : m;
    var s = num % 60;
    s <10 ? s = "0"+s : s;
    return m+":"+s;
}
