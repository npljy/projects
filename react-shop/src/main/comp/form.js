import React , {Component} from "react"
import data from "../data/data"
class Form extends Component{
    constructor(){
        super()
        this.state={
            cont:data
        }
    }
    
    render(){
        return (
            <div className="replace">
                <div className="l-banner">
                    <div className="container">
                        <h2>联系我们</h2>
                        <label></label>
                        <h3>联系我们</h3>
                    </div>
                </div>
                <div className="w-mid cont-mid">
                    <div className="container">
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Form;