export const REMOVE_ERRORS = "REMOVE_ERRORS";
export const SET_ERRORS = "SET_ERRORS";

export { setErrors, removeErrors };

function setErrors(errors = {}) {
    return {
        type: SET_ERRORS,
        errors
    }
}

function removeErrors() {
    return {
        type: REMOVE_ERRORS
    };
}