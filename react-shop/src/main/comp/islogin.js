import React , {Component} from 'react'

class IsLogin extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    quit =()=>{
        let {logout} = this.props;
        document.cookie = 'u="";expires="-1"';
        logout();
    }
    render(){
        let ck = document.cookie;
        let user = ck.split("=")[1];
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