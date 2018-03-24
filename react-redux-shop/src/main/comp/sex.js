// 分类页面，根据路由分别加载不同的种类商品
import React , {Component} from "react"
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import data from "../data/data"
import users from '../data/user'
import List from "./list"

class SexR extends Component{
    constructor(props){
        super(props);
        this.state={
            cont:data,
            list:[],
            disarr:[],
            styarr:[],
            tmp:[],
            onoff:false,
            hc:false,
            userval:'',
            pwdval:'',
            wrong:false,
            tolog:false
        }
    }
    // 图片放大
    togmaskS = (id)=>{
        let {togfn} = this.props;
        togfn(id);
    }
    newPath =()=>{
        let { dispatch } = this.props;
        dispatch({ type: "NEW_PATH" });
    }
    // 筛选方法
    dis = (ev)=>{
        let flts = Array.from(document.getElementById('filter').getElementsByTagName('input'));
        let diss = Array.from(document.getElementById('dis').getElementsByTagName('input'));
        let stys = Array.from(document.getElementById('sty').getElementsByTagName('input'));
        let {cont,list,styarr,tmp,onoff} = this.state;
        let {sex} = this.props;
        this.setState({
            hc:false
        })
        onoff = true;
        if(flts.every(e=>!e.checked))onoff = false;
        if(stys.every(e=>!e.checked)){
            list = cont.filter(e=>{
                if(sex==='hot')return e.hot;
                else return e.sex === sex;
            })
        }
        if(stys.some(e=>e.checked) ){
            list = [...new Set(styarr.map(e=>e))];
        }
        if(diss.every(e=>!e.checked)){
            list = cont.filter(e=>{
                if(sex==='hot')return e.hot;
                else return e.sex === sex;
            })

            let sty0 = list.filter(e=>{
                return e.type === 'jean';
            })
            let sty1 = list.filter(e=>{
                return e.type === 'coat';
            })
            let sty2 = list.filter(e=>{
                return e.type === 'shirt';
            })
    
            stys.forEach((e,i)=>{
                if(e.checked){
                    switch(i){
                        case 0 :
                            tmp = tmp.concat(sty0);
                            break;
                        case 1 :
                            tmp = tmp.concat(sty1);
                            break;
                        case 2 :
                            tmp = tmp.concat(sty2);
                            break; 
                        default :
                            tmp = list.map(e=>e);
                            break;
                    }
                }
            })

        }
        else{
            let dis0 = list.filter(e=>{
                return e.sale/e.price >= 0.9 && e.sale/e.price < 1;
            })
            let dis1 = list.filter(e=>{
                return e.sale/e.price >= 0.8 && e.sale/e.price < 0.9;
            })
            let dis2 = list.filter(e=>{
                return e.sale/e.price >= 0.7 && e.sale/e.price < 0.8;
            })
            let dis3 = list.filter(e=>{
                return e.sale/e.price >= 0.6 && e.sale/e.price < 0.7;
            })
            let dis4 = list.filter(e=>{
                return e.sale/e.price >= 0.5 && e.sale/e.price < 0.6;
            })
    
            diss.forEach((e,i)=>{
                if(e.checked ){
                    switch(i){
                        case 0 :
                            tmp = tmp.concat(dis0);
                            break;
                        case 1 :
                            tmp = tmp.concat(dis1);
                            break;
                        case 2 :
                            tmp = tmp.concat(dis2);
                            break;
                        case 3 :
                            tmp = tmp.concat(dis3);
                            break;
                        case 4 :
                            tmp = tmp.concat(dis4);
                            break;
                        default:
                            tmp = list.map(e=>e);
                            break;
                    }
                }   
            })
        }
       
        if(tmp.length === 0 && !ev.target.checked )tmp = [...new Set(styarr.map(e=>e))];
        if(flts.every(e=>!e.checked)){
            tmp = cont.filter(e=>{
                if(sex==='hot')return e.hot;
                else return e.sex === sex;
            })
        }
        this.setState({
            list:[...new Set(tmp.map(e=>e))],
            disarr:[...new Set(tmp.map(e=>e))],
            onoff
        })

    }

    sty = (ev)=>{
        let flts = Array.from(document.getElementById('filter').getElementsByTagName('input'));
        let diss = Array.from(document.getElementById('dis').getElementsByTagName('input'));
        let stys = Array.from(document.getElementById('sty').getElementsByTagName('input'));
        let {cont,list,disarr,tmp,onoff} = this.state;
        let {sex} = this.props;
        this.setState({
            hc:false
        })
        onoff = true;
        if(flts.every(e=>!e.checked))onoff = false;
        if(diss.every(e=>!e.checked)){
            list = cont.filter(e=>{
                if(sex==='hot')return e.hot;
                else return e.sex === sex;
            })
        }

        if(diss.some(e=>e.checked)){
            list = [...new Set(disarr.map(e=>e))];
        }
        if(stys.every(e=>!e.checked)){
            list = cont.filter(e=>{
                if(sex==='hot')return e.hot;
                else return e.sex === sex;
            })
             let dis0 = list.filter(e=>{
                return e.sale/e.price >= 0.9 && e.sale/e.price < 1;
            })
            let dis1 = list.filter(e=>{
                return e.sale/e.price >= 0.8 && e.sale/e.price < 0.9;
            })
            let dis2 = list.filter(e=>{
                return e.sale/e.price >= 0.7 && e.sale/e.price < 0.8;
            })
            let dis3 = list.filter(e=>{
                return e.sale/e.price >= 0.6 && e.sale/e.price < 0.7;
            })
            let dis4 = list.filter(e=>{
                return e.sale/e.price >= 0.5 && e.sale/e.price < 0.6;
            })

            diss.forEach((e,i)=>{
                if(e.checked ){
                    switch(i){
                        case 0 :
                            tmp = tmp.concat(dis0);
                            break;
                        case 1 :
                            tmp = tmp.concat(dis1);
                            break;
                        case 2 :
                            tmp = tmp.concat(dis2);
                            break;
                        case 3 :
                            tmp = tmp.concat(dis3);
                            break;
                        case 4 :
                            tmp = tmp.concat(dis4);
                            break;
                        default:
                            tmp = list.map(e=>e);
                            break;
                    }
                }   
            })
        }
        else {
            let sty0 = list.filter(e=>{
                return e.type === 'jean';
            })
            let sty1 = list.filter(e=>{
                return e.type === 'coat';
            })
            let sty2 = list.filter(e=>{
                return e.type === 'shirt';
            })
    
            stys.forEach((e,i)=>{
                if(e.checked){
                    switch(i){
                        case 0 :
                            tmp = tmp.concat(sty0);
                            break;
                        case 1 :
                            tmp = tmp.concat(sty1);
                            break;
                        case 2 :
                            tmp = tmp.concat(sty2);
                            break; 
                        default :
                            tmp = list.map(e=>e);
                            break;
                    }
                }
            })

        }

        if(tmp.length === 0 && ev.target.checked === false)tmp = [...new Set(disarr.map(e=>e))];
        if(flts.every(e=>!e.checked)){
            tmp = cont.filter(e=>{
                if(sex==='hot')return e.hot;
                else return e.sex === sex;
            })
        }
        this.setState({
            list:[...new Set(tmp.map(e=>e))],
            styarr:[...new Set(tmp.map(e=>e))],
            onoff
        })

    }
    // 监听 路由变化，解决 切换路由 list 值不变的问题
    componentWillReceiveProps(nextProps) {
        if (nextProps.sex !== this.props.sex) {
            this.setState({
                hc:true
            })
        }
    }

    addcart2=(num,count)=>{
        let {addcart1} = this.props;
        addcart1(num,count)
    }

