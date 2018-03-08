import React , {Component} from "react"
import data from "../data/data"
class Detail extends Component{
    constructor(props){
        super(props)
        this.state={
            cont:data,
            addnum:1
        }
    }

    togimg=(url)=>{
        this.refs.bigimg.src = require(`../${url}`);
    }
    min = ()=>{
        let {addnum} = this.state;
        addnum = Number(addnum);
        addnum--;
        if(addnum<1)addnum = 1
        this.setState({
            addnum:addnum
        })
    }
    max = ()=>{
        let {cont,addnum} = this.state;
        let {oid} = this.props;
        let pro = cont.find(e=>e.id===Number(oid));
        addnum = Number(addnum);
        addnum++;
        if(addnum>pro.count)addnum = pro.count
        this.setState({
            addnum:addnum
        })
        
    }
    render(){
        let {cont,addnum} = this.state;
        let {oid} = this.props;
        let pro = cont.find(e=>e.id===Number(oid));
        return(
            <div className="replace">
                <div className="l-banner">
                    <div className="container">
                        <h2>商品详情</h2>
                        <label></label>
                        <h3>商品详情</h3>
                    </div>
                </div>
                <div className="w-mid cont-mid">
                    <div className="container clearfix">
                        <div className="w-mid-l clearfix">
                            <div className="de-top">
                                <div className="de-t-l">
                                    <div className="img-big">
                                        <img alt="" ref="bigimg"  src={require(`../${pro.preview[0]}`)}/>
                                    </div>
                                    <div className="img-small clearfix">
                                        <ul>
                                            <li 
                                                onClick = {this.togimg.bind(this,pro.preview[0])}
                                            >
                                                <img  alt="" src={require(`../${pro.preview[0]}`)}/>
                                            </li>
                                            <li
                                                onClick = {this.togimg.bind(this,pro.preview[1])}
                                            >
                                                <img  alt="" src={require(`../${pro.preview[1]}`)}/>
                                            </li>
                                            <li
                                                onClick = {this.togimg.bind(this,pro.preview[2])}
                                            >
                                                <img  alt="" src={require(`../${pro.preview[2]}`)}/>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="de-t-r">
                                    <h3>{pro.title}</h3>
                                    <p className="de-jj">{pro.abs}</p>
                                    <div className="de-sale">
                                        <span>RMB：{pro.sale}</span>
                                    </div>
                                    <h4>商品介绍</h4>
                                    <div className="div-ms">
                                        <p className="de-ms">{pro.desc}</p>
                                    </div>
                                    <div className="addpro clearfix">
                                        <div className="quantity">
                                            <div className="addmin"
                                                onClick={this.min}
                                            ></div>
                                            <div className="enval" ref="num">{addnum}</div>
                                            <div className="addmax"
                                                onClick={this.max}
                                            ></div>
                                        </div>
                                        <a className="addcart">加入购物车</a>
                                    </div>
                                </div>
                            </div>
                            <div className="de-btm"></div>
                        </div>
                        <div className="w-mid-r"></div>
                    </div>
                </div>
            </div>
        )
        
    }
}

export default Detail;