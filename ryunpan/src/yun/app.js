import React,{Component} from 'react';
import './css/css.css'
import data from './js/data';
import Head from './comp/head';
import Tree from './comp/tree';
import RmTree from './comp/rmtree';
import Cur from './comp/cur';
import Cont from './comp/cont';
class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            data :data,
            oid : 0 ,
            chkoid : -1,
            rmwin : false,
            delwin : false,
            newfolder : 1,
            ckall : false
         }
    }
    // 移动菜单，选择移动目标id
    changeOid = (cid)=>{
        let {chkoid} = this.state;
        chkoid = cid;
        let tar = data.filter(e=>e.id === cid);
        let tarP = document.getElementById("tarP"); 
        tarP.innerText = tar[0].title;
        this.setState({
            chkoid
        });
    }
    //更改显示内容的id
    changeId = (cid)=>{
        let {data,oid,ckall} = this.state;
        ckall = false;
        if(oid !== cid){
            data.forEach((e,i)=>{
                e.checked = false;
            })
            this.setState({
                data:data,
                oid:cid,
                ckall
            })
        }
    }
    changeChecked = (cid)=>{
        let {data,oid,ckall} = this.state;
        data.forEach((e,i)=>{
            e.id === cid && (e.checked = !e.checked)
        })
        let ckalldata = data.filter(e=>e.pid === oid);
        ckall = ckalldata.every(e=>e.checked)
        this.setState({
            data,
            ckall
        });
    }
    // 移动 
    openRmWin = ()=>{
        let ckdata = data.filter((e,i)=>{
            return e.checked === true;
        });
        if(ckdata.length>0){
            let {rmwin} = this.state;
            rmwin = true;
            this.setState({
                rmwin
            });
        }else{

        }
    }
    closeRmWin = ()=>{
        let {rmwin} = this.state;
        rmwin = false;
        this.setState({
            rmwin
        });
    }
    
    rmCkData = ()=>{
        let {data,chkoid} = this.state;
        if(chkoid !== -1){
            data.forEach(e=>{
                if(e.checked === true){
                    e.pid = chkoid;
                }
            })
            this.setState({
                data
            });
            this.closeRmWin();
        }
    }
// 删除
    openDelWin = ()=>{
        let ckdata = data.filter((e,i)=>{
            return e.checked === true;
        });
        if(ckdata.length>0){
            let {delwin} = this.state;
            delwin = true;
            this.setState({
                delwin
            });
        }else{

        }
    }
    closeDelWin = ()=>{
        let {delwin} = this.state;
        delwin = false;
        this.setState({
            delwin
        });
    }
    delData = ()=>{
        let {data} = this.state;
        let ckdata = data.filter(e=>{
            return e.checked
        });
        if(ckdata.length>0){
            data.forEach(e=>{
                if(e.checked === true){
                    e.pid = -1;
                }
            })
            this.setState({
                data
            });
            this.closeDelWin();
        }
    }
// 重命名
    navRnFn = ()=>{
        let {data} = this.state;
        let ckdata = data.filter(e=>e.checked)
        if(ckdata.length===1){
            data.forEach(e=>{
                e.checked && (e.rename = true);
            })
            this.setState({
                data
            })
        }
    }
    changeTitle = (oid,val)=>{
        let {data} = this.state;
        data.forEach(e=>{
            if(e.id === oid){
                e.title = val;
                e.rename = false;
            };
        })
        this.setState({
            data
        })
    }
//  新建文件夹
    newFolder = ()=>{
        let {data,oid,newfolder} = this.state;
        let nd = new Date();
        let obj = {
            "id": +nd,
            "pid": oid,
            "title": "新建文件夹" + newfolder++,
            "checked":false,
            "rename":false
        }
        data.push(obj);
        this.setState({
            data:data,
            newfolder:newfolder
        })
    }
