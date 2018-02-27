
import React,{Component} from "react"

class App extends Component{
	constructor(){
		super();
		this.state ={
			arr:[1,2,3,4,5]
		}
		
	}
	// 之所以使用 箭头函数，是因为 直接写 click(){this} 函数中的默认的this是 undefined
	//  也可以  通过 更改this指向 解决
	click = ()=>{
		let {arr} = this.state; // jg
		arr = arr.concat();
		arr.push(Math.random());
		this.setState({
			arr  // 相当于  arr:arr   ， key  value 相同 ，只需要写一个即可
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