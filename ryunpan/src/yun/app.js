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
            rmwin : false,
            chkoid:-1
         }
    }
    // 移动菜单，选择移动目标id
    changeOid = (cid)=>{
        let {chkoid} = this.state;
        chkoid = cid;
        this.setState({
            chkoid
        });
    }
    //更改显示内容的id
    changeId = (cid)=>{
        let {oid} = this.state;
        if(oid !== cid){
            data.forEach((e,i)=>{
                e.checked = false;
            })
            this.setState({
                data:data,
                oid:cid
            })
        }
    }
    changeChecked = (oid)=>{
        let {data} = this.state;
        data.forEach((e,i)=>{
            e.id === oid && (e.checked = !e.checked)
        })
        this.setState({
            data
        });
    }
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

    }

    render(){
        let {data,oid,rmwin} = this.state;
    
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
                    chgChked :this.changeChecked
                }}/>
            )
        });
        return (
            <div id="box">
                {/* head ↓ */}
                <Head openRmWin = {this.openRmWin}/>
                {/* head ↑ */}
                <section id="section">
                    <div id="treediv" className="tree-menu fix" >
                        {/* 左侧树 ↓ */}
                        <Tree cid = {this.changeId} />
                        {/* 左侧树 ↑ */}
                    </div>
                    <div className="folder-content">
                        {/* 面包屑 ↓ */}
                        <Cur />
                        {/* 面包屑 ↑ */}
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
                <div  className="modal-tree" style = {{ display: rmwin?'block':'none' }}>
                    <h2>选择存储位置</h2>
                    <p className="folderName">移动目录</p>
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
                        />
                        <p className="tip"></p>
                    </div>
                    <i className="icon_close" style={{cursor:"pointer"}}
                        onClick = {this.closeRmWin}
                    ></i>
                </div>
                {/* 移动确认框 ↑ */}
                {/* 删除确认框 ↓ */}
                <div id="tanbox">
                    <div className="conf">
                        <i className="close-ico">X</i>
                        <h3 className="conf-title">删除文件</h3>
                        <div className="conf-content">
                            确定要删除文件吗？
                        </div>
                        <div className="conf-btn">
                            <a href="javascript:;">确定</a>
                            <a href="javascript:;">取消</a>
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