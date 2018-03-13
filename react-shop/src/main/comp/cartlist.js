import React , {Component} from 'react'

class CartList extends Component{
    constructor(){
        super();
        this.state={}
    }
    render(){
        return (
            <ul>
                <li>
                    <a>
                        <img src={require("../imgs/pi.jpg")} width="98" height="115"/>
                    </a>
                    <p>accusamus</p>
                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus </p>
                </li>
                <li className="cart-num">
                    RMB：99
                </li>
                <li className="cart-num">
                    5
                </li>
                <li className="cart-num">
                RMB：495
                </li>
                <li><span className="del"></span></li>
            </ul>
        )
    }
}

export default CartList