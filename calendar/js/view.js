window.onload = function(){
    var ca = getEle(".ca")[0];
    var ym = getEle(".title")[0];
    var date = new Date();
    var year = date.getFullYear();
    var mon = date.getMonth();
    var today = date.getDate();
    setDate(year,mon+5);

    function setDate(year,mon){
        ym.innerHTML = "<span>"+year+"</span><span>"+(mon+1)+"</span>"
        var str = "";
        // 获取当前月一共有几天
        var nowMon = getMonthDays(year,mon+1);
        // 获取上一个月一共有几天
        var prevMon = getMonthDays(year,mon);
        // 获取第一天是星期几
        var w1 = (new Date(year,mon,1)).getDay();
        // 获取最后一天是星期几
        var w2 = (new Date(year,mon+1,0)).getDay();
    
        // 循环上一个月的最后几天
        for (var i = prevMon - w1; i < prevMon; i++) {
            str += "<li class='prev'>" + (i + 1) + "</li>"
        }
        // 循环当前月
        for (var i = 0; i < nowMon; i++) {
            str += "<li class='now'>" + (i + 1) + "</li>"
        }
        // 循环下一个月的前几天
        for (var i = 0; i < (6 - w2); i++) {
            str += "<li class='next'>" + (i + 1) + "</li>"
        }
        ca.innerHTML = str;
    }
}// onload end ↑