import { setStatePending, setStateSuccess, setStateFailure } from "./auth_actions";
import AuthService from "../../services/auth.service";
import { setErrors } from "./error_actions";
import history from "../../config/history.config";

export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";

export {
    addUser, removeUser, attemptLogin, attemptRegister
}

function addUser(user) {
    return {
        type: ADD_USER,
        user
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
                console.log({ response });
                dispatch(addUser(response.data));
                dispatch(setStateSuccess());
                history.push('/');
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
                console.log({ response });
                dispatch(addUser(response.data));
                dispatch(setStateSuccess());
                history.push('/');
                return true;
            })
            .catch(error => {
                dispatch(setErrors({ validation: error.response.data }));
                dispatch(setStateFailure());
                return false;
            });
    }
} 