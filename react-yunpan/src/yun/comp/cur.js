import React,{Component} from 'react';

class Cur extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    click = (num)=>{
        let {changeid} = this.props;
        console.log(num)
        changeid(num);
    }
    render(){
        let {oid,curtxt} = this.props;
        return (
            <a oid={oid}
                onClick = {this.click.bind(this,oid)}
            >{curtxt}</a>
        )
    }
}

export default Cur;