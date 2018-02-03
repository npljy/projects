
import React,{Component} from "react"

class App extends Component{
	constructor(){
		super();
		this.state ={
			arr:[1,2,3,4,5]
		}
		
	}
	click = ()=>{
		let {arr} = this.state; // jg
		let arr2 = arr.concat();
		arr2.push(Math.random());
		this.setState({
			arr:arr2
		});
	}
	
	render(){
		console.log(this.state.arr) 
		return (
			<div>
				<button onClick={this.click}>添加</button>
				<div>哈喽沃德</div>
				<ul>
					{
						this.state.arr.map((e,i) => <li key={i}>{e}</li>)
					}
				</ul>
			</div>
		)
	}
}

export default App