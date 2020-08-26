import React from 'react'
import { Provider } from 'react-redux'
import store from './redux'
import { setStateSuccess } from './redux/actions/auth_actions'

store.dispatch(setStateSuccess());

export default function App() {
    return (
        <Provider store={store}>
            <div>
                Loading...
            </div>
        </Provider>
    )
}