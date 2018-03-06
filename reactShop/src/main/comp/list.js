import React , {Component} from "react"

class List extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        let {id,sex,title,price,sale,img,count,send } = this.props;
        console.log(`${img}`)
        return (
            <li>
                <div>
                    <div className="pro-img">
                        <img alt="" src={img}/>
                    </div>
                    <div className="pro-txt">
                        <div className="txt-top clearfix">
                            <div className="sex-style">
                                <span>{sex}</span>
                                <h6><a>{title}</a></h6>
                            </div>
                            <div className="pro-add">
                                <a><img alt="" src={require("../imgs/ca.png")}/></a>
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
