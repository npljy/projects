import React , {Component} from 'react'
import CartList from './cartlist'

class Cart extends Component{
    constructor(){
        super();
        this.state = {}
    }
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
                                <li>商 品</li>
                                <li>价 格</li>
                                <li>数 量</li>
                                <li>总 价</li>
                                <li></li>
                            </ul>
                        </div>
                        <div className="cart-list clearfix">
                            {/* 购物车列表 ↓ */}
                            {/* 购物车列表 ↑ */}
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart