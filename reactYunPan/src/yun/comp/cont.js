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
    rn = (num)=>{ 
        let {dblRn} = this.props;
        dblRn(num);
        setTimeout(()=>{
            // 双击重命名聚焦
            this.refs[num].select();
            // this.refs[num].focus();
            // this.refs[num].selectionStart = this.refs[num].value.length;
        })
    }
    cv = (ev)=>{
        this.setState({
            val : ev.target.value
        })
    }
    kd = (ev)=>{
        if(ev.keyCode === 13){
            if(ev.target.value.replace(/(^\s*)|(\s*$)/g,"") !== ''){
                let {oid,changeTitle} = this.props;
                changeTitle(oid,ev.target.value);
            }else{
                let {oid,changeTitle,title} = this.props;
                changeTitle(oid,title);
                this.setState({
                    val:title
                })
            }
        }
    }
    blur = (ev)=>{
        if(ev.target.value.replace(/(^\s*)|(\s*$)/g,"") !== ''){
            let {oid,changeTitle} = this.props;
            changeTitle(oid,ev.target.value);
        }else{
            let {oid,changeTitle,title} = this.props;
            changeTitle(oid,title);
            this.setState({
                val:title
            })
        }
    }
    focs = (ev)=>{
        ev.target.select()
    }
    // 单击导航条重命名，聚焦
    aufocs = ()=>{
        let {oid,rename} = this.props;
        if(rename){
            setTimeout(()=>{
                this.refs[oid].select();
            })
        }
    }
    // 双击文件夹图片 查看其子目录
    cid = (num)=>{
        let {changeid} = this.props;
        changeid(num);
    }
    render(){
        let {val} = this.state;
        let {oid,pid,title,checked,rename} = this.props;
        this.aufocs();//单击导航条重命名，聚焦
        return (
            <div className="file-item" oid={oid} pid={pid} >
                <img 
                    src={require("../img/folder-b.png")} 
                    alt={require("../img/folder-b.png")}
                    oid={oid} 
                    onDoubleClick = { this.cid.bind(this,oid) }
                />
                <span className="folder-name"
                    style={{ display:rename ? 'none' : 'block' }}
                    onDoubleClick = { this.rn.bind(this,oid) }
                >{title}</span>
                <input type="text" className="editor"
                    style={{display:rename?'block':'none'}}
                    value = {val}
                    onChange = {this.cv}
                    onKeyDown = {this.kd} 
                    onBlur = {this.blur} 
                    onFocus = {this.focs}
                    oid = {oid}
                    ref = {oid} 
                />
                <i className={checked ? 'checked' : ''}  oid={oid} pid={pid} 
                    onClick = {this.cc.bind(this,oid)}
                ></i>
            </div>
        )
    }
}

export default Cont;
