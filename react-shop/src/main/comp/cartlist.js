import React , {Component} from 'react'
import data from "../data/data"
import Error from './error'
import {Link} from 'react-router-dom'
class CartList extends Component{
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
    render(){
        let {id,sum,pri} = this.props;
        id = Number(id);// 防止取出的值为字符串
        if(this.findinfo(id).length){
            return (
                <ul pid={id}>
                    <li>
                        <Link to={"/detail?id="+id}>
                            <img alt="" src={require("../"+this.findinfo(id)[0])} width="98" height="115"/>
                        </Link>
                        <p>{this.findinfo(id)[1]}</p>
                        <p>{this.findinfo(id)[2]}</p>
                    </li>
                    <li className="cart-num">
                        RMB：{pri}
                    </li>
                    <li className="cart-num">
                       {sum}
                    </li>
                    <li className="cart-num">
                        RMB：{pri*sum}
                    </li>
                    <li className="cart-num" ><span className="del">删除</span></li>
                </ul>
            )
        }
        else{
            return <Error />
        }
    }
}

export default CartList