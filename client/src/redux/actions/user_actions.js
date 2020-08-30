import { setStatePending, setStateSuccess, setStateFailure } from "./auth_actions";
import AuthService from "../../services/auth.service";
import { setErrors } from "./error_actions";

export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";

export {
    addUser, removeUser, attemptLogin
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
        console.log(AuthService);
        return AuthService.login({ email, password })
            .then(response => {
                console.log({ response })
                dispatch(setStateSuccess());
                return true;
            })
            .catch(error => {
                console.log({ error });
                dispatch(setErrors(error.response.data))
                dispatch(setStateFailure());
                return false;
            });
    }
} 