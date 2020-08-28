import React from 'react'
import { Provider } from 'react-redux'
import store from './redux'
import { setStateSuccess } from './redux/actions/auth_actions'
import { addUser } from './redux/actions/user_actions';

store.dispatch(addUser({name: "Shubham"}));

export default function App() {
    return (
        <Provider store={store}>
            <div>
                Loading...
            </div>
        </Provider>
    )
}