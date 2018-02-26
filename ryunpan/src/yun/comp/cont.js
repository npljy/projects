import React ,{Component} from "react"

class Cont extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    cc = (oid)=>{
        let {chgChked} = this.props;
        chgChked(oid);
    }
    render(){
        let {oid,pid,title,checked} = this.props;
        return (
            <div className="file-item" oid={oid} pid={pid}>
                <img src={require("../img/folder-b.png")} alt="" />
                <span className="folder-name">{title}</span>
                <input type="text" className="editor"/>
                <i className={checked ? 'checked' : ''}  oid={oid} pid={pid} 
                    onClick = {this.cc.bind(this,oid)}
                ></i>
            </div>
        )
    }
}

export default Cont;
