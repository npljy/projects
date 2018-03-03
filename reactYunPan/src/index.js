import React from 'react';
import ReactDOM from 'react-dom';
import App from './yun/app';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
if(module.hot){
    module.hot.accept();
}