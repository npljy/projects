window.onload = function () {
    var body = document.getElementById("body");
    var headH = document.getElementById("head").offsetHeight;
    var section = document.getElementById("section");
    var root = document.querySelector(".root");
    var lis = root.getElementsByTagName("li");
    var fempty = document.getElementById("fempty");
    var folders = newFunction();
    var curpage = document.getElementById("curpage");
    var divs = Array.from(folders.querySelectorAll(".file-item"));
    var imgs = body.getElementsByTagName("img");
    var chkall = document.getElementById("chkall");
    var share = document.getElementById("share");
    var mtree = document.getElementById("mtree");
    var move = document.getElementById("move");
    var mcnt = document.getElementById("mcnt");
    var mipts = mtree.getElementsByTagName("input");
    var rename = document.getElementById("rename");
    var del = document.getElementById("del");
    var tanbox = document.getElementById("tanbox");
    var delas = tanbox.getElementsByTagName("a");
    var create = document.getElementById("create");
    var refresh = document.getElementById("refresh");
    var rtmenu = document.getElementById("yj-list");
    var tip = document.getElementById("tip");
    var tiptxt = document.getElementById("tiptxt");
    var tar = document.getElementById("tar");
    var showtime = document.getElementById("show");
    var sort = document.getElementById("sort");
    var timer = null;
    var timerT = null;
    var gid; // 全局 id
    var cntStr = "";// 存右侧内容
    // 初始化 ↓
    init();
    addNav(window.location.hash.substring(1).split("=")[1]);
    renderRight(window.location.hash.substring(1).split("=")[1]);
    addck();//添加右侧点击事件
    // 初始化 ↑
    
    // 给 div 添加 单击 和 双击 和 右击 事件
    function addck() {
        divs = Array.from(folders.querySelectorAll(".file-item"));
        imgs = body.getElementsByTagName("img");
        folders.onmousedown = function (ev) {
            // 框选
            bong(ev);
        }
        var ipts = folders.getElementsByTagName("input");
        for (var i = 0, iptslen = ipts.length; i < iptslen; i++) {
            ipts[i].onmousedown = function () {
                return false;
            }
        }
        divs.forEach(e => {
            // 取消每个div的 onmousedown 默认事件， 防止在div上拖动框选
            e.onmousedown = function (ed) {
                ed.stopPropagation ? ed.stopPropagation() : ed.cancelBubble = true;
                return false;
            }
        })
        for (var i = 0, imglen = imgs.length; i < imglen; i++) {
            // 取消图片默认行为
            imgs[i].onmousedown = function (ed) {
                return false;
            }
        }
        // 每个按钮添加 单击，双击，右击
        for (var i = 0, dlen = divs.length; i < dlen; i++) {
            divs[i].onclick = function () {
                ck(this);
            }
            divs[i].ondblclick = function () {
                dbck(this);
            }
            divs[i].oncontextmenu = function (ev) {
                rtck(this, ev);
                return false;
            }
            //取消重命名输入框的单击冒泡行为
            divs[i].querySelector("input").onclick = function (ev) {
                ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
            };
            // input 的 onkeydown 事件
            divs[i].querySelector("input").onkeydown = function (ev) {
                clearTimeout(timer);
                clearTimeout(timerT);
                var _this = this.parentElement;
                if (ev.keyCode == 13) {
                    rns(_this);                   
                }
            };
            // input 的 onblur 事件
            divs[i].querySelector("input").onblur = function (ev) {
                clearTimeout(timer);
                clearTimeout(timerT);
                var _this = this.parentElement;
                rns(_this);
            };
            //取消span的单击冒泡行为
            divs[i].querySelector("span").onclick = function (ev) {
                ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
            };
            //取消重命名输入框的双击冒泡行为
            divs[i].querySelector("span").ondblclick = function (ev) {
                ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
                rnfn(this.parentElement);
            };
        }
    }

    //全选按钮
    chkall.onclick = function () {
        divs = Array.from(folders.querySelectorAll(".file-item"));
        this.classList.toggle("checked");
        this.classList.contains("checked") ? divs.forEach(e => { e.getElementsByTagName("i")[0].classList.add("checked"); e.classList.toggle("active"); }) : divs.forEach(e => { e.getElementsByTagName("i")[0].classList.remove("checked"); e.classList.toggle("active"); });
    }

    //移动
    move.onclick = function () {
        clearTimeout(timer);
        clearTimeout(timerT);
        var chkednum = folders.querySelectorAll(".checked").length;
        if (chkednum > 0) {
            mtree.style.display = "block";
            mcnt.innerHTML = root.innerHTML;
            Array.from(mcnt.children).forEach(e => e.style.display = "");
        }
        else {
            tips("请选择需要移动的文件或目录","err");
            return;
        };
        mv();
    }

    //移动 方法
    function mv(obj) {
        var trdiv = Array.from(mcnt.querySelectorAll("div"));
        var oldtr = null;
        var chkid;

        trdiv.forEach(e => {
            e.onclick = function () {
                // 定点删除
                oldtr && oldtr.classList.remove("act");
                this.classList.add("act");
                tar.innerText = this.innerText;
                chkid = pn(this.parentElement.getAttribute("oid"));
                oldtr = this;
            }
        });

        mipts[1].onclick = function () {
            clearTimeout(timer);
            clearTimeout(timerT);
            gid = pn(window.location.hash.substring(1).split("=")[1]) || 0;
            if(chkid == undefined){
                tips("请选择目标目录","err");
                return;
            }
            if (isson(obj,chkid)) {
                tar.innerText = "请选择目标目录";
                tips("不能移动到本身中","err");
                mtree.style.display = "none";
                init();
                return;
            }
            else {
                tips("移动文件夹成功");
            }
            // 获取菜单中的oid，并将选中的目标的pid改为菜单中选中的的oid
            divs = Array.from(folders.querySelectorAll(".file-item"));
            if (obj) { // 右键菜单移动一个
                obj.setAttribute("pid", chkid);
                data["" + obj.getAttribute("oid")].pid = chkid;
            }
            else {// 多选移动多个
                divs.forEach(e => {
                    if (e.getElementsByTagName("i")[0].classList.contains("checked")) {
                        if (e.getAttribute("oid") == chkid || isson(e,chkid)) {
                            tips("不能移动到本身中","err");
                        }
                        else {
                            e.setAttribute("pid", chkid);
                            data["" + e.getAttribute("oid")].pid = chkid;
                        }
                    }
                });
            }
            //重新生成左侧树 并添加点击事件
            init();
            addNav(gid);
            renderRight(window.location.hash.substring(1).split("=")[1]);
            addck();//添加右侧点击事件
            tar.innerText = "微云";
            mtree.style.display = "none";
        }
        mipts[0].parentElement.nextElementSibling.onclick = mipts[0].onclick = function () {
            mtree.style.display = "none";
        }
    }
    // 重命名
    rename.onclick = function () {
        clearTimeout(timer);
        clearTimeout(timerT);
        chked = folders.querySelectorAll(".checked");
        if (chked.length == 1) {
            rnfn(chked[0].parentElement);
        }
        else if(chked.length > 1){
            tips("只能同时重命名一个文件夹","err");
        }
        else{
            tips("请选择需要重命名的文件夹","err");
        }
    };
    //重命名方法
    function rnfn(obj) {
        obj.getElementsByTagName("span")[0].style.display = "none";
        obj.getElementsByTagName("input")[0].style.display = "block";
        obj.getElementsByTagName("input")[0].value = obj.getElementsByTagName("span")[0].innerText;
        obj.getElementsByTagName("input")[0].focus();
        addck();
    }
    // // 鼠标 框选
    function bong(ea) {
        var odiv = document.createElement("div");
        odiv.className = "kuang";
        odiv.style.display = "none";
        folders.appendChild(odiv);
        divs = Array.from(folders.querySelectorAll(".file-item"));
        odiv.style.width = 0;
        odiv.style.height = 0;
        var dx = ea.pageX;
        var dy = ea.pageY;
        folders.onmousemove = function (eb) {
            odiv.style.display = "block";
            var disX = eb.pageX;
            var disY = eb.pageY;
            odiv.style.width = Math.abs(disX - dx) + "px";
            odiv.style.height = Math.abs(disY - dy) + "px";
            odiv.style.left = Math.min(dx, eb.pageX) + "px";
            odiv.style.top = Math.min(dy, eb.pageY) - headH + "px";
            divs.forEach(e => {
                if (e != odiv) {
                    if (kiss(odiv, e)) {
                        e.getElementsByTagName("i")[0].classList.add("checked");
                        e.classList.add("active");
                        divs.every(el => el.getElementsByTagName("i")[0].classList.contains("checked")) ? chkall.classList.add("checked") : chkall.classList.remove("checked");
                    }
                    else {
                        e.getElementsByTagName("i")[0].classList.remove("checked");
                        e.classList.remove("active");
                        chkall.classList.remove("checked");
                    }
                }
            })
            return false;
        }
        document.onmouseup = function () {
            odiv.style.display = "none";
            document.onmouseup = folders.onmousemove = null;
        }
    }

    // 删除
    del.onclick = function () {
        var chkednum = folders.querySelectorAll(".checked").length;
        if (chkednum > 0) {
            tanbox.style.display = "block"
        }
        else {
            return;
        };
        de();
    }
    function de(obj) {
        delas[0].onclick = function () {
            clearTimeout(timer);
            clearTimeout(timerT);
            gid = pn(window.location.hash.substring(1).split("=")[1]) || 0;
            divs = Array.from(folders.querySelectorAll(".file-item"));
            if (obj) { //如果是右键菜单删除
                // 改变pid 或者直接删除
                data["" + obj.getAttribute("oid")].pid = -999;
                // for(a in data){
                //     if(data[a].pid == pn( obj.getAttribute("oid") ) ){
                //         delete data[a];
                //     }
                // }
                // delete data[""+obj.getAttribute("oid")];
            }
            else {//如果是 多选删除
                divs.forEach(e => {
                    if (e.getElementsByTagName("i")[0].classList.contains("checked")) {
                        // 改变pid 或者直接删除
                        data["" + e.getAttribute("oid")].pid = -999;
                    };
                });
            }
            tips("删除文件夹成功");
            init();
            addNav(gid);
            renderRight(window.location.hash.substring(1).split("=")[1]);
            addck();//添加右侧点击事件
            tanbox.style.display = "none";
        }
        delas[1].parentElement.parentElement.firstElementChild.onclick = delas[1].onclick = function () {
            tanbox.style.display = "none";
        }
    }
    // 新建
    create.onclick = function () {
        clearTimeout(timer);
        clearTimeout(timerT);
        chkall.classList.remove("checked");
        var newdate = new Date();
        var newobj = {};
        gid = pn(window.location.hash.substring(1).split("=")[1]) || 0;
        folders.innerHTML += '<div class="file-item" oid = "' + (+newdate) + '" pid = "' + gid + '"><img src="img/folder-b.png" alt="" /><span class="folder-name" style="display:none">新建文件夹</span><input type="text" class="editor" style = "display:block" value = "新建文件夹"/><i class=""></i></div>';
        newobj.id = pn(+newdate);
        newobj.pid = pn(gid);
        newobj.title = "新建文件夹";
        data["" + (+newdate)] = newobj;
        tips("新建文件夹成功");
        init();

        renderRight(window.location.hash.substring(1).split("=")[1]);
        addck();//添加右侧点击事件
    }
    //刷新
    refresh.onclick = function () {
        window.location.reload();
    }
    //左侧树点击事件，生成面包屑 和 右侧内容 ↓
    function lick(obj, ev) {
        var str = "";
        var _this = obj;
        var curArr = findParent(_this.getAttribute("oid"));
        var oid = pn(_this.getAttribute("oid")) ;
        gid = oid; // 将当前点击的栏目的 id 赋值 全局 gid
        // 添加面包屑 ↓  
        curArr.forEach((e, i) => {
            i == curArr.length - 1 ? str += "<span>" + e.title + "</span>" : str += "<a oid = '" + e.id + "' pid = '" + e.pid + "' href = 'javascript:'>" + e.title + "</a>";
        });
        curpage.innerHTML = str;
        var curs = Array.from(curpage.children);
        curs.forEach(e => {
            if (e.tagName == "A"){
                e.onclick = function () {
                    for (var i = 0; i < lis.length; i++) {
                        lis[i].getAttribute("oid") == e.getAttribute("oid") && lis[i].click();
                    }
                }
            }
        });
        if (oid != "undefined") {
           renderRight(oid);
        }

        addck();
        open(obj,ev)
        // 添加hash
        window.location.hash = "gid=" + gid;
        //阻止冒泡
        ev.stopPropagation ? ev.stopPropagation() : ev.cancelable = true;
    }
    //左侧树点击事件 ↑

    // 生成左侧树
    function init() {
        var renderstr = "";
        render(0);
        function render(a = 0) {
            renderstr += "<ul style='display:block'>";
            renderstr += '<li oid = "' + data[a].id + '" pid = "' + data[a].pid + '"><div class="tree-title tree-ico close"><span class="'+(findChild(a).length > 0 ? "open" : "")+'"><i></i>' + data[a].title + '</span></div>';
            findChild(a).forEach(e => {
                render(e);
            });
            renderstr += "</li></ul>";
        }
        root.innerHTML = renderstr;
        //点击左侧树 ，面包屑 跟随变化 ,右侧内容也跟着变化
        for (let i = 0, lilen = lis.length; i < lilen; i++) {
            lis[i].onclick = function (ev) {
                lick(lis[i], ev);
            }
        }
    }

    // 添加面包屑 ↓
    function addNav(id){
        for (var i = 0; i < lis.length; i++) {
            pn(lis[i].getAttribute("oid")) == pn(id) &&lis[i].click();
        }
    }
    // 添加面包屑 ↑

    // 右侧内容初始化 ↓
    function renderRight(id){
        cntStr = "";// 存右侧内容
        for (a in data) {
            pn(data[a].pid) == (pn(id) || 0 ) && (cntStr += '<div class="file-item" oid = "' + data[a].id + '" pid = "' + data[a].pid + '"><img src="img/folder-b.png" alt="" /><span class="folder-name">' + data[a].title + '</span><input type="text" class="editor"/><i class=""></i></div>');
        }
        cntStr ? (folders.innerHTML = cntStr, folders.style.display = "block", fempty.style.display = "none") : (folders.style.display = "none", fempty.style.display = "block");
    }
    // 右侧内容初始化 ↑

    //日期
    getToday(showtime);
    var timer = setInterval(function(){getToday(showtime)},1000); 

    //重命名成功
    function rns(obj){
        obj.getElementsByTagName("span")[0].style.display = "block";
        obj.getElementsByTagName("input")[0].style.display = "none";
        obj.getElementsByTagName("span")[0].innerText = obj.getElementsByTagName("input")[0].value;
        data["" + obj.getAttribute("oid")].title = obj.getElementsByTagName("input")[0].value;
        tips("重命名文件夹成功")
        init();
    }

    //右上角提示窗口
    function tips(str,err){
        err && tip.classList.add(err);
        tip.style.top = 0;
        tiptxt.innerText = str;
        timer = setTimeout(function () {
            tip.style.top = "-40px";
            err && (timerT = setTimeout(function () {
                tip.classList.remove(err);
            }, 500));
        }, 1000);
    }

    //右侧文件夹点击事件
    function ck(obj) {
        var soid = pn(obj.getAttribute("oid"));
        gid = soid; // 将当前点击的栏目的 id 赋值 全局 gid
        obj.classList.toggle("active");
        obj.getElementsByTagName("i")[0].classList.toggle("checked");
        divs = Array.from(folders.querySelectorAll(".file-item"));
        divs.every(e => e.getElementsByTagName("i")[0].classList.contains("checked")) ? chkall.classList.add("checked") : chkall.classList.remove("checked");
    }
    //右侧文件夹双击事件
    function dbck(obj) {
        chkall.classList.remove("checked");
        var soid = pn(obj.getAttribute("oid"));
        var _this = this;
        gid = soid; // 将当前点击的栏目的 id 赋值 全局 gid
        addNav(obj.getAttribute("oid"));
        addck();
    }
    //右侧文件夹右击事件，右键菜单
    function rtck(obj, ev) {
        rtmenu.style.display = "block";
        rtmenu.style.left = ev.pageX + 10 + "px";
        rtmenu.style.top = ev.pageY - section.getBoundingClientRect().top + 10 + "px";
        rtsps = Array.from(rtmenu.getElementsByTagName("span"));
        rtsps[1].onclick = function () {
            mtree.style.display = "block";
            mcnt.innerHTML = root.innerHTML;
            mv(obj);
            rtmenu.style.display = "none";
        }
        rtsps[2].onclick = function () {
            tanbox.style.display = "block";
            de(obj);
            rtmenu.style.display = "none";
        }
        rtsps[3].onclick = function () {
            rnfn(obj);
            rtmenu.style.display = "none";
        }
    }
    document.onclick = function (ev) {
        rtmenu.style.display = "none";
    }
    rtmenu.onclick = function (ev) {
        ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
        return false;
    }
    // 左侧树 展开关闭
    function open(obj,ev){
        if(ev.target.tagName == "LI" || ev.target.tagName == "SPAN"){
            // 将自身的ul 显示出来
            // obj.getElementsByTagName("span")[0].classList.toggle("open");
            Array.from(obj.getElementsByTagName("ul")).forEach(e => {
                if( e.firstElementChild.getAttribute("pid") == obj.getAttribute("oid") ){
                    // e.style.display == "block" ?  e.style.display = "none" : e.style.display = "block";  
                    e.style.display == "block" ?  e.style.display = "block" : e.style.display = "block"; 
                }  
            });
        }
    }
}

function newFunction() {
    var folders = document.getElementById("folders");
    return folders;
}
