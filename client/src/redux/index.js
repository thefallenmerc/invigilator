import thunk from 'redux-thunk';
import { compose, applyMiddleware, createStore } from 'redux';
import combinedReducers from './reducers';
import logger from 'redux-logger';

let composerEnhancers;

const middlewares = [thunk];

if(process.env.NODE_ENV === 'development') {
    composerEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    middlewares.push(logger);
} else {
    composerEnhancers = compose;
}

const store = createStore(combinedReducers, {}, composerEnhancers(applyMiddleware(...middlewares)));

export default store;