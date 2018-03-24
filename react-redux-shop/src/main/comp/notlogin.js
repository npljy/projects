import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";

class NotLoginR extends Component{
    constructor(){
        super();
        this.state={}
    }
    newPath = ()=>{
        let {dispatch} = this.props;
        dispatch({type:'NEW_PATH'})
    }
    render(){
        return(
            <ul>
                <li><Link to="/login"
                    onClick = {this.newPath}
                >登 录</Link></li>
                <li><Link to="/reg"
                    onClick = {this.newPath}
                >注 册</Link></li>
                <li><Link to="/forget"
                    onClick = {this.newPath}
                >忘记密码</Link></li>
                <li><Link to="/cart"
                    onClick = {this.newPath}
                >我的订单</Link></li>
            </ul>
        )
    }
}
const NotLogin = connect(state=>state)(NotLoginR);
export default NotLogin;