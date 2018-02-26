import React,{Component} from 'react';

class Cur extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        let {curtxt} = this.props;
        return (
            <a href="javascript">{curtxt}</a>
        )
    }
}

export default Cur;