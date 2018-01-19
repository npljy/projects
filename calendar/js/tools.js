// 获取year年的mon月一共有几天。
function getMonthDays(y,m)
{
    var date = new Date(y,m,0);
    return date.getDate();
}
// 获取元素
function getEle(ele,parent=document){
    return parent.querySelectorAll(ele);
}