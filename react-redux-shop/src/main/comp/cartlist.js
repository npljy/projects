import React , {Component} from 'react'
import data from "../data/data"
import Error from './error'
import {Link} from 'react-router-dom'

class CartList extends Component{

    render(){
        
            return (
                <ul >
                    <li>
                        <Link >
                            <img alt="" src={require("../imgs/pc1.jpg")} width="98" height="115"/>
                        </Link>
                        <p>111</p>
                        <p>222</p>
                    </li>
                    <li className="cart-num">
                        RMB：88
                    </li>
                    <li className="cart-num">
                       9
                    </li>
                    <li className="cart-num">
                        RMB：45456
                    </li>
                    <li className="cart-num" ><span className="del"
                        
                    >删除</span></li>
                </ul>
            )
       
    }
}

export default CartList