import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from "./app";
import Login from './Login';
import CreateUser from './CreateUser';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Login/>
  </React.StrictMode>,
  document.getElementById("root")
);


reportWebVitals();
