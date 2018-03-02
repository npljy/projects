window.onload = function () {

    var dls = document.querySelectorAll("dl");
    var dts = document.querySelectorAll("dt");
    var dds = document.querySelectorAll("dd");
    var jts = document.querySelectorAll(".jt");
    var homekey = document.querySelector(".home");
    var key = homekey.querySelector("div");
    var chat = document.querySelector(".chat");
    var toName = chat.querySelector(".toname");
    var oimg = document.getElementById("img");
    var send = document.getElementById("send");
    var iptBtn = document.getElementById("ipt");
    var chatCont = document.getElementById("chatcont"); 
    var goBack = document.querySelector(".goback");
    var userid = true;
    var dLen = dls.length;
    var oldl = dls[0];
    var oldt = dts[0];
    var oldd = dds[0];
    var oldjt = jts[0];
    for (var i = 0; i < dLen; i++) {
        dls[i].onoff = false;
        dlClick(i);
        function dlClick(n) {
            dts[n].onclick = function () {
                if (!dls[n].onoff) {
                    oldl.style.height = "40px";
                    oldl.onoff = false;
                    oldjt.classList.remove("xia");
                    oldt.style.background = "";
                    dls[n].style.height = "auto";
                    dts[n].style.background = "#B54658";
                    dls[n].onoff = true;
                    jts[n].classList.add("xia");
                    oldl = dls[n];
                    oldt = dts[n];
                    oldjt = jts[n];
                }
                else {
                    dls[n].style.height = "40px";
                    dts[n].style.background = "";
                    jts[n].classList.remove("xia");
                    dls[n].onoff = false;
                }
            }
        }
    }
    for (var j = 0, ddLen = dds.length; j < ddLen; j++) {
        ddClick(j);
        function ddClick(n) {
            dds[n].onclick = function () {
                oldd.classList.remove("act");
                this.classList.add("act");
                oldd = this;
            }

            dds[n].ondblclick = function () {
                toName.innerText = this.innerText;
                chat.style.left = 0;
                
            }
        }
    }

    oimg.onclick = function()
    {
        if (userid) {
            oimg.src = 'img/lico.png';
            oimg['num'] = '2';
            userid = false;
        }
        else {
            oimg.src = 'img/rico.png';
            oimg['num'] = '1';
            userid = true;
        }
    }
    document.onkeydown =function(evt)
    {

        if(evt.keyCode == 13 && getComputedStyle(chat).left == "0px"){
            megsend();
        }
    }
    send.onclick = megsend;
    function megsend()
    {
        var iptText = iptBtn.value;
        // console.log(iptText);
        var chatStr = chatCont.innerHTML;
        if (iptText.replace(/(^\s*)|(\s*$)/g, "") == "") {
            alert("啥也没输入哇");
            return false;
        }
        if(oimg["num"] || oimg["num"] == 1)
        {
            chatStr += "<li class='lcont'><p>" + iptText + "</p></li>";
        }
        else
        {
            chatStr += "<li class='rcont'><p>" + iptText + "</p></li>";
        }
        chatCont.innerHTML = chatStr;
        iptBtn.value="";
    }
    
    goBack.onclick = function()
    {
        chat.style.left = '360px';
        chatCont.innerHTML = "";
    }

    homekey.onmousedown = function () {
        this.style.border = "2px solid #fff";
        this.style.height = "59px";
        this.style.width = "59px";

        key.style.border = "2px solid #fff";
        key.style.width = "19px";
        key.style.height = "19px";

        if(getComputedStyle(chat).left == "0px"){
            chat.style.left = '360px';
            chatCont.innerHTML = "";
        }
        
        homekey.onmouseup = function () {
            this.style.border = "1px solid #484C4B";
            this.style.height = "60px";
            this.style.width = "60px";
            key.style.border = "1px solid #484C4B";
            key.style.width = "20px";
            key.style.height = "20px";
        }

    }








}// onload END