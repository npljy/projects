import React ,{Component} from "react"

class Nav extends Component {
    constructor(props){
        super(props);
        this.state={
            wlist:false,
            mlist:false
        }
    }
    wclick = ()=>{
        let {wlist,mlist} = this.state;
        wlist = !wlist;
        mlist = false;
        this.setState({
            wlist,
            mlist
        })
    }
    mclick = ()=>{
        let {wlist,mlist} = this.state;
        mlist = !mlist;
        wlist = false;
        this.setState({
            wlist,
            mlist
        })
    }
    render(){
        let {wlist,mlist} = this.state;
        return (
            <div className = "head-btm-l clearfix">
                <ul>
                    <li><a className="" >首页</a></li>
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
                    <li><a className="" >儿童装</a></li>
                    <li><a className="" >热卖</a></li>
                    <li><a className="" >联系我们</a></li>
                </ul>
                <a className="search" href="./search.html">分类</a>
            </div>
        )
    }
}
export default Nav







