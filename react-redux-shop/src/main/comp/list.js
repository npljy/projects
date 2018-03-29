import React , {Component} from "react"
import {Link} from 'react-router-dom' 
import { connect } from "react-redux";
import data from '../data/data'

class ListR extends Component{
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

    newPath =()=>{
        let { dispatch } = this.props;
        dispatch({ type: "NEW_PATH" });
        dispatch({type:'ADD_NUM'});
        document.documentElement.scrollTop = "0";
        document.body.scrollTop = "0";  
    }

    addcart=()=>{
        let ck = document.cookie.split("; ").find(e=>/^u=/.test(e));
        let user = ck ? ck.split("=")[1].replace(/((^"*)|("*$))|((^\s*)|(\s*$))/g,""):null;
        let {id,sale,addcart2,dispatch} = this.props; // 传过来的 商品 id
        let {cont} = this.state;
        if(user){
            dispatch({ type: "NEW_PATH" });
            this.refs.tips.style.top = 0;
            let _this = this;
            let rest;
            if(_this.refs.tips && _this.refs.tips.style){
                _this.refs.tips.innerText = "成功添加到购物车";
                setTimeout(function(){
                    _this.refs.tips.style.transition = 'none';
                    _this.refs.tips.style.top = "-3em";
                    _this.refs.tips.style.transition = ".5s";
                },1000)
            } 

            // 添加到 用户的购物车数据中,并将用户和物品信息存入storage
            let st = localStorage.getItem(user);
            st = JSON.parse(st);

            cont.forEach(e=>{
                if(e.id === id ){
                    if(e.send < e.count){
                        rest = e.count-e.send;
                        e.send++;
                    }
                    else rest = 0;
                }
            })

            // 如果此用户购物车中有商品数据
            if(rest !== 0){
                if(st){
                    let idx = st.findIndex(es=>{
                        return Number(es.id) === Number(id)
                    });
                    // 如果购物车数据中有点击的这个商品
                    if(idx>=0){
                        let obj = {id:id,sum:++st[idx].sum,pri:sale}
                        st.splice(idx,1,obj)
                    }
                    // 没有此商品
                    else{
                        st.push({id:id,sum:1,pri:sale}); 
                    }
                    localStorage.setItem(user,JSON.stringify(st));
                }
                // 购物车为空
                else{
                    localStorage.setItem(user,JSON.stringify([{id:id,sum:1,pri:sale}]));
                }
                let carts =JSON.parse( localStorage.getItem(user) );
                let num = 0;
                let count = 0;
                carts.forEach(e=>{
                    num += Number(e.sum);
                    count += Number(e.sum) * Number(e.pri);
                })
                addcart2(num,count);
            }
            else{
                _this.refs.tips.innerText = "该商品已售完";
            }
        }else{
            let {tologin} = this.props;
            tologin();
        }
    }

    render(){
        let {id,sex,title,type,price,sale,img,count,send} = this.props;
        
        return (
            <li>
                <div id="tips" ref="tips" style={{transition:'.5s'}}>成功添加到购物车</div>
                <div>
                    <div className="pro-img">
                        <img alt="" src={require(`../${img}`)}/>
                        <div>
                            <a
                                onClick = {this.zoom.bind(this,id)}
                            ><img  alt="" src={require("../imgs/zoom.png")}/></a>
                            <Link to={`/detail?id=${id}`} 
                                onClick = {this.newPath} 
                            ><img  alt="" src={require("../imgs/detail.png")}/></Link>
                        </div>
                    </div>
                    <div className="pro-txt">
                        <div className="txt-top clearfix">
                            <div className="sex-style">
                                <span>{sex}</span>
                                <h6><Link to={`/detail?id=${id}`} 
                                    onClick={this.newPath}
                                >{title}/{type}</Link></h6>
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
                                售:<strong>{send}</strong>
                                &nbsp;/&nbsp;
                                <span>{count-send}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )

    }
}
const List = connect(state=>state)(ListR);
export default List
