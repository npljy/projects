import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import './index.css';
import App from './main/app';
import reducer from './reducer/index'

const store = createStore(reducer);

ReactDOM.render(
<Provider store = {store}>  
<Router>
<App />
</Router>
</Provider>  
, document.getElementById('root'));

if(module.hot){
    module.hot.accept();
}
