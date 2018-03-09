import React , {Component} from "react"
import data from "../data/data"
import List from "./list"
class Sex extends Component{
    constructor(){
        super()
        this.state={
            cont:data
        }
    }
    togmaskS = (id)=>{
        let {togfn} = this.props;
        togfn(id);
    }

    render(){
        let {cont} = this.state;
        let {sex} = this.props;
        let str = '';
        let wlist = cont.filter(e=>{

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

            if(sex==='hot')return e.hot
            else return e.sex === sex
            
        })
        let list = wlist.map((e,i)=>{
            return (
                <List {...{
                    key:i,
                    id : e.id,
                    sex : e.sex,
                    title : e.title,
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
                                {list}
                            </ul>
                        </div>
                        <div className="w-mid-r"></div>
                    </div>
                </div>
            </div>
        )
        
        
    }
}

export default Sex;