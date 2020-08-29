import request_state from './request_state';
import user from './user';
import { combineReducers } from 'redux';

const combinedReducers = combineReducers({
    request_state,
    user
})

export default combinedReducers;