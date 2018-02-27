import React from "react"
import ReactDOM from "react-dom"
import App from  './test/App3';
// 平滑过渡
if(module.hot){
    module.hot.accept();
}


ReactDOM.render(
    <App />,
    document.getElementById("root"),
    // function(){
    //     console.log("success")
    // }
)