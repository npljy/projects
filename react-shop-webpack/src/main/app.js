import React, {Component} from "react"
import {Route,Link} from "react-router-dom"
import data from './data/data'
import users from './data/user'
import Ad from "./comp/ad"
import Nav from "./comp/nav"
import Home from './comp/home'
import Sex from './comp/sex'
import Form from './comp/form'
import Detail from './comp/detail'
import Login from './comp/login'
import Reg from './comp/reg'
import Foot from './comp/foot'
import IsLogin from './comp/islogin'
import NotLogin from './comp/notlogin'
import Cart from './comp/cart'


class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            cont:data,
            mask:false,
            imgurl:'imgs/pc0.jpg',
            islog:false,
            cart:0
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
    logout = ()=>{
        this.setState({
            islog:false
        })
    }
    initCart=()=>{
        let ck = document.cookie.split("; ").find(e=>/^u=/.test(e));
        let user = ck ? ck.split("=")[1]:null;
        let carts =JSON.parse(localStorage.getItem(user));
        let num = 0;
        if(carts){
            carts.forEach(e=>{
                num += Number(e.sum) * Number(e.pri);
            })
        }
        this.addcart1(num);
    }
    addcart1 = (num)=>{
        this.setState({
            cart:num
        })
    }
    clearCart = ()=>{
        let ck = document.cookie.split("; ").find(e=>/^u=/.test(e));
        let user = ck ? ck.split("=")[1]:null;
        localStorage.removeItem(user);
        this.setState({
            cart:0
        })
    }

    componentDidMount(){
        this.initCart();
    }

    render(){
        let {mask,imgurl,islog,cart} = this.state;
        let ck = document.cookie.split("; ").find(e=>/^u=/.test(e));
        let user = ck ? ck.split("=")[1]:null;
        
        // let user = []
        // let tmp = ck.split("; ");
        // tmp.forEach(e=>{
        //     let obj = e.split("=")[0];
        //     let attr = e.split("=")[1];
        //     user.push( "{ "+obj+" :"+attr+"}" )
        // })

        if(user){
            users.forEach(e=>{
                if(e.user === user){
                    islog = true;
                }
            })
        }

        return (
            <div>
                <div className = "adcenter clearfix">
                    {/* ad ↓ */}
                    <Ad />
                    {/* ad ↑ */}
                    <div className="ad-right">
                        <div>
                            <Link to="/cart">
                                <h3>
                                    <div className="total">RMB：<span className="t-count">{cart?cart:0}</span></div>
                                    <img alt="cart" src={require("./imgs/cart.png")}/>
                                </h3>
                            </Link>
                            <p>
                            <a
                                onClick = {this.clearCart}
                            >清空购物车</a>
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
                                {islog ? <IsLogin logout={this.logout} initCart={this.initCart}/> : <NotLogin />}
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
                {/* banner 在 Home 中 */}
                {/* 路由 填充部分 ↓ */}
                <Route path="/" exact render={(props)=>{
                    return <Home togfn={this.togmask} addcart1={this.addcart1}/>
                }}/>
                <Route path="/:name" render={(props)=>{
                    if(props.match.url === '/contact') 
                        return <Form />
                    else if(props.match.url === '/login'){
                        // 判断是否有登录的cookie信息，没有则跳转到登录页面
                        return <Login initCart={this.initCart}/>
                    }  
                    else if(props.match.url === '/reg')  
                        return <Reg initCart={this.initCart}  togfn={this.togmask} addcart1={this.addcart1}/>
                    else if(props.match.url === '/cart')
                        return <Cart />
                    else if(props.match.url === '/detail')  
                        return <Detail oid={props.location.search.substring(1).split("=")[1]} addcart1={this.addcart1}/>
                    else 
                        return <Sex  sex={props.match.url.substring(1)} togfn={this.togmask} addcart1={this.addcart1}/>
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