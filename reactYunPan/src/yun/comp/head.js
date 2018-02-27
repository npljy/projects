import React,{Component} from 'react';
import Nav from './nav';
class Head extends Component{
    constructor(props){
        super(props);
        this.state={
            nav:[
                {
                    id:"download",
                    txt:'下载'
                },
                {
                    id:"share",
                    txt:'分享'
                },
                {
                    id:"remove",
                    txt:'移动到'
                },
                {
                    id:"rename",
                    txt:'重命名'
                },
                {
                    id:"del",
                    txt:'删除'
                },
                {
                    id:"create",
                    txt:'新建文件夹'
                },
                {
                    id:"refresh",
                    txt:''
                }
            ]
        }
    }
    dispRm = ()=>{
        let {openRmWin} = this.props;
        openRmWin();
    };
    dispDel = ()=>{
        let {openDelWin} = this.props;
        openDelWin();
    };
    rename = ()=>{
        let {rnfn} = this.props;
        rnfn();
    }

    newFolder =()=>{
        let {nf} = this.props;
        nf();
    }

    render(){
        let {nav} = this.state;

        let navs = nav.map((e,i)=>{
            return (
                <Nav  {...{
                    key:i,
                    id:e.id,
                    txt:e.txt,
                    dispRm:this.dispRm,
                    dispDel : this.dispDel,
                    rn : this.rename,
                    nf : this.newFolder
                }} />
            )
        })
        return (
            <header id="head">
                <div id="top">
                    <h1 className="title">
                        <a  title="妙味云盘">&nbsp;</a>
                    </h1>
                    <div className="right">
                        <div className="user">
                            <span><img src={require("../img/user-ico.jpg")} alt="" /></span>
                            <i></i>
                        </div>
                        <div className="gap"></div>
                        <div className="set"></div>
                    </div>
                </div>
                <div id="nav">
                    <ul className="nav_left" >
                        {navs}
                    </ul>
                    <div className="nav_right">
                        <div className="show_mode"></div>
                        <div className="sort_mode">
                            <i></i>
                            <div className="cover"></div>
                            <ul>
                                <li>按时间排列</li>
                                <li>按字母排列</li>
                                <li>显示缩略图</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Head;