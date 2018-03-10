import React , {Component} from "react"
import {Link} from 'react-router-dom'

class Login extends Component{
    constructor(){
        super()
        this.state={}
    }

    render(){
        return(
            <div className="replace">
                <div className="l-banner">
                    <div className="container">
                        <h2>用户登录</h2>
                        <label></label>
                        <h3>登录</h3>
                    </div>
                </div>
                <div className="w-mid cont-mid">
                    <div className="container">
                        <div className="login clearfix">
                            <div className="login-form">
                                <div className="login-user">
                                    <input placeholder="请输入用户名"/>
                                </div>
                                <div className="login-pwd">
                                    <input placeholder="请输入密码"/>
                                </div>
                                <div className="login-sub">
                                    <span>登 录</span>
                                    <Link to="/forget">忘记密码？</Link>
                                    <Link to="/reg">还没有账号？立即免费注册</Link>
                                </div>
                            </div>
                            <div className="login-form login-info">
                                <div className="login-user">
                                    <input placeholder="请输入用户名" disabled />
                                </div>
                                <div className="login-pwd">
                                    <input placeholder="请输入密码" disabled />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
        
        
    }
}

export default Login;