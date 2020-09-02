import React from 'react'
import { connect } from 'react-redux'
import { Router, Switch, Route, Link } from 'react-router-dom';
import ProtectedRoute from './components/protected-route';
import HomePage, { HOME_ROUTE } from './pages/home-page';
import history from './config/history.config';
import LoginPage, { LOGIN_ROUTE } from './pages/login-page';
import Navbar from './components/navbar';
import RegisterPage, { REGISTER_ROUTE } from './pages/register-page';
import DashboardPage, { DASHBOARD_ROUTE } from './pages/dashboard-page';
import { REQUEST_STATE_PENDING } from './redux/actions/auth_actions';


function AppComponent({ state, user }) {
    if (state === REQUEST_STATE_PENDING) {
        return (
            <div>Loading...</div>
        );
    }
    return (
        <Router history={history}>
            <Navbar />
            <Switch>
                <Route path={HOME_ROUTE} exact={true} component={HomePage} />
                <Route path={LOGIN_ROUTE} component={LoginPage} />
                <Route path={REGISTER_ROUTE} component={RegisterPage} />
                <ProtectedRoute path={DASHBOARD_ROUTE} exact={true} user={user} component={DashboardPage} />
            </Switch>
        </Router>
    )
}

const mapStateToProps = state => ({
    state: state.request_state,
    user: state.user
});

const App = connect(mapStateToProps)(AppComponent);

export default App;