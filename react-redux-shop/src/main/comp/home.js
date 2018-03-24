import React , {Component} from "react"
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import data from "../data/data"
import users from '../data/user'
import List from "./list"

class HomeR extends Component{
    constructor(props){
        super(props)
        this.state={
            cont:data,
            timer:null,
            userval:'',
            pwdval:'',
            wrong:false,
            tolog:false
        }
    }
     // 传过来的方法：弹出 遮罩层，图片放大
    togmaskH = (id)=>{
        let {togfn} = this.props;
        togfn(id);
    }
    // 传过来的方法：计算购物车 总价格
    addcart2=(num,count)=>{
        let {addcart1} = this.props;
        addcart1(num,count)
    }

    loop=()=>{
        let {timer} = this.state;
        let num = 1;
        let _this = this;
        let dotlis = Array.from(_this.refs.uldot.getElementsByTagName("li"));
        timer = setInterval(function(){
            _this.refs.ul.style.marginLeft = - num * 100 +"%" ;
            if(num === 4){
                setTimeout(function(){
                    _this.refs.ul.style.transition = "none";
                    _this.refs.ul.style.marginLeft = 0 ;
                    setTimeout(function(){
                        _this.refs.ul.style.transition = "1s";
                    },50)
                },1000)
            }
            num = num%4;
            dotlis.forEach((e,i)=>{
                i === num ? e.style.background = "#f67777" : e.style.background = "#fff";
                i === num ? e.style.color = "#fff" : e.style.color = "#f67777";
            })
            num++;
        },3000)
        this.setState({
            timer
        }) 
    }
    // 组件加载完,开启 轮播图 定时器
    componentDidMount(){
        this.loop();
    }
    // 路由切换前,停掉定时器,不然报错
    componentWillUnmount(){
        let {timer} = this.state;
        clearInterval(timer);
        this.setState({
            timer
        }) 
        this.loop = null;
    }
    toTop =()=>{
        let { dispatch } = this.props;
        dispatch({ type: "NEW_PATH" });
        document.documentElement.scrollTop = "0";
        document.body.scrollTop = "0";
    }
    
    newPath =()=>{
        let { dispatch } = this.props;
        dispatch({ type: "NEW_PATH" });
    }
    // 登录
    username=(ev)=>{
        this.setState({
            userval:ev.target.value
        })
    }
    password=(ev)=>{
        this.setState({
            pwdval:ev.target.value
        })
    }
    login = ()=>{
        let {userval,pwdval} = this.state;
        let {initCart} = this.props;
        let onoff = false; //false代表默认没登陆
        users.forEach(e=>{
            if(e.user === userval){//如果用户名正确
                if(e.pwd === pwdval){//如果密码正确
                    onoff = true;//true代登录成功
                    return;
                }
            }
        })
        // 如果登录验证成功
        if(onoff){
            let { dispatch } = this.props;
            dispatch({ type: "NEW_PATH" });
            // 登录成功，写入cookie
            let t = new Date();
            t.setDate(t.getDate()+1);
            document.cookie = 'u='+userval+';expires='+t;
            initCart(); // 初始化购物车
            
            this.setState({
                userval:'',
                pwdval:'',
                wrong:false,
                tolog:false
            })
        }
        else{
            this.setState({
                wrong:true
            })
        }
    }
    tologin=()=>{
        this.setState({
            tolog:true
        })
    }
    closeLogin = ()=>{
        this.setState({
            tolog:false
        })
    }

