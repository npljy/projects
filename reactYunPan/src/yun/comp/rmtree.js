import React,{Component} from 'react';
import data from '../js/data';
import TreeList from './rmtreelist';

class RmTree extends Component{
    constructor(props){
        super(props);
        this.state={
            data:data
        }
    }
    coid = (oid)=>{
        let {coid} = this.props;
        coid(oid);
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
                    coid:this.coid
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

export default RmTree;