import React,{Component} from 'react';

class Nav extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    click = (id)=>{
        let {dispRm,dispDel,rn,nf} = this.props;
        switch (id) {
            case "remove":
                dispRm();
                break;
            case "rename":
                rn();
                break;
            case "del":
                dispDel();
                console.log(1112223333)
                break;
            case "create":
                nf();
                break;
            case "refresh":
                break;
            default:
                break;
        }
    }
    render(){
        let {id,txt} = this.props;
        return (
            <li id={id}
                onClick = {this.click.bind(this,id)}
            ><i></i>{txt}</li>
        )
    }
}

export default Nav;