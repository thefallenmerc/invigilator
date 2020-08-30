import request_state from './request_state';
import errors from './errors';
import user from './user';
import { combineReducers } from 'redux';

const combinedReducers = combineReducers({
    request_state,
    user,
    errors,
})

export default combinedReducers;