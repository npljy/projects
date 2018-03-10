import React, {Component} from "react"
import {Route,Link} from "react-router-dom"
import data from './data/data'
import Ad from "./comp/ad"
import Nav from "./comp/nav"
import Home from './comp/home'
import Sex from './comp/sex'
import Form from './comp/form'
import Detail from './comp/detail'
import Login from './comp/login'
import Reg from './comp/reg'
import Foot from './comp/foot'

class App extends Component{
    constructor(){
        super();
        this.state = {
            cont:data,
            mask:false,
            imgurl:'imgs/pc0.jpg',
        };
    }
    // 弹出 遮罩层，图片放大
    togmask = (id)=>{
        let {cont} = this.state;
        let oimg = cont.find(e=>{
            return e.id === id
        });
        this.setState({
            mask : true,
            imgurl : oimg.img,
        });
    }

    close = ()=>{
        this.setState({
            mask : false,
            imgurl:"imgs/pc0.jpg"
        });
    }
    render(){
        let {mask,imgurl} = this.state;
        return (
            <div>
                <div className = "adcenter clearfix">
                    {/* ad ↓ */}
                    <Ad />
                    {/* ad ↑ */}
                    <div className="ad-right">
                        <div>
                            <Link to="/checkout">
                                <h3>
                                    <div className="total">RMB：<span className="t-count">588888</span></div>
                                    <img alt="cart" src={require("./imgs/cart.png")}/>
                                </h3>
                            </Link>
                            <p>
                                <a>清空购物车</a>
                            </p>
                        </div>
                    </div>
                </div>
               
                {/* head ↓ */}
                <div className = "header">
                    <div className = "container">
                        <div className = "logo">
                            <Link to="/">
                                <img src = {require("./imgs/logo.png")} alt="logo" />
                            </Link>
                        </div>
                    </div>
                    <div className = "head-top">
                        <div className = "container">
                            <div className = "head-top-l clearfix">
                                <ul>
                                    <li><Link to="/login">登 录</Link></li>
                                    <li><Link to="/reg">注 册</Link></li>
                                    <li><Link to="/checkout">我的订单</Link></li>
                                </ul>
                            </div>
                            <div className = "head-top-r"></div>
                        </div>
                    </div>
                    <div className = "head-btm">
                        <div className = "container">
                            {/* nav ↓ */}
                            <Nav />
                            {/* nav ↑ */}
                        </div>
                    </div>
                </div>
                {/* head ↑ */}
                {/* banner ↓ */}
                {/* 路由 填充部分 ↓ */}
                <Route path="/" exact render={(props)=>{
                    return <Home togfn={this.togmask} />
                }}/>
                <Route path="/:name" render={(props)=>{
                    if(props.match.url === '/contact') 
                        return <Form />
                    else if(props.match.url === '/login')  
                        return <Login />
                    else if(props.match.url === '/reg')  
                        return <Reg />
                    else if(props.match.url === '/detail')  
                        return <Detail oid={props.location.search.substring(1).split("=")[1]}/>
                    else 
                        return <Sex  sex={props.match.url.substring(1)}  togfn={this.togmask} />
                    
                }}/>
                
                {/* 路由 填充部分 ↑ */}
                {/* list遮罩 ↓ */}
                <div className="mask" style={{display:mask?'block':'none'}}>
                    <div>
                        {/* 图片初始值为空的话，会导致require报错 */}
                        <img alt={`./${imgurl}`} src={ require(`./${imgurl}`) }   />
                        <a className="close"
                            onClick = {this.close}
                        >X</a>
                    </div>
                </div>
                {/* list遮罩 ↑ */}
                
                {/* footer ↓ */}
                
                <Foot />
                
                {/* footer ↑ */}
            </div>
        )
    }
    
}
export default App;
