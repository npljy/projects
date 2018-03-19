import React , {Component} from 'react'

class LoginErr extends Component {
    constructor(){
        super();
        this.state = {};
    }
    render(){
        return (
            <div>
                <div className="container">
                    <img alt="404" src={require("../imgs/notlogin.png")}/>
                </div>
            </div>
        )
    }
}

export default LoginErr;