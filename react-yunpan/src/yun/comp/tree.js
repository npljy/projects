import React,{Component} from 'react';
import data from '../js/data';
import TreeList from './treelist';

class Tree extends Component{
    constructor(props){
        super(props);
        this.state={
            data:data
        }
    }
    cid = (oid)=>{
        let {cid} = this.props;
        cid(oid);
    }
    render(){
        let {data} = this.state;
        
        let datalist = data.filter((e)=>{
            return e.pid === -1;
        })
        
        let treelist = datalist.map((e,i)=>{
            return (
                <TreeList {...{
                    key:i,
                    oid:e.id,
                    pid:e.pid,
                    title:e.title,
                    cid:this.cid
                }}/>
            )
        })
        return (
            <ul>
                {treelist}
            </ul>
        )
    }
}

export default Tree;