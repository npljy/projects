import React , {Component} from 'react'
import data from "../data/data"

class CartList extends Component{
    constructor(props){
        super(props);
        this.state={
            cont:data
        }
    }
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
        return (
            <ul pid={id}>
                <li>
                    <a>
                        <img alt="" src={require("../"+this.findinfo(id)[0])} width="98" height="115"/>
                    </a>
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
}

export default CartList