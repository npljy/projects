window.onload = function () {

    var body = document.getElementById("body");
    var headH = document.getElementById("head").offsetHeight;
    var section = document.getElementById("section");
    var root = document.getElementById("root");
    var lis = root.getElementsByTagName("li");
    var fempty = document.getElementById("fempty");
    var folders = document.getElementById("folders");
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

    init();
    function init() {
        var renderstr = "";
        render(0);
        function render(a = 0) {
            renderstr += "<ul>";
            renderstr += '<li oid = "' + data[a].id + '" pid = "' + data[a].pid + '"><div class="tree-title tree-ico close"><span class="' + (findChild(a).length ? "open" : "") + '"><i></i>' + data[a].title + '</span></div>';
            findChild(a).forEach(e => {
                render(e);
            });
            renderstr += "</li></ul>";
        }
        root.innerHTML = renderstr;
    }

    // 右侧内容初始化 ↓
    for (a in data) {
        pn(data[a].pid) == (pn(window.location.hash.substring(1).split("=")[1]) || 0 ) && (cntStr += '<div class="file-item" oid = "' + data[a].id + '" pid = "' + data[a].pid + '"><img src="img/folder-b.png" alt="" /><span class="folder-name">' + data[a].title + '</span><input type="text" class="editor"/><i class=""></i></div>');
    }
    cntStr ? (folders.innerHTML = cntStr, folders.style.display = "block", fempty.style.display = "none") : (folders.style.display = "none", fempty.style.display = "block");
    addck();//添加右侧点击事件
    // 右侧内容初始化 ↑
    //点击左侧树 ，面包屑 跟随变化 ,右侧内容也跟着变化
    for (let i = 0, lilen = lis.length; i < lilen; i++) {
        lis[i].onclick = function (ev) {
            lick(lis[i], ev);
        }
    }
    // 添加面包屑 ↓
    for (var i = 0; i < lis.length; i++) {
        pn(lis[i].getAttribute("oid")) == pn(window.location.hash.substring(1).split("=")[1]) && lis[i].click();
    }
    // 添加面包屑 ↑

    //点击事件
    function ck(obj) {
        var soid = pn(obj.getAttribute("oid"));
        gid = soid; // 将当前点击的栏目的 id 赋值 全局 gid
        obj.classList.toggle("active");
        obj.getElementsByTagName("i")[0].classList.toggle("checked");
        divs = Array.from(folders.querySelectorAll(".file-item"));
        divs.every(e => e.getElementsByTagName("i")[0].classList.contains("checked")) ? chkall.classList.add("checked") : chkall.classList.remove("checked");
    }
    //双击事件
    function dbck(obj) {
        chkall.classList.remove("checked");
        var soid = pn(obj.getAttribute("oid"));
        var _this = this;
        gid = soid; // 将当前点击的栏目的 id 赋值 全局 gid
        // 添加面包屑 ↓
        for (var i = 0; i < lis.length; i++) {
            lis[i].getAttribute("oid") == obj.getAttribute("oid") && lis[i].click();
        }
        // 添加面包屑 ↑
        addck();
    }
    //右击事件，右键菜单
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

    // 给 div 添加 单击 和 双击 事件
    function addck() {
        divs = Array.from(folders.querySelectorAll(".file-item"));
        imgs = body.getElementsByTagName("img");
        folders.onmousedown = function (ev) {
            bong(ev);
        }
        var ipts = folders.getElementsByTagName("input");
        for (var i = 0, iptslen = ipts.length; i < iptslen; i++) {
            ipts[i].onmousedown = function () {
                return false;
            }
        }
        divs.forEach(e => {
            e.onmousedown = function (ed) {
                ed.stopPropagation ? ed.stopPropagation() : ed.cancelBubble = true;
                return false;
            }
        })
        for (var i = 0, imglen = imgs.length; i < imglen; i++) {
            imgs[i].onmousedown = function (ed) {
                return false;
            }
        }
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
                    _this.getElementsByTagName("span")[0].style.display = "block";
                    _this.getElementsByTagName("input")[0].style.display = "none";
                    _this.getElementsByTagName("span")[0].innerText = _this.getElementsByTagName("input")[0].value;

                    data["" + _this.getAttribute("oid").toString()].title = _this.getElementsByTagName("input")[0].value;
                    tip.style.top = 0;
                    tiptxt.innerText = "重命名文件夹成功";
                    timer = setTimeout(function () {
                        tip.style.top = "-40px";
                    }, 1000);
                    //重新生成左侧树 并添加点击事件
                    init();
                    for (let i = 0, lilen = lis.length; i < lilen; i++) {
                        lis[i].onclick = function (ev) {
                            lick(lis[i], ev);
                        }
                    }
                }
            };
            // input 的 onblur 事件
            divs[i].querySelector("input").onblur = function (ev) {
                clearTimeout(timer);
                clearTimeout(timerT);
                var _this = this.parentElement;
                _this.getElementsByTagName("span")[0].style.display = "block";
                _this.getElementsByTagName("input")[0].style.display = "none";
                _this.getElementsByTagName("span")[0].innerText = _this.getElementsByTagName("input")[0].value;
                data["" + _this.getAttribute("oid")].title = _this.getElementsByTagName("input")[0].value;
                //重新生成左侧树 并添加点击事件
                init();
                for (let i = 0, lilen = lis.length; i < lilen; i++) {
                    lis[i].onclick = function (ev) {
                        lick(lis[i], ev);
                    }
                }
                tip.style.top = 0;
                tiptxt.innerText = "重命名文件夹成功";
                timer = setTimeout(function () {
                    tip.style.top = "-40px";
                }, 1000);
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

    // //分享
    // share.onclick = function(){}

    //移动
    move.onclick = function () {
        clearTimeout(timer);
        clearTimeout(timerT);
        var chkednum = folders.querySelectorAll(".checked").length;
        if (chkednum > 0) {
            mtree.style.display = "block";
            mcnt.innerHTML = root.innerHTML;
        }
        else {
            tip.classList.add("err");
            tip.style.top = 0;
            tiptxt.innerText = "请选择需要移动的文件或目录";
            timer = setTimeout(function () {
                tip.style.top = "-40px";
                timerT = setTimeout(function () {
                    tip.classList.remove("err");
                }, 500);
            }, 1000);
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
            if(chkid == undefined){
                tip.classList.add("err");
                tip.style.top = 0;
                tiptxt.innerText = "请选择目标目录";
                timer = setTimeout(function () {
                    tip.style.top = "-40px";
                    timerT = setTimeout(function () {
                        tip.classList.remove("err");
                    }, 500);
                }, 1000);
                return;
            }
            // 判断是否移动到 自身 或者 子目录中
            function isson(obj) {
                if (obj) {
                    return obj.getAttribute("oid") == chkid || findChild(obj.getAttribute("oid")).some(el => el == chkid);
                }
                else {
                    return false;
                }
            }

            if (isson(obj)) {
                tar.innerText = "请选择目标目录";
                //提示框
                tip.classList.add("err");
                tip.style.top = 0;
                tiptxt.innerText = "不能移动到本身中";
                timer = setTimeout(function () {
                    tip.style.top = "-40px";
                    timerT = setTimeout(function () {
                        tip.classList.remove("err");
                    }, 500);
                }, 1000);
                tar.innerText = "请选择目标目录";
                mtree.style.display = "none";
                init();
                return;
            }
            else {
                tip.style.top = 0;
                tiptxt.innerText = "移动文件夹成功";
                timer = setTimeout(function () {
                    tip.style.top = "-40px";
                }, 1000);
            }
            // 获取菜单中的oid，并将选中的目标的pid改为菜单中选中的的oid
            divs = Array.from(folders.querySelectorAll(".file-item"));
            if (obj) {
                obj.setAttribute("pid", chkid);
                data["" + obj.getAttribute("oid")].pid = chkid;
            }
            else {
                divs.forEach(e => {
                    if (e.getElementsByTagName("i")[0].classList.contains("checked")) {
                        if (e.getAttribute("oid") == chkid || isson(e)) {
                            tip.classList.add("err");
                            tip.style.top = 0;
                            tiptxt.innerText = "不能移动到本身中";
                            timer = setTimeout(function () {
                                tip.style.top = "-40px";
                                timerT = setTimeout(function () {
                                    tip.classList.remove("err");
                                }, 500);
                            }, 1000);
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
            for (let i = 0, lilen = lis.length; i < lilen; i++) {
                lis[i].onclick = function (ev) {
                    lick(lis[i], ev);
                }
            }
            // 右侧内容初始化 ↓
            cntStr = "";
            for (a in data) {
                pn(data[a].pid) == (pn(window.location.hash.substring(1).split("=")[1]) || 0) && (cntStr += '<div class="file-item" oid = "' + data[a].id + '" pid = "' + data[a].pid + '"><img src="img/folder-b.png" alt="" /><span class="folder-name">' + data[a].title + '</span><input type="text" class="editor"/><i class=""></i></div>');
            }
            cntStr ? (folders.innerHTML = cntStr, folders.style.display = "block", fempty.style.display = "none") : (folders.style.display = "none", fempty.style.display = "block");
            addck();//添加右侧点击事件
            // 右侧内容初始化 ↑
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
            tip.classList.add("err");
            tip.style.top = 0;
            tiptxt.innerText = "只能同时重命名一个文件夹";
            timer = setTimeout(function () {
                tip.style.top = "-40px";
                timerT = setTimeout(function () {
                    tip.classList.remove("err");
                }, 500);
            }, 1000);
        }
        else{
            tip.classList.add("err");
            tip.style.top = 0;
            tiptxt.innerText = "请选择需要重命名的文件夹";
            timer = setTimeout(function () {
                tip.style.top = "-40px";
                timerT = setTimeout(function () {
                    tip.classList.remove("err");
                }, 500);
            }, 1000);
        }
    };

    //重命名方法
    function rnfn(obj) {
        obj.getElementsByTagName("span")[0].style.display = "none";
        obj.getElementsByTagName("input")[0].style.display = "block";
        obj.getElementsByTagName("input")[0].value = obj.getElementsByTagName("span")[0].innerText;
        obj.getElementsByTagName("input")[0].focus();
        //失去焦点
        addck();
    }

    // 鼠标 框选
    folders.onmousedown = function (ev) {
        bong(ev);
    }
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
            divs = Array.from(folders.getElementsByTagName("div"));
            if (obj) {
                // 改变pid 或者直接删除
                data["" + obj.getAttribute("oid")].pid = -999;
                // for(a in data){
                //     if(data[a].pid == pn( obj.getAttribute("oid") ) ){
                //         delete data[a];
                //     }
                // }
                // delete data[""+obj.getAttribute("oid")];
            }
            else {
                divs.forEach(e => {
                    if (e.getElementsByTagName("i")[0].classList.contains("checked")) {
                        // 改变pid 或者直接删除
                        data["" + e.getAttribute("oid")].pid = -999;
                        // for(a in data){
                        //     if(data[a].pid == pn( e.getAttribute("oid") ) ){
                        //         delete data[a];
                        //     }
                        // }
                        // delete data[""+e.getAttribute("oid")];
                    };
                });
            }
            tip.style.top = 0;
            tiptxt.innerText = "删除文件夹成功";
            timer = setTimeout(function () {
                tip.style.top = "-40px";
            }, 1000);

            //重新生成左侧树 并添加点击事件
            init();
            for (let i = 0, lilen = lis.length; i < lilen; i++) {
                lis[i].onclick = function (ev) {
                    lick(lis[i], ev);
                }
            }
            // 右侧内容初始化 ↓
            cntStr = "";
            for (a in data) {
                pn(data[a].pid) == pn(window.location.hash.substring(1).split("=")[1]) && (cntStr += '<div class="file-item" oid = "' + data[a].id + '" pid = "' + data[a].pid + '"><img src="img/folder-b.png" alt="" /><span class="folder-name">' + data[a].title + '</span><input type="text" class="editor"/><i class=""></i></div>');
            }

            cntStr ? (folders.innerHTML = cntStr, folders.style.display = "block", fempty.style.display = "none") : (folders.style.display = "none", fempty.style.display = "block");
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
        gid = pn(window.location.hash.substring(1).split("=")[1]) ? pn(window.location.hash.substring(1).split("=")[1]) : 0;
        folders.innerHTML += '<div class="file-item" oid = "' + (+newdate) + '" pid = "' + gid + '"><img src="img/folder-b.png" alt="" /><span class="folder-name" style="display:none">新建文件夹</span><input type="text" class="editor" style = "display:block" value = "新建文件夹" select/><i class=""></i></div>';
        newobj.id = pn(+newdate);
        newobj.pid = pn(gid);
        newobj.title = "新建文件夹";
        data["" + (+newdate)] = newobj;
        //提示框
        tip.style.top = 0;
        tiptxt.innerText = "新建文件夹成功";
        timer = setTimeout(function () {
            tip.style.top = "-40px";
        }, 1000);

        //重新生成左侧树 并添加点击事件
        init();
        for (let i = 0, lilen = lis.length; i < lilen; i++) {
            lis[i].onclick = function (ev) {
                lick(lis[i], ev);
            }
        }
        // 右侧内容初始化 ↓
        cntStr = "";
        for (a in data) {
            pn(data[a].pid) == pn(window.location.hash.substring(1).split("=")[1]) && (cntStr += '<div class="file-item" oid = "' + data[a].id + '" pid = "' + data[a].pid + '"><img src="img/folder-b.png" alt="" /><span class="folder-name">' + data[a].title + '</span><input type="text" class="editor"/><i class=""></i></div>');
        }
        cntStr ? (folders.innerHTML = cntStr, folders.style.display = "block", fempty.style.display = "none") : (folders.style.display = "none", fempty.style.display = "block");
        addck();//添加右侧点击事件
    }

    //刷新
    refresh.onclick = function () {
        window.location.reload();
    }


    //左侧树点击事件 ↓
    function lick(obj, ev) {
        var str = "";
        var _this = obj;
        var curArr = findParent(_this.getAttribute("oid"));
        var oid = pn(_this.getAttribute("oid"));
        gid = oid; // 将当前点击的栏目的 id 赋值 全局 gid
        // 添加面包屑 ↓  
        curArr.forEach((e, i) => {
            i == curArr.length - 1 ? str += "<span>" + e.title + "</span>" : str += "<a oid = '" + e.id + "' pid = '" + e.pid + "' href = 'javascript:'>" + e.title + "</a>";
        });
        curpage.innerHTML = str;

        var curs = Array.from(curpage.children);
        curs.forEach(e => {
            if (e.tagName == "A")
                e.onclick = function () {
                    for (var i = 0; i < lis.length; i++) {
                        lis[i].getAttribute("oid") == e.getAttribute("oid") && lis[i].click();
                    }
                }
        });
        // 添加面包屑 ↑
        // 添加右侧内容 ↓
        if (oid != "undefined") {
            cntStr = "";
            for (a in data) {
                pn(data[a].pid) == oid && (cntStr += '<div class="file-item" oid = "' + data[a].id + '" pid = "' + data[a].pid + '"><img src="img/folder-b.png" alt="" /><span class="folder-name">' + data[a].title + '</span><input type="text" class="editor"/><i class=""></i></div>');
            }
            cntStr ? (folders.innerHTML = cntStr, folders.style.display = "block", fempty.style.display = "none") : (folders.style.display = "none", fempty.style.display = "block");
        }
        // 添加右侧内容 ↑
        //双击右侧内容进入目录 ↓
        addck();
        //双击右侧内容进入目录 ↑

        // 添加hash
        window.location.hash = "gid=" + gid;
        //阻止冒泡
        ev.stopPropagation ? ev.stopPropagation() : ev.cancelable = true;

    }
    //左侧树点击事件 ↑
    //日历
    getToday(showtime);
    var timer = setInterval(function(){getToday(showtime)},1000); 

}