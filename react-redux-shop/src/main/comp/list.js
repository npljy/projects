import React , {Component} from "react"
import {Link} from 'react-router-dom' 
import data from '../data/data'

class List extends Component{

    render(){
        let {id,sex,title,type,price,sale,img,count,send} = this.props;
        
        return (
            <li>
                <div id="tips" ref="tips">成功添加到购物车</div>
                <div>
                    <div className="pro-img">
                        <img alt="" src={require(`../${img}`)}/>
                        <div>
                            <a
                                onClick = {this.zoom.bind(this,id)}
                            ><img  alt="" src={require("../imgs/zoom.png")}/></a>
                            <Link to={`/detail?id=${id}`} ><img  alt="" src={require("../imgs/detail.png")}/></Link>
                        </div>
                    </div>
                    <div className="pro-txt">
                        <div className="txt-top clearfix">
                            <div className="sex-style">
                                <span>{sex}</span>
                                <h6><Link to={`/detail?id=${id}`} >{title}/{type}</Link></h6>
                            </div>
                            <div className="pro-add">
                                <a
                                    onClick = {this.addcart}
                                ><img alt="" src={require("../imgs/ca.png")}/></a>
                            </div>
                        </div>
                        <div className="txt-btm clearfix">
                            <div className="pro-price">
                                <span>RMB：{price}</span>
                                    &nbsp;
                                <strong>RMB：{sale}</strong>
                            </div>
                            <div className="pro-count">
                                <strong>{count-send}</strong>
                                &nbsp;/&nbsp;
                                <span>{count}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )

    }
}

export default List
