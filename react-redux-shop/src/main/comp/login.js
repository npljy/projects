import React , {Component} from "react"
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import users from '../data/user'
import Home from './home'

class LoginR extends Component{
    constructor(props){
        super(props)
        this.state={
            userval:'',
            pwdval:'',
            success:false
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
        let {initCart,from,dispatch} = this.props;
        let onoff = false; //false代表默认没登陆
        users.forEach(e=>{
            if(e.user === userval){//如果用户名正确
                if(e.pwd === pwdval){//如果密码正确
                    onoff = true;//true代登录成功
                    return;
                }
            }
        })
        // 如果登录验证成功
        if(onoff){
            dispatch({type:'NEW_PATH'})
            this.refs.userTip.style.color = this.refs.pwdTip.style.color = "#999";
            // 登录成功，写入cookie
            let t = new Date();
            t.setDate(t.getDate()+1);
            document.cookie = 'u='+userval+';expires='+t;
            initCart(); // 初始化购物车
            
            // 如果是在注册页面跳转到登录页，登录成功后跳转到主页
            if(from && from === "reg"){
                this.setState({
                    success:true,
                    userval:'',
                    pwdval:''
                })
            }
            // 登录成功 跳转到之前的页面
            else{
                this.setState({
                    success:true,
                    userval:'',
                    pwdval:''
                })
            }
        }
        else{
            this.refs.userTip.value = this.refs.pwdTip.value = "用户名或密码错误";
            this.refs.userTip.style.color = this.refs.pwdTip.style.color = "red";
        }
    }
    // 跳转回主页时，传的方法
    togfn1 = ()=>{
        let {togfn} = this.props;
        togfn();
    }
    // 跳转回主页时，传的方法
    addcart2 = ()=>{
        let {addcart1} = this.props;
        addcart1();
    }
    newPath = ()=>{
        let { dispatch } = this.props;
        dispatch({ type: "NEW_PATH" });
    }
    render(){
        let {userval,pwdval,success} = this.state;
        if(success){
            return <Home togfn={this.togfn1} addcart1={this.addcart2}/>
        }else{
        
            return(
                <div className="replace login">
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
                                        <Link to="/forget" onClick={this.newPath} >忘记密码？</Link>
                                        <Link to="/reg" onClick={this.newPath} >还没有账号？立即免费注册</Link>
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
}
const Login = connect(state=>state)(LoginR)
export default Login;