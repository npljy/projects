import React,{Component} from 'react';

class Nav extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    click = (id)=>{
        let {disp} = this.props;
        switch (id) {
            case "remove":
                disp();
                break;
            case "rename":
            
                break;
            case "del":
            
                break;
            case "create":
            
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