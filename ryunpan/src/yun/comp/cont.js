import React ,{Component} from "react"

class Cont extends Component{
    constructor(props){
        super(props);
        this.state={
            val:this.props.title
        }
    }
    cc = (oid)=>{
        let {chgChked} = this.props;
        chgChked(oid);
    }
    rn = ()=>{
        console.log(111)
    }
    cv = (ev)=>{
        this.setState({
            val : ev.target.value
        })
    }
    kd = (ev)=>{
        if(ev.keyCode === 13){
            let {oid,changeTitle} = this.props;
            changeTitle(oid,ev.target.value);
        }
    }

    render(){
        let {val} = this.state;
        let {oid,pid,title,checked,rename} = this.props;
        return (
            <div className="file-item" oid={oid} pid={pid} >
                <img src={require("../img/folder-b.png")} alt="" />
                <span className="folder-name"
                    style={{display:rename?'none':'block'}}
                    onDoubleClick = {this.rn}
                >{title}</span>
                <input type="text" className="editor"
                    style={{display:rename?'block':'none'}}
                    value = {val}
                    onChange = {this.cv}
                    onKeyDown = {this.kd}
                />
                <i className={checked ? 'checked' : ''}  oid={oid} pid={pid} 
                    onClick = {this.cc.bind(this,oid)}
                ></i>
            </div>
        )
    }
}

export default Cont;
