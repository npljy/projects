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
                                <div className="login-user reg-user">
                                    <input placeholder="请输入用户名"/>
                                </div>
                                <div className="login-phone reg-phone">
                                    <input placeholder="请输入联系电话"/>
                                </div>
                                <div className="login-email reg-email">
                                    <input placeholder="请输入邮箱"/>
                                </div>
                                <div className="login-pwd reg-pwd">
                                    <input placeholder="请输入密码"/>
                                </div>
                                <div className="login-pwd reg-pwd">
                                    <input placeholder="请确认密码"/>
                                </div>
                                <div className="login-sub reg-sub">
                                    <span>提 交</span>
                                    <Link to="/login">已有账号，立即登录</Link>
                                </div>
                            </div>
                            <div className="login-form login-info">
                                <div className="login-user reg-user-tip">
                                    <input placeholder="请输入用户名" disabled />
                                </div>
                                <div className="login-pwd reg-phone-tip">
                                    <input placeholder="请输入手机" disabled />
                                </div>
                                <div className="login-user reg-email-tip">
                                    <input placeholder="请输入邮箱" disabled />
                                </div>
                                <div className="login-pwd reg-pwd-tip1">
                                    <input placeholder="请输入密码" disabled />
                                </div>
                                <div className="login-pwd reg-pwd-tip2">
                                    <input placeholder="请确认密码" disabled />
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