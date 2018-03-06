import React, {Component} from "react"
import data from "./data/data"
import Ad from "./comp/ad"
import Nav from "./comp/nav"
import List from "./comp/list"

class App extends Component{
    constructor(){
        super();
        this.state = {
            data:data
        };
    }
    render(){
        let {data} = this.state;
        let list = data.map((e,i)=>{
            return (
                <List {...{
                    key:i,
                    id : e.id,
                    sex : e.sex,
                    title : e.title,
                    price : e.price,
                    sale : e.sale,
                    img : e.img,
                    count : e.count,
                    send : e.send
                }}/>
            )
        })
        return (
            <div>
                <div className = "adcenter clearfix">
                    {/* ad ↓ */}
                    <Ad />
                    {/* ad ↑ */}
                    <div className="ad-right">
                        <div>
                            <a>
                                <h3>
                                    <div className="total">RMB：<span className="t-count">588888</span></div>
                                    <img alt="cart" src={require("./imgs/cart.png")}/>
                                </h3>
                            </a>
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
                            <a href="/">
                                <img src = {require("./imgs/logo.png")} alt="logo" />
                            </a>
                        </div>
                    </div>
                    <div className = "head-top">
                        <div className = "container">
                            <div className = "head-top-l clearfix">
                                <ul>
                                    <li><a>登录</a></li>
                                    <li><a>注册</a></li>
                                    <li><a>订单</a></li>
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
                <div className = "banner">
                    <div className = "container" >
                        <h1>
                            <span>时 尚 & 美 丽</span>
                            <div className="rw-words rw-words-1">
                                <span>傲 娇 的 品 牌 傲 娇 的 品 牌</span>
                                <span>呆 萌 的 价 格 呆 萌 的 价 格</span>
                                <span>全 球 精 选 全 球 精 选</span>
                                <span>正 品 特 卖 正 品 特 卖</span>
                                <span>限 时 抢 购 限 时 抢 购</span>
                            </div>
                            <div className="rw-words rw-words-2">
                                <span>我 们 郑 重 声 明 我 们 郑 重 声 明</span>
                                <span>本 站 所 有 商 品 本 站 所 有 商 品</span>
                                <span>官 方 渠 道 进 货 官 方 渠 道 进 货</span>
                                <span>百 分 百 正 品 百 分 百 正 品</span>
                                <span>请 放 心 购 买 请 放 心 购 买</span>
                            </div>
                        </h1>
                    </div>
                </div>
                {/* banner ↑ */}
                {/* content ↓ */}
                <div className = "content">
                    <div className="container">
                        <div className="cont-top clearfix">
                            <div className = "cont-t-lt">
                                <div className="top">
                                    <div className="top-img">
                                        <a>
                                            <img src={require("./imgs/pi.jpg")} alt=""/>
                                            <div className="top-fly">
                                                <p className="b-animate">商品详情</p>
                                                <label className="b-animate"></label>
                                                <h2 className="b-animate">潮流热款</h2>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="btm">
                                    <span>热卖款式</span>
                                    <h2><a>Luxurious & Trendy</a></h2>
                                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years</p>
                                    <a className="buy">购 买</a>
                                </div>
                            </div>
                            <div className = "cont-t-rt">
                                <div className="rt-col">
                                    <a>
                                        <img alt="" src={require("./imgs/pi1.jpg")}/>
                                        <div>
                                            <p>商品详情</p>
                                            <label></label>
                                            <h3>男 式</h3>
                                        </div>
                                    </a>
                                </div>
                                <div className="rt-col">
                                    <a>
                                        <img alt="" src={require("./imgs/pi2.jpg")}/>
                                        <div>
                                            <p>商品详情</p>
                                            <label></label>
                                            <h3>儿 童</h3>
                                        </div>
                                    </a>
                                </div>
                                <div className="rt-col">
                                    <a>
                                        <img alt="" src={require("./imgs/pi3.jpg")}/>
                                        <div>
                                            <p>商品详情</p>
                                            <label></label>
                                            <h3>女 式</h3>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="cont-mid">
                            <div className="container">
                                <h2>流行款式</h2>
                                <label></label>
                                <div className="box">
                                    <ul>
                                        {/* list ↓ */}
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
                {/* footer ↓ */}
                <div className = "footer"></div>
                {/* footer ↑ */}
            </div>
        )
    }
    
}
export default App;
