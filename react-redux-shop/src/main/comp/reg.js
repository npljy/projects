import React , {Component} from "react"
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import users from '../data/user'
import Login from './login'

class RegR extends Component{
    constructor(){
        super()
        this.state={
            user:"",
            phone:"",
            email:"",
            pwd1:"",
            pwd2:"",
            pass:[false,false,false,false,false],
            success:false //是否直接跳转登录
        }
    }
    // 传给 登录组件的方法
    initCart2=()=>{
        let {initCart} = this.props;
        initCart();
    }
    // 输入用户名及用户名格式验证，是否存在相同用户名的验证
    changeUser = (ev)=>{
        let {pass} = this.state;
        this.setState({
            user:ev.target.value
        })

        if( (/^[a-zA-Z]\w{3,7}$/).test(ev.target.value) && !users.find(e=>e.user === ev.target.value) ){
            this.refs["reg-user-tip"].value = "√ 恭喜，用户名可用";
            this.refs["reg-user-tip"].style.color = "#000";
            pass[0]=true;
        }
        else if(!(/^[a-zA-Z]\w{3,7}$/).test(ev.target.value)){
            this.refs["reg-user-tip"].value = "X 用户名格式不正确"
            this.refs["reg-user-tip"].style.color = "#f00";
            pass[0]=false;
        }
        else{
            this.refs["reg-user-tip"].value = "X 用户名已被占用"
            this.refs["reg-user-tip"].style.color = "#f00";
            pass[0]=false;
        }
        this.setState({
            pass
        })
        if(ev.target.value==="")this.refs["reg-user-tip"].value = ev.target.value;
    }
    // 输入电话及其格式验证
    changePhone = (ev)=>{
        let {pass} = this.state;
        this.setState({
            phone:ev.target.value
        })
        if((/^1[3|5-9]\d{9}$/).test(ev.target.value)){
            this.refs["reg-phone-tip"].value = "√ 恭喜，手机号码可用";
            this.refs["reg-phone-tip"].style.color = "#000";
            pass[1]=true;
        }
        else{
            this.refs["reg-phone-tip"].value = "X 手机号码格式不正确"
            this.refs["reg-phone-tip"].style.color = "#f00";
            pass[1]=false;
        }
        this.setState({
            pass
        })
        if(ev.target.value==="")this.refs["reg-phone-tip"].value = ev.target.value;
    }
    // 输入邮箱及其格式验证
    changeEmail = (ev)=>{
        let {pass} = this.state;
        this.setState({
            email:ev.target.value
        })
        if((/^[a-z][\w|\.|-]{3,11}@[a-z0-9]{2,8}(\.[a-z]{2,3}){1,2}$/).test(ev.target.value)){
            this.refs["reg-email-tip"].value = "√ 恭喜，邮箱可用";
            this.refs["reg-email-tip"].style.color = "#000";
            pass[2]=true;
        }
        else{
            this.refs["reg-email-tip"].value = "X 邮箱格式不正确"
            this.refs["reg-email-tip"].style.color = "#f00";
            pass[2]=false;
        }
        this.setState({
            pass
        })
        if(ev.target.value==="")this.refs["reg-email-tip"].value = ev.target.value;
    }
     // 输入密码及其格式验证
    changePwd1 = (ev)=>{
        let {pass} = this.state;
        this.setState({
            pwd1:ev.target.value
        })
        if((/^.{6,12}$/).test(ev.target.value)){
            this.refs["reg-pwd-tip1"].value = "√ 恭喜，密码可用";
            this.refs["reg-pwd-tip1"].style.color = "#000";
            pass[3]=true;
        }
        else{
            this.refs["reg-pwd-tip1"].value = "X 密码格式不正确"
            this.refs["reg-pwd-tip1"].style.color = "#f00";
            pass[3]=false;
        }
        this.setState({
            pass
        })
        if(ev.target.value==="")this.refs["reg-pwd-tip1"].value = ev.target.value;
    }
     // 确认密码及其格式验证
    changePwd2= (ev)=>{
        let {pwd1,pass} = this.state;
        this.setState({
            pwd2:ev.target.value
        })
        if(ev.target.value === pwd1){
            this.refs["reg-pwd-tip2"].value = "√ 两次输入的密码一致"
            this.refs["reg-pwd-tip2"].style.color = "#000";
            pass[4]=true;
        }
        else{
            this.refs["reg-pwd-tip2"].value = "X 两次输入的密码不一致"
            this.refs["reg-pwd-tip2"].style.color = "#f00";
            pass[4]=false;
        }
        this.setState({
            pass
        })
        if(ev.target.value==="")this.refs["reg-pwd-tip2"].value = ev.target.value;
    }
    // 验证通过之后，点击注册按钮，将注册信息存入记录用户信息的user.js的数组中
    regUser =()=>{
        let {user,phone,email,pwd1,pass} = this.state;
        if(pass.every(e=>e===true)){
            users.push({
                user:user,
                phone:phone,
                email:email,
                pwd:pwd1
            })
            window.confirm("注册成功，是否立即登录",
                this.setState({
                    success:true
                })
            )
        }
       
    }
    togfn1 = ()=>{
        let {togfn} = this.props;
        togfn();
    }
    addcart2 = ()=>{
        let {addcart1} = this.props;
        addcart1();
    }
    newPath = ()=>{
        let { dispatch } = this.props;
        dispatch({ type: "NEW_PATH" });
    }
    render(){
        let {user,phone,email,pwd1,pwd2,success} = this.state;
        if(success){
            return <Login from="reg" initCart={this.initCart2}  togfn={this.togfn1} addcart1={this.addcart2}/>
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
                                    <div className="login-user reg-user">
                                        <input placeholder="请输入用户名"
                                            value={user}
                                            onChange = {this.changeUser}
                                        />
                                    </div>
                                    <div className="login-phone reg-phone">
                                        <input placeholder="请输入手机"
                                            value={phone}
                                            onChange = {this.changePhone}
                                        />
                                    </div>
                                    <div className="login-email reg-email">
                                        <input placeholder="请输入邮箱"
                                            value={email}
                                            onChange = {this.changeEmail}
                                        />
                                    </div>
                                    <div className="login-pwd reg-pwd">
                                        <input type="password" placeholder="请输入密码"
                                            value={pwd1}
                                            onChange = {this.changePwd1}
                                        />
                                    </div>
                                    <div className="login-pwd reg-pwd">
                                        <input type="password" placeholder="请确认密码"
                                            value={pwd2}
                                            onChange = {this.changePwd2}
                                        />
                                    </div>
                                    <div className="login-sub reg-sub">
                                        <span
                                            onClick = {this.regUser}
                                        >提 交</span>
                                        <Link to="/login" onClick={this.newPath} >已有账号，立即登录</Link>
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
}
const Reg = connect(state=>state)(RegR);
export default Reg;