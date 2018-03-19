// 分类页面，根据路由分别加载不同的种类商品

import React , {Component} from "react"
import data from "../data/data"
import List from "./list"
class Sex extends Component{

    render(){
        let {cont,list,onoff,hc} = this.state;
        let {sex} = this.props;
        let str = '';
   
        switch (sex){
            case 'women' :  
                str = '女 装' ; break ;
            case 'man' :  
                str = '男 装' ; break ;
            case 'kid' :  
                str = '儿 童' ; break ;
            case 'hot' :  
                str = '热 卖' ; break ;
            default : break;
        }
        if(list.length === 0 && !onoff ){
            list = cont.filter(e=>{
                if(sex==='hot')return e.hot
                else return e.sex === sex
            })
        }
        if(hc){
            list = cont.filter(e=>{
                if(sex==='hot')return e.hot
                else return e.sex === sex
            })
            let flts = Array.from(document.getElementById('filter').getElementsByTagName('input'));
            flts.forEach(e=>e.checked=false)
        }
        let divlist = list.map((e,i)=>{
            return (
                <List {...{
                    key:i,
                    id : e.id,
                    sex : e.sex,
                    title : e.title,
                    type:e.type,
                    price : e.price,
                    sale : e.sale,
                    img : e.img,
                    count : e.count,
                    send : e.send,
                    togS : this.togmaskS,
                    addcart2:this.addcart2
                }}/>
            )
        })

        return(
            <div className="replace">
                <div className="l-banner">
                    <div className="container">
                        <h2>更多商品</h2>
                        <label></label>
                        <h3>{str}</h3>
                    </div>
                </div>
                <div className="w-mid cont-mid">
                    <div className="container clearfix">
                        <div className="w-mid-l">
                            <ul>
                                {divlist}
                            </ul>
                        </div>
                        <div className="w-mid-r" id="filter">
                            <div>
                                <h5>折 扣</h5>
                                <ul id="dis">
                                    <li><input type="checkbox" name="discount" flt="9" onClick = {this.dis} />9 折</li>
                                    <li><input type="checkbox" name="discount" flt="8" onClick = {this.dis}/>8 折</li>
                                    <li><input type="checkbox" name="discount" flt="7" onClick = {this.dis}/>7 折</li>
                                    <li><input type="checkbox" name="discount" flt="6" onClick = {this.dis}/>6 折</li>
                                    <li><input type="checkbox" name="discount" flt="5" onClick = {this.dis}/>5 折</li>
                                </ul>
                            </div>
                            <div>
                                <h5>款 式</h5>
                                <ul id="sty">
                                    <li><input type="checkbox" name="style" flt="jean" onClick = {this.sty}/>jean</li>
                                    <li><input type="checkbox" name="style" flt="coat" onClick = {this.sty}/>coat</li>
                                    <li><input type="checkbox" name="style" flt="shirt" onClick = {this.sty}/>shirt</li>
                                </ul>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        )
        
        
    }
}

export default Sex;