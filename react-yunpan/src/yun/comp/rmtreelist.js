import React,{Component} from "react"
import data from '../js/data';
class RmTreeList extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:data
        }
    }
    rmTreeClick = (oid)=>{
        let {coid} = this.props;
        coid(oid);
    }
    render(){
        let {oid,pid,title,coid} = this.props;
        let rmlist = data.filter((e,i)=>{
            return e.pid === oid;
        });

        rmlist = rmlist.map((e,i)=>{
            return <RmTreeList {...{
                key:i,
                oid:e.id,
                pid:e.pid,
                title:e.title,
                coid:coid
            }}/>
        });

        return(
            <li oid={oid} pid={pid} >
                <div className="tree-title tree-ico close"  oid={oid} pid={pid} 
                    onClick = { this.rmTreeClick.bind(this,oid)}
                >
                    <span  oid={oid} pid={pid} ><i></i>{title}</span>
                </div>
                <ul>
                    {rmlist}
                </ul>
            </li>
        )
    }
}

export default RmTreeList;