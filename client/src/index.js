import React from 'react';
import ReactDOM from 'react-dom';

import store from './redux';
import { Provider } from 'react-redux'
import { addUser } from './redux/actions/user_actions';
import { setStateSuccess } from './redux/actions/auth_actions';

import App from "./App";

import './styles/style.css';
import './styles/main.css';

const user = localStorage.getItem('user');

if (user) {
    store.dispatch(addUser(JSON.parse(user)));
}
store.dispatch(setStateSuccess());

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , wrapper) : false;