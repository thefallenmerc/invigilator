import { SET_ERRORS, REMOVE_ERRORS } from "../actions/error_actions";

export default errors;

function errors(state = {}, action) {
    switch (action.type) {
        case SET_ERRORS:
            return action.errors;
            break;
        case REMOVE_ERRORS:
            return {};
            break;
        default:
            return state;
            break;
    }
}