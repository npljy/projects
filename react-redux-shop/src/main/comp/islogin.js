// 判断已经登录，则 导航条处 加载此组件
import React , {Component} from 'react'
class IsLogin extends Component{

    render(){
        let ck = document.cookie.split("; ").find(e=>/^u=/.test(e));
        let user = ck ? ck.split("=")[1]:null;
        return(
            <ul>
                <li><span>你好，{user}</span></li>
                <li><a
                    onClick = {this.quit}
                >退出登录</a></li>
            </ul>
        )
    }
}

export default IsLogin