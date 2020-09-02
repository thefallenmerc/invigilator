import { setStatePending, setStateSuccess, setStateFailure } from "./auth_actions";
import AuthService from "../../services/auth.service";
import { setErrors } from "./error_actions";
import history from "../../config/history.config";
import { LOGIN_ROUTE } from "../../pages/login-page";
import { HOME_ROUTE } from "../../pages/home-page";
import { DASHBOARD_ROUTE } from "../../pages/dashboard-page";

export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";

export {
    addUser, removeUser, attemptLogin, attemptRegister, attemptLogout
}

function addUser(user) {
    return {
        type: ADD_USER,
        user
    }
}

function addUserAndSave(user) {
    return (dispatch, getState) => {
        dispatch(addUser(user));
        localStorage.setItem('user', JSON.stringify(user));
    }
}

function removeUser() {
    return {
        type: REMOVE_USER
    }
}

function attemptLogin({ email, password }) {
    return (dispatch, getState) => {
        dispatch(setStatePending());
        return AuthService.login({ email, password })
            .then(response => {
                const user = response.data;
                dispatch(addUserAndSave(user));
                dispatch(setStateSuccess());
                console.log(user.role)
                if (user.role === "admin") {
                    history.push(DASHBOARD_ROUTE);
                } else {
                    history.push(HOME_ROUTE);
                }
                return true;
            })
            .catch(error => {
                dispatch(setErrors({ validation: error.response.data }));
                dispatch(setStateFailure());
                return false;
            });
    }
}

function attemptRegister({ name, email, password }) {
    return (dispatch, getState) => {
        dispatch(setStatePending());
        return AuthService.register({ name, email, password })
            .then(response => {
                const user = response.data;
                dispatch(addUserAndSave(user));
                dispatch(setStateSuccess());
                console.log(user.role)
                if (user.role === "admin") {
                    history.push(DASHBOARD_ROUTE);
                } else {
                    history.push(HOME_ROUTE);
                }
                return true;
            })
            .catch(error => {
                dispatch(setErrors({ validation: error.response.data }));
                dispatch(setStateFailure());
                return false;
            });
    }
}

function attemptLogout() {
    return (dispatch, getState) => {
        dispatch(removeUser());
        localStorage.removeItem('user');
        history.push(LOGIN_ROUTE);
    }
}