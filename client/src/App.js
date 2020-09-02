import React from 'react'
import { Provider } from 'react-redux'
import store from './redux'
import { setStateSuccess } from './redux/actions/auth_actions'
import { addUser } from './redux/actions/user_actions';
import { Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/protected-route';
import HomePage, { HOME_ROUTE } from './pages/home-page';
import history from './config/history.config';
import LoginPage, { LOGIN_ROUTE } from './pages/login-page';
import Navbar from './components/navbar';
import RegisterPage, { REGISTER_ROUTE } from './pages/register-page';

export default function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Navbar />
                <Switch>
                    <Route path={HOME_ROUTE} exact={true} component={HomePage} />
                    <Route path={LOGIN_ROUTE} component={LoginPage} />
                    <Route path={REGISTER_ROUTE} component={RegisterPage} />
                    <ProtectedRoute path="/dashboard" exact={true} component={HomePage} />
                </Switch>
            </Router>
        </Provider>
    )
}