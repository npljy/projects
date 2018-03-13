import React , {Component} from "react"
import {Link} from 'react-router-dom'
import users from '../data/user'

class Login extends Component{
    constructor(){
        super()
        this.state={
            userval:'',
            pwdval:''
        }
    }
    changeUser = (ev)=>{
        let val = ev.target.value;
        this.setState({
            userval:val
        })
    }
    changePwd = (ev)=>{
        let val = ev.target.value;
        this.setState({
            pwdval:val
        })
    }
    login = ()=>{
        let {userval,pwdval} = this.state;
        let {initCart} = this.props;
        let onoff = false;
        users.forEach(e=>{
            if(e.user === userval){
                if(e.pwd === pwdval){
                    onoff = true;
                    return;
                }
            }
        })
        if(onoff){
            this.refs.userTip.style.color = this.refs.pwdTip.style.color = "#999";
            // 登录成功，写入cookie
            let t = new Date();
            t.setDate(t.getDate()+1);
            document.cookie = 'u='+userval+';expires='+t;
            initCart();
            // 跳转至上一页
            window.history.back(-1);
        }
        else{
            this.refs.userTip.value = this.refs.pwdTip.value = "用户名或密码错误";
            this.refs.userTip.style.color = this.refs.pwdTip.style.color = "red";
        }
    }
    render(){
        let {userval,pwdval} = this.state;
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
                                    <input type="text" ref="user" placeholder="请输入用户名"
                                        value = {userval}
                                        onChange = {this.changeUser}
                                    />
                                </div>
                                <div className="login-pwd">
                                    <input type="password" ref="pwd" placeholder="请输入密码"
                                        value = {pwdval}
                                        onChange = {this.changePwd}
                                    />
                                </div>
                                <div className="login-sub">
                                    <span
                                        onClick = {this.login}
                                    >登 录</span>
                                    <Link to="/forget">忘记密码？</Link>
                                    <Link to="/reg">还没有账号？立即免费注册</Link>
                                </div>
                            </div>
                            <div className="login-form login-info">
                                <div className="login-user">
                                    <input placeholder="请输入用户名" disabled ref="userTip"/>
                                </div>
                                <div className="login-pwd">
                                    <input placeholder="请输入密码" disabled ref="pwdTip" />
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