import React , {Component} from "react"
import {Link} from 'react-router-dom' 
import data from '../data/data'
class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            cont:data,
            zimg:''
        }
    }
    zoom = (id)=>{
        let {togS,togH} = this.props;
        togS && togS(id);
        togH && togH(id);
    }

    addcart=()=>{
        
    }

    render(){
        let {id,sex,title,price,sale,img,count,send } = this.props;

        return (
            <li>
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
                                <h6><Link to={`/detail?id=${id}`} >{title}</Link></h6>
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
                                <span>{count-send}</span>
                                &nbsp;/&nbsp;
                                <strong>88</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default List
