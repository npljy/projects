import React , {Component} from "react"
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import users from '../data/user'

class ForgetR extends Component{
    constructor(){
        super()
        this.state={
            user:"",
            phone:"",
            email:"",
            pwd:'',
            success:false //是否取回密码成功
        }
    }

    // 输入用户名及用户名格式验证，是否存在相同用户名的验证
    changeUser = (ev)=>{
        this.setState({
            user:ev.target.value
        })

        if( (/^[a-zA-Z]\w{3,7}$/).test(ev.target.value) ){
            this.refs["reg-user-tip"].value = "√ 恭喜，用户名格式正确";
            this.refs["reg-user-tip"].style.color = "#000";
        }
        else if(!(/^[a-zA-Z]\w{3,7}$/).test(ev.target.value)){
            this.refs["reg-user-tip"].value = "X 用户名格式不正确"
            this.refs["reg-user-tip"].style.color = "#f00";
        }
 
        if(ev.target.value==="")this.refs["reg-user-tip"].value = ev.target.value;
    }
    // 输入电话及其格式验证
    changePhone = (ev)=>{
        this.setState({
            phone:ev.target.value
        })
        if((/^1[3|5-9]\d{9}$/).test(ev.target.value)){
            this.refs["reg-phone-tip"].value = "√ 恭喜，手机号码可用";
            this.refs["reg-phone-tip"].style.color = "#000";
        }
        else{
            this.refs["reg-phone-tip"].value = "X 手机号码格式不正确"
            this.refs["reg-phone-tip"].style.color = "#f00";
        }

        if(ev.target.value==="")this.refs["reg-phone-tip"].value = ev.target.value;
    }
    // 输入邮箱及其格式验证
    changeEmail = (ev)=>{
        this.setState({
            email:ev.target.value
        })
        if((/^[a-z][\w|\.|-]{3,11}@[a-z0-9]{2,8}(\.[a-z]{2,3}){1,2}$/).test(ev.target.value)){
            this.refs["reg-email-tip"].value = "√ 恭喜，邮箱可用";
            this.refs["reg-email-tip"].style.color = "#000";
        }
        else{
            this.refs["reg-email-tip"].value = "X 邮箱格式不正确"
            this.refs["reg-email-tip"].style.color = "#f00";
        }
        if(ev.target.value==="")this.refs["reg-email-tip"].value = ev.target.value;
    }

    // 验证
    getPwd=()=>{
        let { user,phone,email} =  this.state;
        users.forEach(e=>{
            if(e.user === user && e.phone === phone && e.email === email){
                this.refs["reg-pwd-tip1"].value="√ 恭喜你，密码取回成功，请牢记！"
                this.refs["reg-pwd-tip1"].style.color = "#f00";
                this.setState({
                    pwd:e.pwd,
                    success:true
                })
            }  
        })
        let {success} = this.state;
        if(!success){
            this.refs["reg-pwd-tip1"].value="X 您输入的信息有误，请核对后再次验证！"
            this.refs["reg-pwd-tip1"].style.color = "#000";
        }
    }
    newPath = ()=>{
        let { dispatch } = this.props;
        dispatch({ type: "NEW_PATH" });
    }
    render(){
        let {user,phone,email,pwd} = this.state;
      
        return(
            <div className="replace login">
                <div className="l-banner">
                    <div className="container">
                        <h2>取回密码</h2>
                        <label></label>
                        <h3>取回密码</h3>
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
                                    <input type="text" value={pwd} placeholder="若取回成功，密码将显示在此处"/>
                                </div>

                                <div className="login-sub reg-sub">
                                    <span
                                        onClick = {this.getPwd}
                                    >取 回</span>
                                    <Link to="/login" onClick = {this.newPath} >立即登录</Link>
                                </div>
                            </div>
                            <div className="login-form login-info">
                                <div className="login-user" >
                                    <input placeholder="用户名是以字母开头，由字母数字下划线组成，4位到8位" disabled  ref = "reg-user-tip"/>
                                </div>
                                <div className="login-pwd" >
                                    <input placeholder="仅支持大国大陆手机号码" disabled ref = "reg-phone-tip"/>
                                </div>
                                <div className="login-user" >
                                    <input placeholder="必须输入格式正确的邮箱" disabled ref = "reg-email-tip"/>
                                </div>
                                <div className="login-pwd" >
                                    <input disabled ref = "reg-pwd-tip1"/>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
          
    }
}
const Forget = connect(state=>state)(ForgetR);
export default Forget;