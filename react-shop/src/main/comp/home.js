import React , {Component} from "react"
import {Link} from 'react-router-dom'
import data from "../data/data"
import List from "./list"

class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            cont:data
        }
    }
     // 传过来的方法：弹出 遮罩层，图片放大
    togmaskH = (id)=>{
        let {togfn} = this.props;
        togfn(id);
    }
    // 传过来的方法：计算购物车 总价格
    addcart2=(num)=>{
        let {addcart1} = this.props;
        addcart1(num)
    }
    render(){      
        let {cont} = this.state;
        let list = cont.map((e,i)=>{
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
                    send : e.send,
                    togH:this.togmaskH,
                    addcart2:this.addcart2
                }}/>
            )
        })
        list.length = 8;
        return (
                <div className="replace">
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
                                            <Link to="/detail?id=1" >
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
                                        <h2><Link  to="/detail?id=1">Luxurious & Trendy</Link></h2>
                                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years</p>
                                        <Link  to="/detail" className="buy">购 买(错误示例，没有传参)</Link>
                                    </div>
                                </div>
                                <div className = "cont-t-rt">
                                    <div className="rt-col">
                                        <Link to="/detail?id=2" >
                                            <img alt="" src={require("../imgs/pi1.jpg")}/>
                                            <div>
                                                <p>商品详情</p>
                                                <label></label>
                                                <h3>男 式</h3>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="rt-col">
                                        <Link to="/detail?id=4" >
                                            <img alt="" src={require("../imgs/pi2.jpg")}/>
                                            <div>
                                                <p>商品详情</p>
                                                <label></label>
                                                <h3>儿 童</h3>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="rt-col">
                                        <Link to="/detail?id=3" >
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
                                    <label></label>
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

export default Home