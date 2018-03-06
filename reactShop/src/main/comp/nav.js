import React ,{Component} from 'react'
import {Route,Link} from "react-router-dom"
import Home from './home'
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
                        to="/"
                    >首页</a></li>
                    <li><Link 
                            className={ wlist ? "act" : ""}
                            onClick = {this.wclick}
                            to="/women"
                    >女装</Link></li>
                    <li><Link 
                            className={ mlist ? "act" : ""}
                            onClick = {this.mclick} 
                            to="/man"
                    >男装</Link></li>
                    <li><Link 
                            className={ kid ? "act" : ""}
                            onClick = {this.kclick}
                            to="/kid"
                    >儿童装</Link></li>
                    <li><Link 
                            className={ hot ? "act" : ""}
                            onClick = {this.hoclick}
                            to="/hot"
                    >热卖</Link></li>
                    <li><Link 
                            className={ contact ? "act" : ""}
                            onClick = {this.ctclick}
                            to="/contact"
                    >联系我们</Link></li>
                </ul>
                <Link 
                    className="search"
                    to="search"    
                >分类</Link>

            </div>
        )
    }
}
export default Nav







