import React , {Component} from "react"
import data from "../data/data"
import List from "./list"
class Sex extends Component{
    constructor(props){
        super(props)
        this.state={
            cont:data,
            list:[],
            disarr:[],
            styarr:[],
            tmp:[],
            onoff:false
        }
    }
    togmaskS = (id)=>{
        let {togfn} = this.props;
        togfn(id);
    }
 
    dis = (ev)=>{
        let flts = Array.from(document.getElementById('filter').getElementsByTagName('input'));
        let diss = Array.from(document.getElementById('dis').getElementsByTagName('input'));
        let stys = Array.from(document.getElementById('sty').getElementsByTagName('input'));
        let {cont,list,styarr,tmp,onoff} = this.state;
        let {sex} = this.props;

        onoff = true;
        if(flts.every(e=>!e.checked))onoff = false;
        if(stys.every(e=>!e.checked)){
            list = cont.filter(e=>{
                if(sex==='hot')return e.hot;
                else return e.sex === sex;
            })
        }
        if(stys.some(e=>e.checked) ){
            list = [...new Set(styarr.map(e=>e))];
        }
        if(diss.every(e=>!e.checked)){
            list = cont.filter(e=>{
                if(sex==='hot')return e.hot;
                else return e.sex === sex;
            })

            let sty0 = list.filter(e=>{
                return e.type === 'jean';
            })
            let sty1 = list.filter(e=>{
                return e.type === 'coat';
            })
            let sty2 = list.filter(e=>{
                return e.type === 'shirt';
            })
    
            stys.forEach((e,i)=>{
                if(e.checked){
                    switch(i){
                        case 0 :
                            tmp = tmp.concat(sty0);
                            break;
                        case 1 :
                            tmp = tmp.concat(sty1);
                            break;
                        case 2 :
                            tmp = tmp.concat(sty2);
                            break; 
                        default :
                            tmp = list.map(e=>e);
                            break;
                    }
                }
            })

        }
        else{
            let dis0 = list.filter(e=>{
                return e.sale/e.price >= 0.9 && e.sale/e.price < 1;
            })
            let dis1 = list.filter(e=>{
                return e.sale/e.price >= 0.8 && e.sale/e.price < 0.9;
            })
            let dis2 = list.filter(e=>{
                return e.sale/e.price >= 0.7 && e.sale/e.price < 0.8;
            })
            let dis3 = list.filter(e=>{
                return e.sale/e.price >= 0.6 && e.sale/e.price < 0.7;
            })
            let dis4 = list.filter(e=>{
                return e.sale/e.price >= 0.5 && e.sale/e.price < 0.6;
            })
    
            diss.forEach((e,i)=>{
                if(e.checked ){
                    switch(i){
                        case 0 :
                            tmp = tmp.concat(dis0);
                            break;
                        case 1 :
                            tmp = tmp.concat(dis1);
                            break;
                        case 2 :
                            tmp = tmp.concat(dis2);
                            break;
                        case 3 :
                            tmp = tmp.concat(dis3);
                            break;
                        case 4 :
                            tmp = tmp.concat(dis4);
                            break;
                        default:
                            tmp = list.map(e=>e);
                            break;
                    }
                }   
            })
        }
       
        if(tmp.length === 0 && !ev.target.checked )tmp = [...new Set(styarr.map(e=>e))];
        if(flts.every(e=>!e.checked)){
            tmp = cont.filter(e=>{
                if(sex==='hot')return e.hot;
                else return e.sex === sex;
            })
        }
        this.setState({
            list:[...new Set(tmp.map(e=>e))],
            disarr:[...new Set(tmp.map(e=>e))],
            onoff
        })

    }

    sty = (ev)=>{
        let flts = Array.from(document.getElementById('filter').getElementsByTagName('input'));
        let diss = Array.from(document.getElementById('dis').getElementsByTagName('input'));
        let stys = Array.from(document.getElementById('sty').getElementsByTagName('input'));
        let {cont,list,disarr,tmp,onoff} = this.state;
        let {sex} = this.props;

        onoff = true;
        if(flts.every(e=>!e.checked))onoff = false;
        if(diss.every(e=>!e.checked)){
            list = cont.filter(e=>{
                if(sex==='hot')return e.hot;
                else return e.sex === sex;
            })
        }

        if(diss.some(e=>e.checked)){
            list = [...new Set(disarr.map(e=>e))];
        }
        if(stys.every(e=>!e.checked)){
            list = cont.filter(e=>{
                if(sex==='hot')return e.hot;
                else return e.sex === sex;
            })
             let dis0 = list.filter(e=>{
                return e.sale/e.price >= 0.9 && e.sale/e.price < 1;
            })
            let dis1 = list.filter(e=>{
                return e.sale/e.price >= 0.8 && e.sale/e.price < 0.9;
            })
            let dis2 = list.filter(e=>{
                return e.sale/e.price >= 0.7 && e.sale/e.price < 0.8;
            })
            let dis3 = list.filter(e=>{
                return e.sale/e.price >= 0.6 && e.sale/e.price < 0.7;
            })
            let dis4 = list.filter(e=>{
                return e.sale/e.price >= 0.5 && e.sale/e.price < 0.6;
            })

            diss.forEach((e,i)=>{
                if(e.checked ){
                    switch(i){
                        case 0 :
                            tmp = tmp.concat(dis0);
                            break;
                        case 1 :
                            tmp = tmp.concat(dis1);
                            break;
                        case 2 :
                            tmp = tmp.concat(dis2);
                            break;
                        case 3 :
                            tmp = tmp.concat(dis3);
                            break;
                        case 4 :
                            tmp = tmp.concat(dis4);
                            break;
                        default:
                            tmp = list.map(e=>e);
                            break;
                    }
                }   
            })
        }
        else {
            let sty0 = list.filter(e=>{
                return e.type === 'jean';
            })
            let sty1 = list.filter(e=>{
                return e.type === 'coat';
            })
            let sty2 = list.filter(e=>{
                return e.type === 'shirt';
            })
    
            stys.forEach((e,i)=>{
                if(e.checked){
                    switch(i){
                        case 0 :
                            tmp = tmp.concat(sty0);
                            break;
                        case 1 :
                            tmp = tmp.concat(sty1);
                            break;
                        case 2 :
                            tmp = tmp.concat(sty2);
                            break; 
                        default :
                            tmp = list.map(e=>e);
                            break;
                    }
                }
            })

        }

        if(tmp.length === 0 && !ev.target.checked)tmp = [...new Set(disarr.map(e=>e))];
        if(flts.every(e=>!e.checked)){
            tmp = cont.filter(e=>{
                if(sex==='hot')return e.hot;
                else return e.sex === sex;
            })
        }
        this.setState({
            list:[...new Set(tmp.map(e=>e))],
            styarr:[...new Set(tmp.map(e=>e))],
            onoff
        })

    }


    render(){
        let {cont,list,onoff} = this.state;
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
        if(list.length === 0 && !onoff){
            list = cont.filter(e=>{
                if(sex==='hot')return e.hot
                else return e.sex === sex
            })
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
                    togS : this.togmaskS
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