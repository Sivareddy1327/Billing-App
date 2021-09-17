import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import {Provider} from 'react-redux'
import configurationStore from './store/configurationStore'

const store = configurationStore()
console.log(store.getState())
store.subscribe(()=>{
  console.log(store.getState())
})
ReactDOM.render(
  <Provider store={store}>
     <BrowserRouter>
       <App />
     </BrowserRouter>
  </Provider>
 
    ,
  document.getElementById('root')
);


