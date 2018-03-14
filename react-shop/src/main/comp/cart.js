import React , {Component} from 'react'
import CartList from './cartlist'
import LoginErr from './loginerr'

class Cart extends Component{
    constructor(){
        super();
        this.state = {}
    }
    render(){
        let ck = document.cookie.split("; ").find(e=>/^u=/.test(e));
        let user = ck ? ck.split("=")[1].replace(/((^"*)|("*$))|((^\s*)|(\s*$))/g,""):null;
        let cartlist;
        let num = 0;
        if(user){
            let carts =JSON.parse(localStorage.getItem(user));
            if(carts){
                carts.forEach(e=>{
                    num += Number(e.sum) * Number(e.pri);
                })
           
                cartlist = carts.map((e,i)=>{
                    return (
                        <CartList {...{
                            key:i,
                            id:e.id,
                            sum:e.sum,
                            pri:e.pri
                        }}/>
                    )
                })
            }

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
                                {/* 购物车列表 ↓ */}
                                {cartlist}
                                {/* 购物车列表 ↑ */}
                            </div>
                            <div className="checkout">
                                <span></span><span>总价格  RMB：{num}</span><a>结 算</a>
                            </div>
                        </div>
                    </div>
                </div>
            )

        }else{
            return <LoginErr />
        }
    }
}

export default Cart