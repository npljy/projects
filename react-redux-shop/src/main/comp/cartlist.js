import React , {Component} from 'react'
import { connect } from "react-redux";
import data from "../data/data"
import Error from './error'
import {Link} from 'react-router-dom'

class CartListR extends Component{
    constructor(props){
        super(props);
        this.state={
            cont:data
        }
    }
    // 找到id为num的商品的图片链接，标题，简介
    findinfo = (num)=>{
        let {cont} = this.state;
        let arr = [];
        cont.forEach(e=>{
            if(e.id ===num){
                arr=[e.img,e.title,e.abs]
            }
        })
        return arr;
    }
    rmItem =()=>{
        let {id,initCart} = this.props;
        let ck = document.cookie.split("; ").find(e=>/^u=/.test(e));
        let user = ck ? ck.split("=")[1]:null;
        let carts =JSON.parse(localStorage.getItem(user));
        if(carts){
            carts.forEach((e,i)=>{
                if(e.id === id){
                    carts.splice(i,1);
                }
            })
            localStorage.setItem(user,JSON.stringify(carts));
            initCart();
        }
    }
    change = (ev)=>{
        let {id,initCart} = this.props;
        let ck = document.cookie.split("; ").find(e=>/^u=/.test(e));
        let user = ck ? ck.split("=")[1]:null;
        let carts =JSON.parse(localStorage.getItem(user));
        if(carts){
            carts.forEach((e,i)=>{
                if(e.id === id){
                    if(ev.target.className === 'addmin'){
                        if(e.sum >1){
                            e.sum--;
                            data.forEach(el => {
                                if (el.id === Number(e.id)) {
                                    el.send --;
                                }
                            });
                        }
                        
                    } 
                    if(ev.target.className === 'addmax'){
                        data.forEach(el => {
                            if (el.id === Number(e.id) && el.send<el.count) {
                                e.sum++;
                                el.send ++;
                            }
                        });
                    } 
                }
            })
            localStorage.setItem(user,JSON.stringify(carts));
            initCart();
        }
    }
    
    newPath = ()=>{
        let {dispatch} = this.props;
        dispatch({type:'NEW_PATH'});
        dispatch({ type: "ADD_CART" }); //向 store 发送购物车状态
        document.documentElement.scrollTop = "0";
        document.body.scrollTop = "0";  
    }
    render(){
        let {id,sum,pri} = this.props;
        id = Number(id);// 防止取出的值为字符串
        if(this.findinfo(id).length){
            return (
                <ul pid={id}>
                    <li>
                        <Link to={"/detail?id="+id} onClick = {this.newPath}>
                            <img alt="" src={require("../"+this.findinfo(id)[0])} width="98" height="115"/>
                        </Link>
                        <p>{this.findinfo(id)[1]}</p>
                        <p>{this.findinfo(id)[2]}</p>
                    </li>
                    <li className="cart-num">
                        RMB：{pri}
                    </li>
                    <li className="cart-num">
                        <span className="addmin"
                            onClick = {this.change}
                        ></span>
                        <span className="enval">{sum}</span>
                        <span className="addmax"
                            onClick = {this.change}
                        ></span>
                    </li>
                    <li className="cart-num">
                        RMB：{pri*sum}
                    </li>
                    <li className="cart-num" ><span className="del"
                        onClick = {this.rmItem}
                    >删除</span></li>
                </ul>
            )
        }
        else{
            return <Error />
        }
    }
}
const CartList = connect(state=>state)(CartListR);
export default CartList