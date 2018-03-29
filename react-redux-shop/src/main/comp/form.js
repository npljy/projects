import React , {Component} from "react"

class Contact extends Component{
    
    render(){
           
        return(
                <div className="replace login">
                    <div className="l-banner">
                        <div className="container">
                            <h2>联系我们</h2>
                            <label></label>
                            <h3>联系我们</h3>
                        </div>
                    </div>
                    <div className="w-mid cont-mid">
                        <div className="container">
                            <div className="login clearfix">
                                <div className="login-form contact">
                                    <div className="login-user reg-user">
                                        <input placeholder="联系地址" disabled
                                            value="联系地址：北京市海淀区西三旗育新花园"
                                        />
                                    </div>
                                    <div className="login-phone reg-phone">
                                        <input placeholder="联系电话" disabled
                                            value="联系电话：176-0038-0719"
                                        />
                                    </div>
                                    <div className="login-email reg-email">
                                        <input placeholder="联系邮件" disabled
                                            value="联系邮件：niepeng521@126.com"
                                        />
                                    </div>
                                    <div className="login-pwd reg-pwd">
                                        <input type="text" placeholder="工作时间" disabled
                                            value="工作时间：工作日 9:00 - 18:00"
                                        />
                                    </div>                                    
                                </div>
                                <div className="contact">
                                    <p>
                                    shopin于2004年正式涉足电商领域。2016年，shopin集团市场交易额达到9392亿元。2017年7月，shopin再次入榜《财富》全球500强，位列第261位，成为排名最高的中国互联网企业，在全球仅次于亚马逊和Alphabet，位列互联网企业第三。
2015年7月，shopin凭借高成长性入选纳斯达克100指数和纳斯达克100平均加权指数。
                                    </p>
                                </div>                           
                            </div>
                        </div>
                    </div>
                </div>
        )
        
    }
}

export default Contact;