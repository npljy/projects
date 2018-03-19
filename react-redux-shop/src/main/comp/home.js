import React , {Component} from "react"
import {Link} from 'react-router-dom'
import data from "../data/data"
import List from "./list"

class Home extends Component{

     
    render(){      
 
        return (
                <div className="replace">
                    {/* banner ↓ */}
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
                    <ul ref="ul">
                        <li className = "banner banner1"></li>
                        <li className = "banner banner2"></li>
                        <li className = "banner banner3"></li>
                        <li className = "banner banner4"></li>
                        <li className = "banner banner1"></li>
                    </ul>

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
                                    <div className="hrlab"><label></label></div>
                                    <div className="box">
                                        <ul>
                                            {/* 解构 list ↓ */}
                                           
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