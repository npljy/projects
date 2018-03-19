import React , {Component} from 'react'

class LoginErr extends Component {

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