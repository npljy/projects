import React,{Component} from 'react';

class Cur extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return (
            <div className="breadmenu">
                <div className="checkall">
                    <i className="checkedAll"></i>
                </div>
                <div className="bread-nav" >
                    <a href="javascript">微云</a>
                        <span>我的音乐</span>
                </div>
            </div>
        )
    }
}

export default Cur;