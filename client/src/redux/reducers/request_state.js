const { REQUEST_STATE_SUCCESS, REQUEST_STATE_FAILURE, REQUEST_STATE_PENDING } = require("../actions/auth_actions");

export default request_state;

function request_state(state = REQUEST_STATE_PENDING, action) {
    switch (action.type) {
        case REQUEST_STATE_SUCCESS:
            return REQUEST_STATE_SUCCESS;
            break;
        case REQUEST_STATE_FAILURE:
            return REQUEST_STATE_FAILURE;
        case REQUEST_STATE_PENDING:
            return REQUEST_STATE_PENDING;
        default:
            return state;
            break;
    }
} 