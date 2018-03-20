// 判断已经登录，则 导航条处 加载此组件
import React , {Component} from 'react'
import {Link} from 'react-router-dom'

class IsLogin extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    quit =()=>{
        let {logout,initCart} = this.props;
        document.cookie = 'u="";expires="-1"';
        initCart();
        logout();
    }
    render(){
        let ck = document.cookie.split("; ").find(e=>/^u=/.test(e));
        let user = ck ? ck.split("=")[1]:null;
        return(
            <ul>
                <li><span>你好，{user}</span></li>
                <li><a
                    onClick = {this.quit}
                >退出登录</a></li>
                <li><Link to="/cart">我的订单</Link></li>
            </ul>
        )
    }
}

export default IsLogin