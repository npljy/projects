
import React,{Component} from "react"

class App extends Component{
	constructor(){
		super();
		this.state = {
			arr:[],
			val:'输入内容'
		}
	}

	change = (ev)=>{
		this.setState({
			val : ev.target.value
		})

		let obj2 = {
			key:1,
			txt:2
		}
		console.log(11)
		console.log( <List {...obj2}/> )
	}
	keyup = (ev)=>{
		if(ev.keyCode === 13){
			let {arr,val} = this.state;
			let arr2 = arr.concat();

			arr2.unshift(val);
			this.setState({
				arr:arr2,
				val:''
			})
			
		}
	}
	render(){
		let {arr,val} = this.state;
		return (
			<div>
				<input 
					type = "text" 
					onChange = {this.change} 
					onKeyUp = {this.keyup} 
					value = {val}
				/>
				
				<ul>
					{
						arr.map((e,i) => <li key={i}>{e}</li>)
					}
				</ul>
			</div>
		)
	}
}

export default App