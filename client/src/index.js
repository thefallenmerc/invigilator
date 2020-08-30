import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import './styles/style.css';
import './styles/main.css';


const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;