    render(){      
        let {cont,tolog,userval,pwdval,wrong} = this.state;
        cont = cont.sort(function(a,b){
            return Number(b.send)-Number(a.send);
        })
        let list = cont.map((e,i)=>{
            return (
                <List {...{
                    key:i,
                    id : e.id,
                    sex : e.sex,
                    title : e.title,
                    type:e.type,
                    price : e.price,
                    sale : e.sale,
                    img : e.img,
                    count : e.count,
                    send : e.send,
                    togH:this.togmaskH,
                    addcart2:this.addcart2,
                    tologin:this.tologin
                }}/>
            )
        })
        
        list.length = 12; // 限制首页数量
        return (
                <div className="replace">
                    <div id="tologin" className="tologin" ref="tologin" 
                        style={{display:tolog?"block":"none"}}
                    ></div>
                    <div className="logindiv" style={{display:tolog?"block":"none"}}>
                        <div className="close"
                            onClick ={this.closeLogin}
                        >X</div>
                        <ul>
                            <li><input placeholder="请输入用户名"
                                value = {userval}
                                onChange = {this.username}
                            /></li>
                            <li><input placeholder="请输入密码"
                                value = {pwdval}
                                onChange = {this.password}
                            /></li>
                        </ul>
                        <div className="sure">
                            <span
                                onClick = {this.login}
                            >登 录</span>
                            <strong className="wrong" ref="wrong" style={{display:wrong?"inline-block":"none"}}>帐号或密码错误</strong>
                            <Link to="/forget" onClick = {this.newPath}>忘记密码</Link>
                            <Link to="/reg" onClick = {this.newPath} >免费注册</Link>
                        </div>
                    </div>
                    {/* banner ↓ */}
                    <div className = "banners">
                        <div className = "container bannerfix" >
                            <h1>
                                <span>Fashion & Beauty</span>
                                <div className="rw-words rw-words-1">
                                    <span>时尚的设计</span>
                                    <span>精致的裁缝工艺</span>
                                    <span>静心挑选的面料</span>
                                    <span>实力保障</span>
                                </div>
                                <div className="rw-words rw-words-2">
                                    <span>尽显时尚，优雅，气质</span>
                                    <span>让您的曲线得到更加优美的展现</span>
                                    <span>让您的身心得到更加舒适的享受</span>
                                    <span>中国乃至全球的优秀品牌</span>
                                </div>
                            </h1>
                        </div>
                        <div className="banner-dot">
                            <ul ref="uldot">
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                            </ul>
                        </div>
                        <ul ref="ul" style={{transition:'1s'}}>
                            <li className = "banner banner1"></li>
                            <li className = "banner banner2"></li>
                            <li className = "banner banner3"></li>
                            <li className = "banner banner4"></li>
                            <li className = "banner banner1"></li>
                        </ul>
                    </div>
                    {/* banner ↑ */}
                    {/* content ↓ */}
                    <div className = "content">
                        <div className="container">
                            <div className="cont-top clearfix">
                                <div className = "cont-t-lt">
                                    <div className="top">
                                        <div className="top-img">
                                            <Link to="/detail?id=1" 
                                                onClick = {this.toTop}
                                            >
                                                <img src={require("../imgs/pi.jpg")} alt=""/>
                                                <div className="top-fly">
                                                    <p className="b-animate">商品详情</p>
                                                    <label className="b-animate"></label>
                                                    <h2 className="b-animate">潮流热款</h2>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="btm">
                                        <span>热卖款式</span>
                                        <h2><Link  to="/detail?id=1" 
                                             onClick = {this.toTop} 
                                        >Luxurious & Trendy</Link></h2>
                                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years</p>
                                        <Link  to="/detail" className="buy"
                                            onClick = {this.toTop}
                                        >购 买(错误示例，没有传参)</Link>
                                    </div>
                                </div>
                                <div className = "cont-t-rt">
                                    <div className="rt-col">
                                        <Link to="/detail?id=2" onClick = {this.toTop}>
                                            <img alt="" src={require("../imgs/pi1.jpg")}/>
                                            <div>
                                                <p>商品详情</p>
                                                <label></label>
                                                <h3>男 式</h3>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="rt-col">
                                        <Link to="/detail?id=4" onClick = {this.toTop}>
                                            <img alt="" src={require("../imgs/pi2.jpg")}/>
                                            <div>
                                                <p>商品详情</p>
                                                <label></label>
                                                <h3>儿 童</h3>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="rt-col">
                                        <Link to="/detail?id=3" onClick = {this.toTop}>
                                            <img alt="" src={require("../imgs/pi3.jpg")}/>
                                            <div>
                                                <p>商品详情</p>
                                                <label></label>
                                                <h3>女 式</h3>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="cont-mid">
                                <div className="container">
                                    <h2>流行款式</h2>
                                    <div className="hrlab"><label></label></div>
                                    <div className="box">
                                        <ul>
                                            {/* 解构 list ↓ */}
                                            {list}
                                            {/* list ↑ */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="cont-btm">
                            </div>
                        </div>
                    </div>
                    {/* content ↑ */}
                </div>

        )
    }
}
const Home = connect(state=>state)(HomeR);
export default Home