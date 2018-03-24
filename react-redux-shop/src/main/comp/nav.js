import React ,{Component} from 'react'
import {NavLink} from "react-router-dom"
import {connect} from 'react-redux'

class NavR extends Component {
    constructor(props){
        super(props);
        this.state={
            more:false
        }
    }

    hide = (ev)=>{
        ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
        this.setState({
            more:false
        })
    }
    show = ()=>{
        this.setState({
            more:true
        })
    }
    newPath = ()=>{
        let {dispatch} = this.props;
        dispatch({type:'NEW_PATH'})
    }
    render(){
        // let {more} = this.state;
        return (
            <div className = "head-btm-l clearfix">
                <ul>
                    <li><NavLink
                            onClick = {this.newPath}
                            to="/"
                    >首 页</NavLink></li>
                    <li><NavLink 
                            onClick = {this.newPath}
                            activeClassName="act"
                            to="/women"
                    >女 装</NavLink></li>
                    <li><NavLink 
                            onClick = {this.newPath}
                            activeClassName="act"
                            to="/man"
                    >男 装</NavLink></li>
                    <li><NavLink 
                            onClick = {this.newPath}
                            activeClassName="act"
                            to="/kid"
                    >儿 童 装</NavLink></li>
                    <li><NavLink 
                            onClick = {this.newPath}
                            activeClassName="act"
                            to="/hot"
                    >热 卖</NavLink></li>
                    <li><NavLink 
                            onClick = {this.newPath}
                            activeClassName="act"
                            to="/contact"
                    >联系我们</NavLink></li>
                </ul>
                {/* <a className="search"
                    onMouseOut = {this.hide}
                    onMouseOver = {this.show}
                >更多项目
                    <div className="clearfix"
                        style={{display:more?'block':'none'}}
                        onMouseOut = {this.hide}
                        onMouseOver = {this.show}
                    >
                        <ul>
                            <li><a href="/jianli" target="_blank">我的简历</a></li>
                            <li><a href="https://github.com/niepengsmile" target="_blank">我的github</a></li>
                            <li><a href="/kugou" target="_blank">JS播放器</a></li>
                            <li><a href="/yunpan" target="_blank">JS云盘</a></li>
                            <li><a href="/reactyunpan" target="_blank">react云盘</a></li>
                        </ul>
                    </div>
                </a> */}
            </div>
        )
    }
}
const Nav = connect(state=>state)(NavR);
export default Nav







