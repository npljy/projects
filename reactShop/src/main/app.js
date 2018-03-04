import React, {Component} from "react"

class App extends Component{
    constructor(){
        super();
        this.state = {};
    }
    render(){
        return (
            <div>
                {/* ad ↓ */}
                <div className = "adcenter">
                    <div className="adlogo">
                        <a target="_blank" href="/" mars_sead="home_header_vip_logo">
                            <img src={require("./imgs/ad.gif")}  alt="全球精选_正品特卖" id="J-vipLogo" height="90"/>
                        </a>
                    </div>
                    <div className="adtop">
                        <img src={require("./imgs/top.png")}  alt="全球精选_正品特卖" id="J-vipLogo" height="90"/>
                    </div>
                </div>
                {/* ad ↑ */}
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
                            <div className = "head-btm-l clearfix">
                                <ul>
                                    <li><a className="" >首页</a></li>
                                    <li><a className="" >女装</a></li>
                                    <li><a className="" >男装</a></li>
                                    <li><a className="" >儿童装</a></li>
                                    <li><a className="" >热卖</a></li>
                                    <li><a className="" >联系我们</a></li>
                                </ul>
                                <a className="search" href="./comp/search.html">分类</a>
                            </div>
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
                                <div className="top"></div>
                                <div className="btm"></div>
                            </div>
                            <div className = "cont-t-rt"></div>
                        </div>
                        <div className="cont-mid">
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