    // 登录
    username=(ev)=>{
        this.setState({
            userval:ev.target.value
        })
    }
    password=(ev)=>{
        this.setState({
            pwdval:ev.target.value
        })
    }
    login = ()=>{
        let {userval,pwdval} = this.state;
        let {initCart} = this.props;
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
            let { dispatch } = this.props;
            dispatch({ type: "NEW_PATH" });
            // 登录成功，写入cookie
            let t = new Date();
            t.setDate(t.getDate()+1);
            document.cookie = 'u='+userval+';expires='+t;
            initCart(); // 初始化购物车
            
            this.setState({
                userval:'',
                pwdval:'',
                wrong:false,
                tolog:false
            })
        }
        else{
            this.setState({
                wrong:true
            })
        }
    }
    tologin=()=>{
        this.setState({
            tolog:true
        })
    }
    closeLogin = ()=>{
        this.setState({
            tolog:false
        })
    }

    render(){ 
        
        let {cont,list,onoff,hc,userval,pwdval,wrong,tolog} = this.state;
        let {sex} = this.props;
        let str = '';
   
        switch (sex){
            case 'women' :  
                str = '女 装' ; break ;
            case 'man' :  
                str = '男 装' ; break ;
            case 'kid' :  
                str = '儿 童' ; break ;
            case 'hot' :  
                str = '热 卖' ; break ;
            default : break;
        }
        if(list.length === 0 && !onoff ){
            list = cont.filter(e=>{
                if(sex==='hot')return e.hot
                else return e.sex === sex
            })
        }
        if(hc){
            list = cont.filter(e=>{
                if(sex==='hot')return e.hot
                else return e.sex === sex
            })
            let flts = Array.from(document.getElementById('filter').getElementsByTagName('input'));
            flts.forEach(e=>e.checked=false)
        }
        let divlist = list.map((e,i)=>{
            return (
                <List {...{
                    key:i,
                    id : e.id,
                    sex : e.sex,
                    title : e.title,
                    type:e.type,
                    price : e.price,
                    sale : e.sale,
                    img : e.img,
                    count : e.count,
                    send : e.send,
                    togS : this.togmaskS,
                    addcart2:this.addcart2,
                    tologin:this.tologin
                    
                }}/>
            )
        })

        divlist.length > 12 && (divlist.length = 12);

        return(

            <div className="replace login">
                <div id="tologin" className="tologin" ref="tologin" 
                    style={{display:tolog?"block":"none"}}
                ></div>
                <div className="logindiv" style={{display:tolog?"block":"none"}}>
                    <div className="close"
                        onClick ={this.closeLogin}
                    >X</div>
                    <ul>
                        <li><input placeholder="请输入用户名"
                            value = {userval}
                            onChange = {this.username}
                        /></li>
                        <li><input placeholder="请输入密码"
                            value = {pwdval}
                            onChange = {this.password}
                        /></li>
                    </ul>
                    <div className="sure">
                        <span
                            onClick = {this.login}
                        >登 录</span>
                        <strong className="wrong" ref="wrong" style={{display:wrong?"inline-block":"none"}}>帐号或密码错误</strong>
                        <Link to="/forget"  onClick = {this.newPath}>忘记密码</Link>
                        <Link to="/reg"  onClick = {this.newPath}>免费注册</Link>
                    </div>
                </div>
                <div className="l-banner">
                    <div className="container">
                        <h2>更多商品</h2>
                        <label></label>
                        <h3>{str}</h3>
                    </div>
                </div>
                <div className="w-mid cont-mid">
                    <div className="container clearfix">
                        <div className="w-mid-l">
                            <ul>
                                {divlist}
                            </ul>
                        </div>
                        <div className="w-mid-r" id="filter">
                            <div>
                                <h5>折 扣</h5>
                                <ul id="dis">
                                    <li><input type="checkbox" name="discount" flt="9" onClick = {this.dis} />9 折</li>
                                    <li><input type="checkbox" name="discount" flt="8" onClick = {this.dis}/>8 折</li>
                                    <li><input type="checkbox" name="discount" flt="7" onClick = {this.dis}/>7 折</li>
                                    <li><input type="checkbox" name="discount" flt="6" onClick = {this.dis}/>6 折</li>
                                    <li><input type="checkbox" name="discount" flt="5" onClick = {this.dis}/>5 折</li>
                                </ul>
                            </div>
                            <div>
                                <h5>款 式</h5>
                                <ul id="sty">
                                    <li><input type="checkbox" name="style" flt="jean" onClick = {this.sty}/>jean</li>
                                    <li><input type="checkbox" name="style" flt="coat" onClick = {this.sty}/>coat</li>
                                    <li><input type="checkbox" name="style" flt="shirt" onClick = {this.sty}/>shirt</li>
                                </ul>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        )
        
        
    }
}
const Sex = connect(state=>state)(SexR);
export default Sex;