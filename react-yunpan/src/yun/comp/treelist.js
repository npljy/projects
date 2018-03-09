import React,{Component} from "react"
import data from '../js/data';
class TreeList extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:data
        }
    }
    treeClick = (oid)=>{
        let {cid} = this.props;
        cid(oid);
    }
    render(){
        let {oid,pid,title,cid} = this.props;
        let list = data.filter((e,i)=>{
            return e.pid === oid;
        });

        list = list.map((e,i)=>{
            return <TreeList {...{
                key:i,
                oid:e.id,
                pid:e.pid,
                title:e.title,
                cid:cid
            }}/>
        });

        return(
            <li oid={oid} pid={pid} >
                <div className="tree-title tree-ico close"  oid={oid} pid={pid} 
                    onClick = {this.treeClick.bind(this,oid)}
                >
                    <span  oid={oid} pid={pid}><i></i>{title}</span>
                </div>
                <ul>
                    {list}
                </ul>
            </li>
        )
    }
}

export default TreeList;