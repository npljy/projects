import React ,{Component} from 'react'
import {Route,Link} from "react-router-dom"
class Nav extends Component {
    constructor(props){
        super(props);
        this.state={
            wlist:false,
            mlist:false,
            kid:false,
            hot:false,
            contact:false
        }
    }
    hmclick = ()=>{
        this.setState({
            wlist:false,
            mlist:false,
            kid:false,
            hot:false,
            contact:false
        })
    }
    wclick = ()=>{
        let {wlist} = this.state;
        wlist = !wlist;
        this.setState({
            wlist,
            mlist:false,
            kid:false,
            hot:false,
            contact:false
        })
    }
    mclick = ()=>{
        let {mlist} = this.state;
        mlist = !mlist;
        this.setState({
            wlist:false,
            mlist,
            kid:false,
            hot:false,
            contact:false
        })
    }
    kclick = ()=>{
        this.setState({
            wlist:false,
            mlist:false,
            kid:true,
            hot:false,
            contact:false
        })
    }
    hoclick = ()=>{
        this.setState({
            wlist:false,
            mlist:false,
            kid:false,
            hot:true,
            contact:false
        })
    }
    ctclick = ()=>{
        this.setState({
            wlist:false,
            mlist:false,
            kid:false,
            hot:false,
            contact:true
        })
    }
    render(){
        let {wlist,mlist,kid,hot,contact} = this.state;
        return (
            <div className = "head-btm-l clearfix">
                <ul>
                    <li><a 
                        onClick = {this.hmclick}
                    >首页</a></li>
                    <li><a className={ wlist ? "act" : ""}
                            onClick = {this.wclick}
                        >女装<span className="sj"></span></a>
                        <div className="w-list clearfix" style={{ display : wlist ? "block" : "none" }}>
                            <div>
                                <h2>分类一</h2>
                                <ul>
                                    <li>分类一</li>
                                    <li>分类一</li>
                                    <li>分类一</li>
                                    <li>分类一</li>
                                </ul>
                            </div>
                            <div>
                                <h2>分类二</h2>
                                <ul>
                                    <li>分类二</li>
                                    <li>分类二</li>
                                    <li>分类二</li>
                                    <li>分类二</li>
                                    <li>分类二</li>
                                    <li>分类二</li>
                                </ul>
                            </div>
                            <div>
                                <h2>分类三</h2>
                                <ul>
                                    <li>分类三</li>
                                    <li>分类三</li>
                                    <li>分类三</li>
                                    <li>分类三</li>
                                    <li>分类三</li>
                                    <li>分类三</li>
                                </ul>
                            </div>
                            <div>
                                <h2>分类四</h2>
                                <ul>
                                    <li>分类四</li>
                                    <li>分类四</li>
                                    <li>分类四</li>
                                    <li>分类四</li>
                                    <li>分类四</li>
                                    <li>分类四</li>
                                </ul>
                            </div>
                            <div>
                                <img alt="" src={require("../imgs/me.png")}/>
                            </div>
                        </div>
                    </li>
                    <li><a className={ mlist ? "act" : ""}
                            onClick = {this.mclick} >男装<span className="sj"></span></a>
                    <div className="w-list clearfix" style={{ display : mlist ? "block" : "none" }}>
                            <div>
                                <h2>分类一</h2>
                                <ul>
                                    <li>分类一</li>
                                    <li>分类一</li>
                                    <li>分类一</li>
                                    <li>分类一</li>
                                </ul>
                            </div>
                            <div>
                                <h2>分类二</h2>
                                <ul>
                                    <li>分类二</li>
                                    <li>分类二</li>
                                    <li>分类二</li>
                                    <li>分类二</li>
                                    <li>分类二</li>
                                    <li>分类二</li>
                                </ul>
                            </div>
                            <div>
                                <h2>分类三</h2>
                                <ul>
                                    <li>分类三</li>
                                    <li>分类三</li>
                                    <li>分类三</li>
                                    <li>分类三</li>
                                    <li>分类三</li>
                                    <li>分类三</li>
                                </ul>
                            </div>
                            <div>
                                <h2>分类四</h2>
                                <ul>
                                    <li>分类四</li>
                                    <li>分类四</li>
                                    <li>分类四</li>
                                    <li>分类四</li>
                                    <li>分类四</li>
                                    <li>分类四</li>
                                </ul>
                            </div>
                            <div>
                                <img alt="" src={require("../imgs/me1.png")}/>
                            </div>
                        </div>
                    </li>
                    <li><a className={ kid ? "act" : ""}
                        onClick = {this.kclick}
                    >儿童装</a></li>
                    <li><a className={ hot ? "act" : ""}
                        onClick = {this.hoclick}
                    >热卖</a></li>
                    <li><a className={ contact ? "act" : ""}
                        onClick = {this.ctclick}
                    >联系我们</a></li>
                </ul>
                <a className="search" href="./search.html">分类</a>
            </div>
        )
    }
}
export default Nav







