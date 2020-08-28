import { ADD_USER, REMOVE_USER } from "../actions/user_actions";

export default user;

function user(state = null, action) {
    switch (action.type) {
        case ADD_USER:
            return action.user;
            break;
        case REMOVE_USER:
            return null;
        default:
            return state;
            break;
    }
}