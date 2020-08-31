export const REQUEST_STATE_PENDING = 'REQUEST_STATE_PENDING';
export const REQUEST_STATE_FAILURE = 'REQUEST_STATE_FAILURE';
export const REQUEST_STATE_SUCCESS = 'REQUEST_STATE_COMPLETE';

export {
    setStatePending, setStateFailure, setStateSuccess
}


function setStatePending() {
    return {
        type: REQUEST_STATE_PENDING
    }
}

function setStateFailure() {
    return {
        type: REQUEST_STATE_FAILURE
    }
}

function setStateSuccess() {
    return {
        type: REQUEST_STATE_SUCCESS
    }
}
