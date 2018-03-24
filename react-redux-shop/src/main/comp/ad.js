import React ,{Component} from "react"
class Ad extends Component{
    constructor(props){
        super();
        this.state = {}
    }
    render(){
        return (
            <div className="ad-left">
                <div className="adlogo">
                    <a target="_blank" href="/" mars_sead="home_header_vip_logo">
                        <img src={require("../imgs/ad.gif")}  alt="全球精选_正品特卖" id="J-vipLogo" height="90"/>
                    </a>
                </div>
                <div className="adtop">
                    <img src={require("../imgs/top.png")}  alt="全球精选_正品特卖" id="J-vipLogo" height="90"/>
                </div>
            </div>
        )
    }
}

export default Ad