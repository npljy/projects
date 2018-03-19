import React ,{Component} from 'react'
import {Link} from 'react-router-dom'

class Foot extends Component{
    constructor(){
        super();
        this.state={};
    }

    render(){
        return (
            <div>
                <div className="brand">
                    <div className="container clearfix">
                        <ul>
                            <li>
                                <img alt="" src={require("../imgs/ic.png")}/>
                            </li>
                            <li>
                                <img  alt="" src={require("../imgs/ic1.png")}/>
                            </li>
                            <li>
                                <img alt=""  src={require("../imgs/ic2.png")}/>
                            </li>
                            <li>
                                <img  alt="" src={require("../imgs/ic3.png")}/>
                            </li>
                        </ul>   
                    </div>
                </div>
                <div className = "footer">
                    <div className="container clearfix">
                        <div>
                            <Link to="/">
                                <img  alt="" src={require("../imgs/log.png")}/>
                                <p>shopin于2004年正式涉足电商领域。2016年，shopin集团市场交易额达到9392亿元。2017年7月，shopin再次入榜《财富》全球500强，位列第261位，成为排名最高的中国互联网企业，在全球仅次于亚马逊和Alphabet，位列互联网企业第三。
2015年7月，shopin凭借高成长性入选纳斯达克100指数和纳斯达克100平均加权指数。
                                </p>
                            </Link>
                        </div>
                        <div className="col col-first">
                            <h6>关 于</h6>
                            <ul>
                                <li>关于我们</li>
                                <li>联系方式</li>
                                <li>意见反馈</li>
                                <li>合作招商</li>
                            </ul>
                        </div>
                        <div className="col">
                            <h6>支付方式</h6>
                            <ul>
                                <li>货到付款</li>
                                <li>在线支付</li>
                                <li>分期付款</li>
                                <li>邮局汇款</li>
                            </ul>
                        </div>
                        <div className="col">
                            <h6>配送方式</h6>
                            <ul>
                                <li>上门自提</li>
                                <li>定时送达</li>
                                <li>海外配送</li>
                                <li>收费标准</li>
                            </ul>
                        </div>
                        <div className="qrcode">
                            <h6>扫码关注</h6>
                            <div>
                                <img alt="" src={require("../imgs/qrcode.png")} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copy">
                    <div className="container">
                        <p>Copyright &copy; 2018 NiePeng All Rights Reserved | 仅作学习使用，欢迎转载本网站之所有信息 | 违法和不良信息举报电话：4006561155</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Foot;