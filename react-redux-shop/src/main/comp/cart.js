import React , {Component} from 'react'
import CartList from './cartlist'
import LoginErr from './loginerr'

class Cart extends Component{

    render(){
     
            return (
                <div className="replace">
                    <div className="l-banner">
                        <div className="container">
                            <h2>购物车</h2>
                            <label></label>
                            <h3>订单列表</h3>
                        </div>
                    </div>
                    <div className="container">
                        <div className="cart">
                            <div className="cart-title clearfix">
                                <ul>
                                    <li>商&nbsp;&nbsp;&nbsp;&nbsp;品</li>
                                    <li className="cart-num">价&nbsp;&nbsp;格</li>
                                    <li className="cart-num">数&nbsp;&nbsp;量</li>
                                    <li className="cart-num">总&nbsp;&nbsp;价</li>
                                    <li className="cart-num">编&nbsp;&nbsp;辑</li>
                                </ul>
                            </div>
                            <div className="cart-list clearfix">
                                {/* 解构出 购物车列表 ↓ */}
                                
                                {/* 购物车列表 ↑ */}
                            </div>
                            <div className="checkout">
                                <span></span><span>总价格  RMB：5456</span><a>结 算</a>
                            </div>
                        </div>
                    </div>
                </div>
            )

    }
}

export default Cart