// 查找父元素
    findParent = (oid=0)=>{
        let {data} = this.state;
        let arr = [];
        let num = oid;

        let paloop = ()=>{
            data.forEach(e=>{
                if(e.id === num){
                    arr.unshift(e);
                    num = e.pid;
                    if(num === -1 ){
                        return;
                    }
                    else{
                        paloop();
                    }; 
                }
            })
        }
        paloop();// 声明后调用
        return arr;
    }

    // 全选
    togAll = ()=>{
        let {data,oid,ckall} = this.state;
        ckall = !ckall;
        data.forEach(e=>{
            if(e.pid === oid)e.checked = ckall;
        })
        this.setState({
            data,
            ckall
        });
    }

    render(){
        let {data,oid,rmwin,delwin,ckall} = this.state;

        let curlist = this.findParent(oid);

        curlist = curlist.map((e,i)=>{
            return (
               <Cur {...{
                   key:i,
                   oid:e.id,
                   curtxt:e.title,
                   changeid:this.changeId
               }} /> 
            )
        });

        let contlist = data.filter((e,i)=>{
            return e.pid === oid;
        });
        contlist = contlist.map((e,i)=>{
            return (
                <Cont {...{
                    key:i,
                    oid:e.id,
                    pid:e.pid,
                    title:e.title,
                    checked:e.checked,
                    rename:e.rename,
                    chgChked :this.changeChecked,
                    changeTitle:this.changeTitle
                }}/>
            )
        });

         
        return (
            <div id="box">
                {/* head ↓ */}
                <Head 
                    openRmWin = {this.openRmWin} 
                    openDelWin = {this.openDelWin} 
                    rnfn = {this.navRnFn}
                    nf = {this.newFolder}    
                />
                {/* head ↑ */}
                <section id="section">
                    <div id="treediv" className="tree-menu fix" >
                        {/* 左侧树 ↓ */}
                        <Tree cid = {this.changeId} />
                        {/* 左侧树 ↑ */}
                    </div>
                    <div className="folder-content">
                        <div className="breadmenu">
                            {/* 全选 ↓ */}
                            <div className="checkall" >
                                <i className={ckall?'checkedAll checked':'checkedAll'}
                                    onClick = {this.togAll}
                                ></i>
                            </div>
                            {/* 全选 ↑ */}
                            {/* 面包屑 ↓ */}
                            <div className="bread-nav" >
                                {curlist}
                            </div>
                            {/* 面包屑 ↑ */}
                        </div>
                        {/* 无数据展示 ↓ */}
                        <div className="f-empty"></div>
                        {/* 无数据展示 ↑ */}
                        {/* 右键菜单 ↓ */}
                        <div id="yj-list">
                            <span className="dl">下载</span>
                            <span className="mv">移动到</span>
                            <span className="de">删除</span>
                            <span className="rn">重命名</span>
                            <span className="sh">分享</span>
                        </div>
                        {/* 右键菜单 ↑ */}
                        {/* 右侧内容 ↓ */}
                        <div className="folders">
                            {contlist}
                        </div>
                        {/* 右侧内容 ↑ */}
                    </div>
                </section>
                {/* 移动确认框 ↓ */}
                <div className="mv-conf" id="mtree" style = {{ display: rmwin?'block':'none' }}>
                    <div  className="modal-tree" style = {{ display: rmwin?'block':'none' }}>
                        <h2>选择存储位置</h2>
                        <p id="tarP" className="folderName">移动目录</p>
                        <div className="content" id="rmtreediv">
                            <RmTree coid = {this.changeOid} />
                        </div>
                        <div className="footer">
                            <input type="button" name="" className="cancel" value="取消"
                                style={{cursor:"pointer"}}
                                onClick = {this.closeRmWin}
                            />
                            <input type="button" name="" className ="ok" value="确定"
                                style={{cursor:"pointer"}} 
                                onClick = {this.rmCkData}
                            />
                            <p className="tip"></p>
                        </div>
                        <i className="icon_close" style={{cursor:"pointer"}}
                            onClick = {this.closeRmWin}
                        ></i>
                    </div>
                </div>
                {/* 移动确认框 ↑ */}
                {/* 删除确认框 ↓ */}
                <div id="tanbox" style = {{ display: delwin?'block':'none' }}>
                    <div className="conf">
                        <i className="close-ico"
                            onClick = {this.closeDelWin}
                        >X</i>
                        <h3 className="conf-title">删除文件</h3>
                        <div className="conf-content">
                            确定要删除文件吗？
                        </div>
                        <div className="conf-btn">
                            <a 
                                onClick = {this.delData}
                            >确定</a>
                            <a 
                                onClick = {this.closeDelWin}
                            >取消</a>
                        </div>
                    </div>
                </div>
                {/* 删除确认框 ↑ */}
                {/* 顶部提示框 ↓ */}
                <div className="full-tip-box">
                    <span className="full-tip">
                        <span className="inner">
                        <i className="ico"></i>
                        <span className="tip-text">新建文件夹成功</span>
                    </span>
                    </span>
                </div>
                {/* 顶部提示框 ↑ */}
            </div>
        )
    }
}

export default App;