import React ,{Component} from 'react'
import {Link,NavLink} from "react-router-dom"
class Nav extends Component {
    constructor(props){
        super(props);
        this.state={}
    }
   
    render(){
        return (
            <div className = "head-btm-l clearfix">
                <ul>
                    <li><NavLink
                        
                        to="/"
                    >首 页</NavLink></li>
                    <li><NavLink 
                            activeClassName="act"
                            
                            to="/women"
                    >女 装</NavLink></li>
                    <li><NavLink 
                            activeClassName="act"
                           
                            to="/man"
                    >男 装</NavLink></li>
                    <li><NavLink 
                            activeClassName="act"
                           
                            to="/kid"
                    >儿 童 装</NavLink></li>
                    <li><NavLink 
                            activeClassName="act"
                           
                            to="/hot"
                    >热 卖</NavLink></li>
                    <li><NavLink 
                            activeClassName="act"
                            
                            to="/contact"
                    >联系我们</NavLink></li>
                </ul>
                <Link 
                    className="search"
                    to="search"    
                >分类</Link>

            </div>
        )
    }
}
export default Nav







