import React , {Component} from "react"
import {Link} from 'react-router-dom'
import users from '../data/user'
import Login from './login'

class Reg extends Component{

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
                                        <input placeholder="请输入用户名"
                                           
                                        />
                                    </div>
                                    <div className="login-phone reg-phone">
                                        <input placeholder="请输入手机"
                                            
                                           
                                        />
                                    </div>
                                    <div className="login-email reg-email">
                                        <input placeholder="请输入邮箱"
                                           
                                        />
                                    </div>
                                    <div className="login-pwd reg-pwd">
                                        <input type="password" placeholder="请输入密码"
                                            
                                        />
                                    </div>
                                    <div className="login-pwd reg-pwd">
                                        <input type="password" placeholder="请确认密码"
                                            
                                        />
                                    </div>
                                    <div className="login-sub reg-sub">
                                        <span
                                           
                                        >提 交</span>
                                        <Link to="/login">已有账号，立即登录</Link>
                                    </div>
                                </div>
                                <div className="login-form login-info">
                                    <div className="login-user" >
                                        <input placeholder="必须以字母开头，由字母数字下划线组成，4位到8位" disabled  ref = "reg-user-tip"/>
                                    </div>
                                    <div className="login-pwd" >
                                        <input placeholder="仅支持大国大陆手机号码" disabled ref = "reg-phone-tip"/>
                                    </div>
                                    <div className="login-user" >
                                        <input placeholder="必须输入格式正确的邮箱" disabled ref = "reg-email-tip"/>
                                    </div>
                                    <div className="login-pwd" >
                                        <input placeholder="不得小于6位" disabled ref = "reg-pwd-tip1"/>
                                    </div>
                                    <div className="login-pwd" >
                                        <input placeholder="请再次输入密码" disabled ref = "reg-pwd-tip2"/>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            )
        
        
    }
}

export default Reg;