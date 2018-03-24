import React , {Component} from 'react'
import CartList from './cartlist'
import Login from './login'
class Cart extends Component{
    constructor(){
        super();
        this.state = {}
    }
    initCart1 = ()=>{
        let {initCart} = this.props;
        initCart();
    }
    render(){
        // 获取cookie中的 u=* 
        let ck = document.cookie.split("; ").find(e=>/^u=/.test(e));
        // 获取 = 号后面的值，去除两端的空格 和 引号（此处的引号也属于字符串的一部分，所以去掉）
        let user = ck ? ck.split("=")[1].replace(/((^"*)|("*$))|((^\s*)|(\s*$))/g,""):null;
        let cartlist;
        let num = 0;
        // 如果获取到用户
        if(user){
            // 获取此用户的存在localstorage中的购物车信息
            let carts =JSON.parse(localStorage.getItem(user));
            // 如果有商品
            if(carts){
                // 循环获取到购物车中的商品总价格
                carts.forEach(e=>{
                    num += Number(e.sum) * Number(e.pri);
                })
                // 循环购物车组件
                cartlist = carts.map((e,i)=>{
                    return (
                        <CartList {...{
                            key:i,
                            id:e.id,
                            sum:e.sum,
                            pri:e.pri,
                            initCart : this.initCart1
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
                                {/* 解构出 购物车列表 ↓ */}
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
            return <Login />
        }
    }
}

export default Cart