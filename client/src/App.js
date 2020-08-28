import React from 'react'
import { Provider } from 'react-redux'
import store from './redux'
import { setStateSuccess } from './redux/actions/auth_actions'
import { addUser } from './redux/actions/user_actions';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/protected-route';
import HomePage from './pages/home-page';
import history from './config/history.config';
import LoginPage, { LOGIN_ROUTE } from './pages/login-page';

// store.dispatch(addUser({ name: "Shubham" }));

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter history={history}>
                <Switch>
                    <Route path="/" exact={true} component={HomePage} />
                    <Route path={LOGIN_ROUTE} component={LoginPage} />
                    <ProtectedRoute path="/dashboard" exact={true} component={HomePage} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}